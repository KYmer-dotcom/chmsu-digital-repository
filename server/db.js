import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'chmsu_repository.sqlite');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

// Initialize SQLite database instance
export const db = new DatabaseSync(DB_PATH);

// Initialize Tables from schema.sql
export function initDatabase() {
  const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schemaSql);

  // Check if seeding is required
  const accountsCount = db.prepare('SELECT COUNT(*) as count FROM accounts').get().count;
  if (accountsCount === 0) {
    seedInitialData();
  }
}

function seedInitialData() {
  console.log('🌱 Seeding initial CHMSU repository data into SQLite...');

  // 1. Seed Accounts
  const insertAccount = db.prepare(`
    INSERT INTO accounts (username, password, name, role, office_name, department, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertAccount.run('records', 'admin123', 'Records Office', 'Records Office', 'Records Office', 'Records Management', 'records@chmsu.edu.ph');
  insertAccount.run('registrar', 'registrar123', 'Registrar Office', 'Registrar', 'Registrar Office', 'Office of the Registrar', 'registrar@chmsu.edu.ph');
  insertAccount.run('admin', 'admin123', 'Records Office', 'Records Office', 'Records Office', 'Records Management', 'records@chmsu.edu.ph');

  // 2. Seed Departments
  const insertDept = db.prepare('INSERT INTO departments (code, name, type) VALUES (?, ?, ?)');
  const departments = [
    // Academic Colleges (Talisay Main Campus)
    ['COE', 'College of Engineering (COE)', 'Academic'],
    ['CIT', 'College of Industrial Technology (CIT)', 'Academic'],
    ['COED', 'College of Education (COED)', 'Academic'],
    ['CAS', 'College of Arts and Sciences (CAS)', 'Academic'],
    ['CBMA', 'College of Business Management and Accountancy (CBMA)', 'Academic'],
    ['GRAD', 'Graduate & Advanced Education Programs', 'Academic'],
    // Administrative & Support Offices
    ['OP', 'Office of the University President (OP)', 'Administrative'],
    ['OVPAA', 'Office of the Vice President for Academic Affairs (OVPAA)', 'Administrative'],
    ['OVPAF', 'Office of the Vice President for Administration and Finance (OVPAF)', 'Administrative'],
    ['OVPRE', 'Office of the Vice President for Research and Extension (OVPRE)', 'Administrative'],
    ['RMO', 'Records Management Office', 'Administrative'],
    ['REG', 'Office of the University Registrar', 'Administrative'],
    ['ICTO', 'Information and Communications Technology Office (ICTO)', 'Administrative'],
    ['HRMO', 'Human Resource Management Office (HRMO)', 'Administrative'],
    ['OSAS', 'Office for Student Affairs and Services (OSAS)', 'Administrative'],
    ['RDSO', 'Research and Development Services Office (RDSO)', 'Administrative'],
    ['PSMO', 'Property and Supply Management Office (PSMO)', 'Administrative'],
    ['BAC', 'Bids and Awards Committee (BAC) Office', 'Administrative'],
    ['QAMO', 'Quality Assurance Management Office (QAMO)', 'Administrative'],
    ['IAU', 'Internal Audit Unit (IAU)', 'Administrative'],
    ['LIB', 'Library and Information Services', 'Administrative'],
    ['GUID', 'Guidance and Counseling Services Office', 'Administrative'],
    ['SCHOL', 'Scholarship and Financial Assistance Office', 'Administrative'],
    ['CIER', 'Center for Internationalization and External Relations (CIER)', 'Administrative'],
    ['DRRM', 'Disaster Risk Reduction and Management Office (DRRM)', 'Administrative'],
    ['GAD', 'Gender and Development (GAD) Office', 'Administrative'],
    ['BAO', 'Business Affairs Office (BAO)', 'Administrative'],
    ['ECSO', 'Extension and Community Services Office (ECSO)', 'Administrative'],
    ['IPMO', 'Intellectual Property and Management Office (IPMO)', 'Administrative'],
    ['NSTP', 'National Service Training Program (NSTP) Office', 'Administrative'],
    ['HMSU', 'Medical and Dental Health Services Unit', 'Administrative']
  ];

  for (const dept of departments) {
    insertDept.run(...dept);
  }

  // 3. Seed Categories
  const insertCat = db.prepare('INSERT INTO categories (name, description, count) VALUES (?, ?, ?)');
  insertCat.run('Policies', 'University policies and issuances', 625);
  insertCat.run('Reports', 'Annual and special reports', 502);
  insertCat.run('Manuals', 'Guidelines and manuals', 450);
  insertCat.run('Forms', 'Administrative and operational forms', 380);
  insertCat.run('Plans', 'Strategic and operational plans', 300);
  insertCat.run('Others', 'Other document types', 247);

  // 4. Seed Documents
  const insertDoc = db.prepare(`
    INSERT INTO documents (title, category, department, type, date_uploaded, size, uploaded_by, description, year, retention_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialDocs = [
    ["Annual University Performance Report 2024", "Reports", "Records Management Office", "PDF", "Aug 28, 2026", "2.4 MB", "Records Officer", "Official institutional annual performance report highlighting CHMSU achievements, academic statistics, and milestones.", "2026", "10-Year Fiscal"],
    ["Research Output & Publication Guidelines", "Policies", "Research and Development Services Office (RDSO)", "PDF", "Aug 27, 2026", "1.8 MB", "RDSO Director", "Guidelines for the conduct, IP disclosure, publication incentives, and ethical compliance of faculty and student research.", "2026", "Permanent Archival"],
    ["Institutional Student Handbook & Code of Conduct", "Manuals", "Office for Student Affairs and Services (OSAS)", "PDF", "Aug 25, 2026", "3.1 MB", "OSAS Dean", "Comprehensive guide to student life, code of discipline, academic standards, scholarship criteria, and campus rights.", "2026", "5-Year Administrative"],
    ["Quality Management System (QMS) Operational Forms", "Forms", "Records Management Office", "PDF", "Aug 22, 2026", "900 KB", "Records Officer", "Standardized QMS templates and audit review checklists aligned with ISO 9001:2015 institutional certification.", "2026", "Permanent Archival"],
    ["Campus-Wide ICT Strategic Plan 2024-2028", "Plans", "Information and Communications Technology Office (ICTO)", "PDF", "Aug 20, 2026", "2.7 MB", "ICTO Head", "Five-year roadmap for campus fiber expansion, server virtualization, hybrid learning portals, and repository storage.", "2026", "10-Year Fiscal"],
    ["Civil Engineering Laboratory & Workshop Safety Protocols", "Manuals", "College of Engineering (COE)", "PDF", "Aug 15, 2026", "3.4 MB", "COE Dean", "Safety guidelines, hazard control procedures, and equipment operating protocols for engineering laboratory facilities.", "2026", "5-Year Administrative"],
    ["BIndTech Industrial Trades Competency & Accreditation Manual", "Manuals", "College of Industrial Technology (CIT)", "PDF", "Jul 28, 2026", "4.8 MB", "CIT Chairperson", "AACCUP Level IV accredited training standards for automotive, mechanical, culinary, and drafting technologies.", "2026", "Permanent Archival"],
    ["Teacher Education Internship & Experiential Learning Handbook", "Manuals", "College of Education (COED)", "PDF", "Jul 10, 2026", "2.9 MB", "COED Dean", "Field study guidelines, teaching practicum assessment criteria, and cooperative school assignment protocols.", "2026", "5-Year Administrative"],
    ["Public Administration & Social Research Guidelines", "Policies", "College of Arts and Sciences (CAS)", "PDF", "Jun 24, 2026", "1.6 MB", "CAS Dean", "Curricular guidelines, field immersion protocols, and empirical thesis standards for social science majors.", "2026", "Permanent Archival"],
    ["Student Academic Records & Transcript Request Procedures", "Policies", "Office of the University Registrar", "PDF", "Jun 15, 2026", "1.2 MB", "Registrar Officer", "Standard operating procedures for student document claims, verification of credentials, CAV authentication, and clearance.", "2026", "Permanent Archival"],
    ["Faculty Terms of Appointment & Promotion Merit System", "Policies", "Human Resource Management Office (HRMO)", "PDF", "May 30, 2026", "3.7 MB", "HRMO Director", "CSC-aligned merit promotion plan, NBC 461 evaluation guidelines, and professional development grant mechanics.", "2026", "Permanent Archival"],
    ["Annual Procurement Plan & Bidding Guidelines (FY 2026)", "Plans", "Bids and Awards Committee (BAC) Office", "PDF", "May 12, 2026", "5.5 MB", "BAC Secretariat", "Consolidated project procurement management plan and competitive bidding guidelines under RA 9184.", "2026", "10-Year Fiscal"],
    ["University Library Online Catalog & Electronic Resource Access Manual", "Manuals", "Library and Information Services", "PDF", "Apr 20, 2026", "2.1 MB", "Chief Librarian", "User guide for accessing subscribed academic journals, ScienceDirect databases, repository holdings, and thesis archives.", "2026", "5-Year Administrative"],
    ["CHMSU Main Campus Master Infrastructure Development Plan", "Plans", "College of Engineering (COE)", "PDF", "Mar 10, 2026", "8.3 MB", "Infrastructure Committee", "Architectural blueprint and modernization plan for classroom buildings, engineering research hubs, and campus walkways.", "2026", "Permanent Archival"],
    ["Business Incubation & Micro-Enterprise Feasibility Guidelines", "Manuals", "College of Business Management and Accountancy (CBMA)", "PDF", "Feb 22, 2026", "3.2 MB", "CBMA Dean", "Standards and rubric for student business plan defense, entrepreneurial mentorship incubator, and hospitality operations.", "2026", "5-Year Administrative"],
    ["Doctoral & Master's Thesis Defense and Colloquium Protocol", "Policies", "Graduate & Advanced Education Programs", "PDF", "Feb 14, 2026", "2.5 MB", "Dean of Graduate Studies", "Guidelines for dissertation defense, oral comprehensive examinations, and Scopus publication requirements.", "2026", "Permanent Archival"],
    ["University Comprehensive Disaster Risk Reduction & Emergency Manual", "Manuals", "Disaster Risk Reduction and Management Office (DRRM)", "PDF", "Jan 30, 2026", "4.1 MB", "DRRM Officer", "Earthquake, flood, and fire evacuation protocols, campus emergency assembly points, and rapid response team operations.", "2026", "Permanent Archival"],
    ["Institutional Gender and Development (GAD) Plan & Budget 2026", "Plans", "Gender and Development (GAD) Office", "PDF", "Jan 18, 2026", "1.9 MB", "GAD Coordinator", "Harmonized gender-responsive programs, health policies, and campus inclusivity advocacy campaigns.", "2026", "5-Year Administrative"],
    ["Community Outreach & Barangay Technical Assistance Records", "Reports", "Extension and Community Services Office (ECSO)", "PDF", "Jan 10, 2026", "3.8 MB", "ECSO Director", "Accomplishment report on community technology transfer, literacy extension programs, and livelihood training in Talisay.", "2026", "5-Year Administrative"],
    ["Semi-Annual Inventory & Fixed Asset Verification Report", "Reports", "Property and Supply Management Office (PSMO)", "PDF", "Dec 18, 2025", "5.1 MB", "PSMO Supply Officer", "Physical audit and property accountability records covering instructional laboratories, IT equipment, and campus vehicles.", "2025", "10-Year Fiscal"]
  ];

  for (const doc of initialDocs) {
    insertDoc.run(...doc);
  }

  // 5. Seed Student Requests
  const insertReq = db.prepare(`
    INSERT INTO student_requests (id, student_id, student_name, program, year_level, document_type, purpose, date_filed, status, priority, contact, verified, verified_at, verified_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialRequests = [
    ["REQ-2026-001", "2022-0142", "Maria Sophia Santos", "BS Information Technology", "4th Year", "Official Transcript of Records (TOR)", "Employment Application (SM Megamall IT)", "Nov 12, 2026", "Pending", "Urgent", "0917-234-5678", 0, null, null],
    ["REQ-2026-002", "2021-0981", "Juan Carlos Dela Cruz", "BS Civil Engineering", "Graduated (Batch 2025)", "Certificate of Good Moral Character", "PRC Board Examination Requirements", "Nov 11, 2026", "Processing", "Standard", "0928-876-5432", 1, "Nov 14, 2026", "Office of the University Registrar"],
    ["REQ-2026-003", "2023-0442", "Elena Grace Gomez", "BSED Major in English", "3rd Year", "Certification of Grades", "CHED Scholarship Renewal", "Nov 10, 2026", "Ready for Release", "Standard", "0919-456-7890", 1, "Nov 13, 2026", "Office of the University Registrar"],
    ["REQ-2026-004", "2020-0312", "Mark Lester Villanueva", "BS Hospitality Management", "Graduated", "Honorable Dismissal & Transfer Credential", "Transfer to Technological University of the Philippines", "Nov 09, 2026", "Released", "Standard", "0933-112-2334", 1, "Nov 12, 2026", "Office of the University Registrar"],
    ["REQ-2026-005", "2024-0019", "Angela Nicole Tan", "BS Criminology", "2nd Year", "Certificate of Enrollment", "Pantawid Pamilyang Pilipino Program (4Ps) Requirement", "Nov 08, 2026", "Released", "Standard", "0945-889-1234", 1, "Nov 11, 2026", "Office of the University Registrar"],
    ["REQ-2026-006", "2021-0554", "Rafael Dominic Bautista", "BS Industrial Technology", "4th Year", "Official Transcript of Records (TOR)", "Overseas Employment (POEA/DMW)", "Nov 13, 2026", "Pending", "Urgent", "0908-776-5544", 0, null, null]
  ];

  for (const req of initialRequests) {
    insertReq.run(...req);
  }

  // 6. Seed Initial Audit Log
  const insertLog = db.prepare('INSERT INTO audit_logs (action, office, details) VALUES (?, ?, ?)');
  insertLog.run('DATABASE_INITIALIZED', 'Records Management Office', 'SQLite Central Database and CHMSU Talisay schema initialized successfully.');
  insertLog.run('INITIAL_DATASET_MIGRATED', 'Records Management Office', '20 institutional documents and 6 student requests successfully seeded.');

  console.log('✅ SQLite Database successfully initialized and seeded with CHMSU Talisay records!');
}
