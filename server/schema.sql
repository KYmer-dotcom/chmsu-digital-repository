-- Carlos Hilado Memorial State University (CHMSU) - Talisay Main Campus
-- Digital Repository & Archival Management System Database Schema (SQLite)

-- 1. Departments & Colleges Table
CREATE TABLE IF NOT EXISTS departments (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('Academic', 'Administrative'))
);

-- 2. Institutional Office Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('Records Office', 'Registrar')),
  office_name TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL
);

-- 3. Document Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  count INTEGER DEFAULT 0
);

-- 4. Central Repository Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'PDF',
  date_uploaded TEXT NOT NULL,
  size TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  description TEXT,
  year TEXT NOT NULL,
  retention_status TEXT DEFAULT '5-Year Administrative',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Student Credential Requests Table
CREATE TABLE IF NOT EXISTS student_requests (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  program TEXT NOT NULL,
  year_level TEXT NOT NULL,
  document_type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  date_filed TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'Processing', 'Ready for Release', 'Released')),
  priority TEXT NOT NULL DEFAULT 'Standard' CHECK(priority IN ('Standard', 'Urgent')),
  contact TEXT DEFAULT 'N/A',
  verified INTEGER DEFAULT 0,
  verified_at TEXT,
  verified_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Cross-Office Verification & Institutional Audit Trail Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  office TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Search & Multi-Parameter Retrieval
CREATE INDEX IF NOT EXISTS idx_docs_department ON documents(department);
CREATE INDEX IF NOT EXISTS idx_docs_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_docs_year ON documents(year);
CREATE INDEX IF NOT EXISTS idx_requests_status ON student_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_student_id ON student_requests(student_id);
