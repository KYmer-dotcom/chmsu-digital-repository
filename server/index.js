import express from 'express';
import cors from 'cors';
import { db, initDatabase } from './db.js';

// Initialize SQLite tables & seed if empty
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Health & Status Check
app.get('/api/status', (req, res) => {
  const docsCount = db.prepare('SELECT COUNT(*) as count FROM documents').get().count;
  const requestsCount = db.prepare('SELECT COUNT(*) as count FROM student_requests').get().count;
  res.json({
    status: 'online',
    engine: 'SQLite3 (Native Node Engine)',
    database: 'chmsu_repository.sqlite',
    institution: 'Carlos Hilado Memorial State University',
    campus: 'Talisay Main Campus',
    stats: {
      archivedDocuments: docsCount,
      studentRequests: requestsCount,
      timestamp: new Date().toISOString()
    }
  });
});

// 2. Authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const account = db.prepare('SELECT * FROM accounts WHERE LOWER(username) = LOWER(?)').get(username);
  if (!account || account.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid institutional credentials.' });
  }

  // Log successful login
  db.prepare('INSERT INTO audit_logs (action, office, details) VALUES (?, ?, ?)').run(
    'OFFICE_LOGIN',
    account.role,
    `Office account "${account.name}" logged into session.`
  );

  res.json({
    success: true,
    user: {
      id: account.id,
      username: account.username,
      name: account.name,
      role: account.role,
      officeName: account.office_name,
      department: account.department,
      email: account.email
    }
  });
});

// 3. Departments
app.get('/api/departments', (req, res) => {
  const depts = db.prepare('SELECT * FROM departments ORDER BY type, name').all();
  res.json(depts);
});

// 4. Documents (with optional filtering)
app.get('/api/documents', (req, res) => {
  const { category, department, type, year, search } = req.query;
  let query = 'SELECT * FROM documents WHERE 1=1';
  const params = [];

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }
  if (department && department !== 'All') {
    query += ' AND department = ?';
    params.push(department);
  }
  if (type && type !== 'All') {
    query += ' AND type = ?';
    params.push(type);
  }
  if (year && year !== 'All') {
    query += ' AND year = ?';
    params.push(year);
  }
  if (search) {
    query += ' AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(department) LIKE ?)';
    const term = `%${search.toLowerCase()}%`;
    params.push(term, term, term);
  }

  query += ' ORDER BY id DESC';
  const docs = db.prepare(query).all(...params);

  // Format to match frontend structure
  const formatted = docs.map(d => ({
    id: d.id,
    title: d.title,
    category: d.category,
    department: d.department,
    type: d.type,
    dateUploaded: d.date_uploaded,
    size: d.size,
    uploadedBy: d.uploaded_by,
    description: d.description,
    year: d.year,
    retentionStatus: d.retention_status
  }));

  res.json(formatted);
});

// Ingest new document
app.post('/api/documents', (req, res) => {
  const { title, category, department, type, size, uploadedBy, description, year, retentionStatus } = req.body;
  if (!title || !category || !department) {
    return res.status(400).json({ success: false, message: 'Title, category, and department are required.' });
  }

  const dateUploaded = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const result = db.prepare(`
    INSERT INTO documents (title, category, department, type, date_uploaded, size, uploaded_by, description, year, retention_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    title.trim(),
    category,
    department,
    type || 'PDF',
    dateUploaded,
    size || '1.5 MB',
    uploadedBy || 'Records Officer',
    description || 'Official institutional record archived in CHMSU repository.',
    year || String(new Date().getFullYear()),
    retentionStatus || (category === 'Policies' ? 'Permanent Archival' : category === 'Plans' ? '10-Year Fiscal' : '5-Year Administrative')
  );

  const newDocId = Number(result.lastInsertRowid);
  const newDoc = {
    id: newDocId,
    title,
    category,
    department,
    type: type || 'PDF',
    dateUploaded,
    size: size || '1.5 MB',
    uploadedBy: uploadedBy || 'Records Officer',
    description,
    year: year || String(new Date().getFullYear()),
    retentionStatus: retentionStatus || '5-Year Administrative'
  };

  // Audit Log
  db.prepare('INSERT INTO audit_logs (action, office, details) VALUES (?, ?, ?)').run(
    'DOCUMENT_INGESTED',
    'Records Management Office',
    `Archived new record: "${title}" for ${department}.`
  );

  res.status(201).json({ success: true, document: newDoc });
});

// Delete document
app.delete('/api/documents/:id', (req, res) => {
  const id = Number(req.params.id);
  const doc = db.prepare('SELECT title FROM documents WHERE id = ?').get(id);
  db.prepare('DELETE FROM documents WHERE id = ?').run(id);

  if (doc) {
    db.prepare('INSERT INTO audit_logs (action, office, details) VALUES (?, ?, ?)').run(
      'DOCUMENT_DELETED',
      'Records Management Office',
      `Deleted record #${id}: "${doc.title}".`
    );
  }

  res.json({ success: true, message: `Document #${id} removed from SQLite database.` });
});

// 5. Student Requests
app.get('/api/requests', (req, res) => {
  const requests = db.prepare('SELECT * FROM student_requests ORDER BY created_at DESC').all();
  const formatted = requests.map(r => ({
    id: r.id,
    studentId: r.student_id,
    studentName: r.student_name,
    program: r.program,
    yearLevel: r.year_level,
    documentType: r.document_type,
    purpose: r.purpose,
    dateFiled: r.date_filed,
    status: r.status,
    priority: r.priority,
    contact: r.contact,
    verified: Boolean(r.verified),
    verifiedAt: r.verified_at,
    verifiedBy: r.verified_by
  }));
  res.json(formatted);
});

// Create new student request
app.post('/api/requests', (req, res) => {
  const { studentId, studentName, program, yearLevel, documentType, purpose, priority, contact } = req.body;
  if (!studentId || !studentName || !documentType) {
    return res.status(400).json({ success: false, message: 'Student ID, name, and document type are required.' });
  }

  // Count existing to generate ID
  const total = db.prepare('SELECT COUNT(*) as count FROM student_requests').get().count;
  const newId = `REQ-${new Date().getFullYear()}-${String(total + 1).padStart(3, '0')}`;
  const dateFiled = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  db.prepare(`
    INSERT INTO student_requests (id, student_id, student_name, program, year_level, document_type, purpose, date_filed, status, priority, contact, verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?, 0)
  `).run(
    newId,
    studentId,
    studentName,
    program || 'BS Information Technology',
    yearLevel || '4th Year',
    documentType,
    purpose || 'Official Institutional Document Request',
    dateFiled,
    priority || 'Standard',
    contact || 'N/A'
  );

  const newReq = {
    id: newId,
    studentId,
    studentName,
    program: program || 'BS Information Technology',
    yearLevel: yearLevel || '4th Year',
    documentType,
    purpose: purpose || 'Official Institutional Document Request',
    dateFiled,
    status: 'Pending',
    priority: priority || 'Standard',
    contact: contact || 'N/A',
    verified: false,
    verifiedAt: null,
    verifiedBy: null
  };

  db.prepare('INSERT INTO audit_logs (action, office, details) VALUES (?, ?, ?)').run(
    'STUDENT_REQUEST_FILED',
    'Office of the Registrar',
    `Logged request ${newId} for ${studentName} (${documentType}).`
  );

  res.status(201).json({ success: true, request: newReq });
});

// Update request status
app.put('/api/requests/:id/status', (req, res) => {
  const id = req.params.id;
  const { status, verified, verifiedAt, verifiedBy } = req.body;

  if (verified !== undefined) {
    db.prepare(`
      UPDATE student_requests 
      SET status = ?, verified = ?, verified_at = ?, verified_by = ?
      WHERE id = ?
    `).run(status, verified ? 1 : 0, verifiedAt || null, verifiedBy || null, id);
  } else {
    db.prepare('UPDATE student_requests SET status = ? WHERE id = ?').run(status, id);
  }

  db.prepare('INSERT INTO audit_logs (action, office, details) VALUES (?, ?, ?)').run(
    'REQUEST_STATUS_UPDATED',
    'Office of the Registrar',
    `Updated request ${id} to status: ${status}.`
  );

  res.json({ success: true, message: `Request ${id} updated to ${status}.` });
});

// 6. Categories
app.get('/api/categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories ORDER BY id ASC').all();
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Category name is required.' });

  const result = db.prepare('INSERT INTO categories (name, description, count) VALUES (?, ?, 0)').run(name.trim(), description || '');
  res.status(201).json({ success: true, category: { id: Number(result.lastInsertRowid), name, description, count: 0 } });
});

app.delete('/api/categories/:id', (req, res) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  res.json({ success: true, message: `Category #${id} removed.` });
});

// 7. Audit Logs
app.get('/api/audit-logs', (req, res) => {
  const logs = db.prepare('SELECT * FROM audit_logs ORDER BY id DESC LIMIT 50').all();
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`🚀 CHMSU Digital Repository Express API Server running on http://localhost:${PORT}`);
  console.log(`🗄️ Database: SQLite (server/chmsu_repository.sqlite)`);
});
