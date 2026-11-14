export const initialStats = {
  totalDocuments: "2,504",
  categories: "12",
  users: "156",
  storageUsed: "5.2 GB"
};

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

export const initialDocuments = [
  {
    id: 1,
    title: "Annual Report 2024",
    category: "Reports",
    type: "PDF",
    dateUploaded: "Aug 28, 2026",
    size: "2.4 MB",
    uploadedBy: "Admin",
    description: "Official annual performance report highlighting university achievements, academic statistics, and community development milestones for fiscal year 2024.",
    year: "2026"
  },
  {
    id: 2,
    title: "Research Output Guidelines",
    category: "Policies",
    type: "PDF",
    dateUploaded: "Aug 27, 2026",
    size: "1.8 MB",
    uploadedBy: "R. Santos",
    description: "Guidelines for the conduct and management of research, publications, intellectual property disclosure, and faculty incentives.",
    year: "2026"
  },
  {
    id: 3,
    title: "Student Handbook",
    category: "Manuals",
    type: "PDF",
    dateUploaded: "Aug 25, 2026",
    size: "3.1 MB",
    uploadedBy: "L. Dela Cruz",
    description: "Comprehensive guide to student life, code of conduct, academic standards, scholarship criteria, and campus rights and responsibilities.",
    year: "2026"
  },
  {
    id: 4,
    title: "QMS Forms",
    category: "Forms",
    type: "PDF",
    dateUploaded: "Aug 22, 2026",
    size: "900 KB",
    uploadedBy: "Admin",
    description: "Standardized Quality Management System templates and audit review checklists aligned with ISO 9001:2015 institutional certification.",
    year: "2026"
  },
  {
    id: 5,
    title: "ICT Strategic Plan",
    category: "Plans",
    type: "PDF",
    dateUploaded: "Aug 20, 2026",
    size: "2.7 MB",
    uploadedBy: "M. Torres",
    description: "Five-year roadmap for campus-wide digital transformation, fiber network expansion, hybrid learning systems, and repository infrastructure.",
    year: "2026"
  },
  {
    id: 6,
    title: "Research Agenda 2023-2028",
    category: "Reports",
    type: "PDF",
    dateUploaded: "Jul 15, 2026",
    size: "4.2 MB",
    uploadedBy: "Admin",
    description: "Strategic research directions and priority areas focusing on agriculture, engineering, educational leadership, and ecological preservation in Western Visayas.",
    year: "2026"
  },
  {
    id: 7,
    title: "Research Ethics Policy",
    category: "Policies",
    type: "PDF",
    dateUploaded: "Jun 10, 2026",
    size: "1.5 MB",
    uploadedBy: "R. Santos",
    description: "Policy on research ethics and compliance protocols involving human participants, data privacy, biosafety, and ethical review board governance.",
    year: "2026"
  },
  {
    id: 8,
    title: "Research Proposal Template",
    category: "Forms",
    type: "PDF",
    dateUploaded: "May 28, 2026",
    size: "650 KB",
    uploadedBy: "Admin",
    description: "Standard template for research proposals, budgetary line-item allocations, work plans, and expected deliverables for internal and external funding.",
    year: "2026"
  },
  {
    id: 9,
    title: "Faculty Operations Manual",
    category: "Manuals",
    type: "PDF",
    dateUploaded: "Apr 14, 2026",
    size: "5.1 MB",
    uploadedBy: "L. Dela Cruz",
    description: "Faculty terms of appointment, promotion guidelines, workload units calculation, and academic tenure protocols.",
    year: "2026"
  },
  {
    id: 10,
    title: "Campus Master Development Plan",
    category: "Plans",
    type: "PDF",
    dateUploaded: "Mar 02, 2026",
    size: "8.3 MB",
    uploadedBy: "M. Torres",
    description: "Infrastructure and architectural layout for the modernization of Carlos Hilado Memorial State University Talisay Campus.",
    year: "2026"
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
