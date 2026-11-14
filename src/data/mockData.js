export const initialStats = {
  totalDocuments: "2,504",
  categories: "12",
  storageUsed: "5.2 GB",
  storageQuota: "20.0 GB",
  backupStatus: "Operational"
};

export const registrarStats = {
  totalRequests: "148",
  pendingRequests: "18",
  processingRequests: "12",
  releasedToday: "24"
};

export const requestDistributionData = [
  { name: "Transcript of Records (TOR)", percentage: 38, color: "#0e8345", count: 56 },
  { name: "Certificate of Good Moral", percentage: 26, color: "#e5a93b", count: 39 },
  { name: "Certification of Grades", percentage: 18, color: "#0284c7", count: 27 },
  { name: "Honorable Dismissal", percentage: 10, color: "#8b5cf6", count: 15 },
  { name: "Diploma / CAV Authentication", percentage: 8, color: "#f43f5e", count: 11 },
];

export const distributionData = [
  { name: "Policies", percentage: 25, color: "#10b981", count: 625 },
  { name: "Reports", percentage: 20, color: "#0284c7", count: 502 },
  { name: "Manuals", percentage: 18, color: "#8b5cf6", count: 450 },
  { name: "Forms", percentage: 15, color: "#f43f5e", count: 380 },
  { name: "Plans", percentage: 12, color: "#f59e0b", count: 300 },
  { name: "Others", percentage: 10, color: "#64748b", count: 247 },
];

export const initialCategories = [
  {
    id: 1,
    name: "Policies",
    description: "University policies and issuances",
    count: 625
  },
  {
    id: 2,
    name: "Reports",
    description: "Annual and special reports",
    count: 502
  },
  {
    id: 3,
    name: "Manuals",
    description: "Guidelines and manuals",
    count: 450
  },
  {
    id: 4,
    name: "Forms",
    description: "Administrative and operational forms",
    count: 380
  },
  {
    id: 5,
    name: "Plans",
    description: "Strategic and operational plans",
    count: 300
  },
  {
    id: 6,
    name: "Others",
    description: "Other document types",
    count: 247
  }
];

export const chmsuTalisayDepartments = [
  // Academic Colleges (Talisay Main Campus)
  { id: 'COE', name: 'College of Engineering (COE)', type: 'Academic', code: 'COE' },
  { id: 'CIT', name: 'College of Industrial Technology (CIT)', type: 'Academic', code: 'CIT' },
  { id: 'COED', name: 'College of Education (COED)', type: 'Academic', code: 'COED' },
  { id: 'CAS', name: 'College of Arts and Sciences (CAS)', type: 'Academic', code: 'CAS' },
  { id: 'CBMA', name: 'College of Business Management and Accountancy (CBMA)', type: 'Academic', code: 'CBMA' },
  { id: 'GRAD', name: 'Graduate & Advanced Education Programs', type: 'Academic', code: 'GRAD' },

  // Executive & Administrative Offices (Talisay Main Campus)
  { id: 'OP', name: 'Office of the University President (OP)', type: 'Administrative', code: 'OP' },
  { id: 'OVPAA', name: 'Office of the Vice President for Academic Affairs (OVPAA)', type: 'Administrative', code: 'OVPAA' },
  { id: 'OVPAF', name: 'Office of the Vice President for Administration and Finance (OVPAF)', type: 'Administrative', code: 'OVPAF' },
  { id: 'OVPRE', name: 'Office of the Vice President for Research and Extension (OVPRE)', type: 'Administrative', code: 'OVPRE' },
  { id: 'RMO', name: 'Records Management Office', type: 'Administrative', code: 'RMO' },
  { id: 'REG', name: 'Office of the University Registrar', type: 'Administrative', code: 'REG' },
  { id: 'ICTO', name: 'Information and Communications Technology Office (ICTO)', type: 'Administrative', code: 'ICTO' },
  { id: 'HRMO', name: 'Human Resource Management Office (HRMO)', type: 'Administrative', code: 'HRMO' },
  { id: 'OSAS', name: 'Office for Student Affairs and Services (OSAS)', type: 'Administrative', code: 'OSAS' },
  { id: 'RDSO', name: 'Research and Development Services Office (RDSO)', type: 'Administrative', code: 'RDSO' },
  { id: 'PSMO', name: 'Property and Supply Management Office (PSMO)', type: 'Administrative', code: 'PSMO' },
  { id: 'BAC', name: 'Bids and Awards Committee (BAC) Office', type: 'Administrative', code: 'BAC' },
  { id: 'QAMO', name: 'Quality Assurance Management Office (QAMO)', type: 'Administrative', code: 'QAMO' },
  { id: 'IAU', name: 'Internal Audit Unit (IAU)', type: 'Administrative', code: 'IAU' },
  { id: 'LIB', name: 'Library and Information Services', type: 'Administrative', code: 'LIB' },
  { id: 'GUID', name: 'Guidance and Counseling Services Office', type: 'Administrative', code: 'GUID' },
  { id: 'SCHOL', name: 'Scholarship and Financial Assistance Office', type: 'Administrative', code: 'SCHOL' },
  { id: 'CIER', name: 'Center for Internationalization and External Relations (CIER)', type: 'Administrative', code: 'CIER' },
  { id: 'DRRM', name: 'Disaster Risk Reduction and Management Office (DRRM)', type: 'Administrative', code: 'DRRM' },
  { id: 'GAD', name: 'Gender and Development (GAD) Office', type: 'Administrative', code: 'GAD' },
  { id: 'BAO', name: 'Business Affairs Office (BAO)', type: 'Administrative', code: 'BAO' },
  { id: 'ECSO', name: 'Extension and Community Services Office (ECSO)', type: 'Administrative', code: 'ECSO' },
  { id: 'IPMO', name: 'Intellectual Property and Management Office (IPMO)', type: 'Administrative', code: 'IPMO' },
  { id: 'NSTP', name: 'National Service Training Program (NSTP) Office', type: 'Administrative', code: 'NSTP' },
  { id: 'HMSU', name: 'Medical and Dental Health Services Unit', type: 'Administrative', code: 'HMSU' }
];

export const initialDocuments = [
  {
    id: 1,
    title: "Annual University Performance Report 2024",
    category: "Reports",
    department: "Records Management Office",
    type: "PDF",
    dateUploaded: "Aug 28, 2026",
    size: "2.4 MB",
    uploadedBy: "Records Officer",
    description: "Official institutional annual performance report highlighting CHMSU achievements, academic statistics, and community development milestones.",
    year: "2026"
  },
  {
    id: 2,
    title: "Research Output & Publication Guidelines",
    category: "Policies",
    department: "Research and Development Services Office (RDSO)",
    type: "PDF",
    dateUploaded: "Aug 27, 2026",
    size: "1.8 MB",
    uploadedBy: "RDSO Director",
    description: "Guidelines for the conduct, intellectual property disclosure, publication incentives, and ethical compliance of faculty and student research.",
    year: "2026"
  },
  {
    id: 3,
    title: "Institutional Student Handbook & Code of Conduct",
    category: "Manuals",
    department: "Office for Student Affairs and Services (OSAS)",
    type: "PDF",
    dateUploaded: "Aug 25, 2026",
    size: "3.1 MB",
    uploadedBy: "OSAS Dean",
    description: "Comprehensive guide to student life, code of discipline, academic standards, scholarship criteria, and campus rights and responsibilities.",
    year: "2026"
  },
  {
    id: 4,
    title: "Quality Management System (QMS) Operational Forms",
    category: "Forms",
    department: "Records Management Office",
    type: "PDF",
    dateUploaded: "Aug 22, 2026",
    size: "900 KB",
    uploadedBy: "Records Officer",
    description: "Standardized Quality Management System templates and audit review checklists aligned with ISO 9001:2015 institutional certification.",
    year: "2026"
  },
  {
    id: 5,
    title: "Campus-Wide ICT Strategic Plan 2024-2028",
    category: "Plans",
    department: "Information and Communications Technology Office (ICTO)",
    type: "PDF",
    dateUploaded: "Aug 20, 2026",
    size: "2.7 MB",
    uploadedBy: "ICTO Head",
    description: "Five-year roadmap for campus-wide fiber expansion, server virtualization, hybrid learning portals, and digital repository infrastructure.",
    year: "2026"
  },
  {
    id: 6,
    title: "Civil Engineering Laboratory & Workshop Safety Protocols",
    category: "Manuals",
    department: "College of Engineering (COE)",
    type: "PDF",
    dateUploaded: "Aug 15, 2026",
    size: "3.4 MB",
    uploadedBy: "COE Dean",
    description: "Safety guidelines, hazard control procedures, and equipment operating protocols for civil and mechanical engineering laboratory facilities.",
    year: "2026"
  },
  {
    id: 7,
    title: "BIndTech Industrial Trades Competency & Accreditation Manual",
    category: "Manuals",
    department: "College of Industrial Technology (CIT)",
    type: "PDF",
    dateUploaded: "Jul 28, 2026",
    size: "4.8 MB",
    uploadedBy: "CIT Chairperson",
    description: "AACCUP Level IV accredited training standards for automotive, mechanical, culinary, architectural drafting, and refrigeration technologies.",
    year: "2026"
  },
  {
    id: 8,
    title: "Teacher Education Internship & Experiential Learning Handbook",
    category: "Manuals",
    department: "College of Education (COED)",
    type: "PDF",
    dateUploaded: "Jul 10, 2026",
    size: "2.9 MB",
    uploadedBy: "COED Dean",
    description: "Field study guidelines, teaching practicum assessment criteria, and cooperative school assignment protocols for pre-service teachers.",
    year: "2026"
  },
  {
    id: 9,
    title: "Public Administration & Social Research Guidelines",
    category: "Policies",
    department: "College of Arts and Sciences (CAS)",
    type: "PDF",
    dateUploaded: "Jun 24, 2026",
    size: "1.6 MB",
    uploadedBy: "CAS Dean",
    description: "Curricular guidelines, community field immersion protocols, and empirical thesis standards for social science and public administration majors.",
    year: "2026"
  },
  {
    id: 10,
    title: "Student Academic Records & Transcript Request Procedures",
    category: "Policies",
    department: "Office of the University Registrar",
    type: "PDF",
    dateUploaded: "Jun 15, 2026",
    size: "1.2 MB",
    uploadedBy: "Registrar Officer",
    description: "Standard operating procedures for student document claims, verification of academic credentials, CAV authentication, and graduation clearance.",
    year: "2026"
  },
  {
    id: 11,
    title: "Faculty Terms of Appointment & Promotion Merit System",
    category: "Policies",
    department: "Human Resource and Management Office (HRMO)",
    type: "PDF",
    dateUploaded: "May 30, 2026",
    size: "3.7 MB",
    uploadedBy: "HRMO Director",
    description: "CSC-aligned merit promotion plan, NBC 461 evaluation guidelines, and professional development grant mechanics for faculty and staff.",
    year: "2026"
  },
  {
    id: 12,
    title: "Annual Procurement Plan & Bidding Guidelines (FY 2026)",
    category: "Plans",
    department: "Bids and Awards Committee (BAC) Office",
    type: "PDF",
    dateUploaded: "May 12, 2026",
    size: "5.5 MB",
    uploadedBy: "BAC Secretariat",
    description: "Consolidated project procurement management plan, bidding schedule, and competitive procurement guidelines in compliance with RA 9184.",
    year: "2026"
  },
  {
    id: 13,
    title: "University Library Online Catalog & Electronic Resource Access Manual",
    category: "Manuals",
    department: "Library and Information Services",
    type: "PDF",
    dateUploaded: "Apr 20, 2026",
    size: "2.1 MB",
    uploadedBy: "Chief Librarian",
    description: "User guide for accessing subscribed academic journals, ScienceDirect databases, repository holdings, and thesis archives.",
    year: "2026"
  },
  {
    id: 14,
    title: "CHMSU Main Campus Master Infrastructure Development Plan",
    category: "Plans",
    department: "College of Engineering (COE)",
    type: "PDF",
    dateUploaded: "Mar 10, 2026",
    size: "8.3 MB",
    uploadedBy: "Infrastructure Planning Committee",
    description: "Architectural blueprint and modernization plan for classroom buildings, engineering research hubs, student centers, and green campus walkways.",
    year: "2026"
  },
  {
    id: 15,
    title: "Business Incubation & Micro-Enterprise Feasibility Guidelines",
    category: "Manuals",
    department: "College of Business Management and Accountancy (CBMA)",
    type: "PDF",
    dateUploaded: "Feb 22, 2026",
    size: "3.2 MB",
    uploadedBy: "CBMA Dean",
    description: "Standards and rubric for student business plan defense, entrepreneurial mentorship incubator, and hospitality internship operations.",
    year: "2026"
  },
  {
    id: 16,
    title: "Doctoral & Master's Thesis Defense and Colloquium Protocol",
    category: "Policies",
    department: "Graduate & Advanced Education Programs",
    type: "PDF",
    dateUploaded: "Feb 14, 2026",
    size: "2.5 MB",
    uploadedBy: "Dean of Graduate Studies",
    description: "Comprehensive guidelines for dissertation defense, oral comprehensive examinations, and Scopus publication requirements.",
    year: "2026"
  },
  {
    id: 17,
    title: "University Comprehensive Disaster Risk Reduction & Emergency Manual",
    category: "Manuals",
    department: "Disaster Risk Reduction and Management Office (DRRM)",
    type: "PDF",
    dateUploaded: "Jan 30, 2026",
    size: "4.1 MB",
    uploadedBy: "DRRM Officer",
    description: "Earthquake, flood, and fire evacuation protocols, campus emergency assembly points, and rapid response team standard operations.",
    year: "2026"
  },
  {
    id: 18,
    title: "Institutional Gender and Development (GAD) Plan & Budget 2026",
    category: "Plans",
    department: "Gender and Development (GAD) Office",
    type: "PDF",
    dateUploaded: "Jan 18, 2026",
    size: "1.9 MB",
    uploadedBy: "GAD Coordinator",
    description: "Harmonized gender-responsive programs, maternity and paternity health policies, and campus inclusivity advocacy campaigns.",
    year: "2026"
  },
  {
    id: 19,
    title: "Community Outreach & Barangay Technical Assistance Records",
    category: "Reports",
    department: "Extension and Community Services Office (ECSO)",
    type: "PDF",
    dateUploaded: "Jan 10, 2026",
    size: "3.8 MB",
    uploadedBy: "ECSO Director",
    description: "Accomplishment report on community technology transfer, literacy extension programs, and livelihood training in Talisay barangays.",
    year: "2026"
  },
  {
    id: 20,
    title: "Semi-Annual Inventory & Fixed Asset Verification Report",
    category: "Reports",
    department: "Property and Supply Management Office (PSMO)",
    type: "PDF",
    dateUploaded: "Dec 18, 2025",
    size: "5.1 MB",
    uploadedBy: "PSMO Supply Officer",
    description: "Physical audit and property accountability records covering instructional laboratories, IT equipment, and campus vehicles.",
    year: "2025"
  }
];

export const backupHistory = [
  {
    id: 1,
    date: "Aug 28, 2026",
    type: "Full Backup",
    size: "1.2 GB",
    status: "Completed"
  },
  {
    id: 2,
    date: "Aug 21, 2026",
    type: "Incremental",
    size: "320 MB",
    status: "Completed"
  },
  {
    id: 3,
    date: "Aug 14, 2026",
    type: "Incremental",
    size: "280 MB",
    status: "Completed"
  },
  {
    id: 4,
    date: "Aug 07, 2026",
    type: "Incremental",
    size: "310 MB",
    status: "Completed"
  }
];

export const userGuideTopics = [
  { id: "getting-started", title: "Getting Started" },
  { id: "managing-documents", title: "Managing Documents" },
  { id: "searching-documents", title: "Searching Documents" },
  { id: "categories", title: "Categories" },
  { id: "backup-and-recovery", title: "Backup and Recovery" },
  { id: "admin-functions", title: "Administrator Functions" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "faqs", title: "FAQs" }
];

export const initialStudentRequests = [
  {
    id: "REQ-2026-001",
    studentId: "2022-0142",
    studentName: "Maria Sophia Santos",
    program: "BS Information Technology",
    yearLevel: "4th Year",
    documentType: "Official Transcript of Records (TOR)",
    purpose: "Employment Application (SM Megamall IT)",
    dateFiled: "Nov 12, 2026",
    status: "Pending",
    priority: "Urgent",
    contact: "0917-234-5678"
  },
  {
    id: "REQ-2026-002",
    studentId: "2021-0981",
    studentName: "Juan Carlos Dela Cruz",
    program: "BS Civil Engineering",
    yearLevel: "Graduated (Batch 2025)",
    documentType: "Certificate of Good Moral Character",
    purpose: "PRC Board Examination Requirements",
    dateFiled: "Nov 11, 2026",
    status: "Processing",
    priority: "Standard",
    contact: "0928-876-5432"
  },
  {
    id: "REQ-2026-003",
    studentId: "2023-0442",
    studentName: "Elena Grace Gomez",
    program: "BSED Major in English",
    yearLevel: "3rd Year",
    documentType: "Certification of Grades",
    purpose: "CHED Scholarship Renewal",
    dateFiled: "Nov 10, 2026",
    status: "Ready for Release",
    priority: "Standard",
    contact: "0919-456-7890"
  },
  {
    id: "REQ-2026-004",
    studentId: "2020-0312",
    studentName: "Mark Lester Villanueva",
    program: "BS Hospitality Management",
    yearLevel: "Graduated",
    documentType: "Honorable Dismissal & Transfer Credential",
    purpose: "Transfer to Technological University of the Philippines",
    dateFiled: "Nov 09, 2026",
    status: "Released",
    priority: "Standard",
    contact: "0933-112-2334"
  },
  {
    id: "REQ-2026-005",
    studentId: "2024-0019",
    studentName: "Angela Nicole Tan",
    program: "BS Criminology",
    yearLevel: "2nd Year",
    documentType: "Certificate of Enrollment",
    purpose: "Pantawid Pamilyang Pilipino Program (4Ps) Requirement",
    dateFiled: "Nov 08, 2026",
    status: "Released",
    priority: "Standard",
    contact: "0945-889-1234"
  },
  {
    id: "REQ-2026-006",
    studentId: "2021-0554",
    studentName: "Rafael Dominic Bautista",
    program: "BS Industrial Technology",
    yearLevel: "4th Year",
    documentType: "Official Transcript of Records (TOR)",
    purpose: "Overseas Employment (POEA/DMW)",
    dateFiled: "Nov 13, 2026",
    status: "Pending",
    priority: "Urgent",
    contact: "0908-776-5544"
  }
];
