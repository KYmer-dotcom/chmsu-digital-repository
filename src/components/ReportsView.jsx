import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Building2, 
  HardDrive, 
  ShieldCheck,
  Printer
} from 'lucide-react';
import DonutChart from './DonutChart';
import { distributionData, requestDistributionData } from '../data/mockData';

export default function ReportsView({ 
  currentUser, 
  studentRequests = [], 
  documents = [], 
  showToast 
}) {
  const isRegistrar = currentUser?.role === 'Registrar';

  // Registrar Metrics
  const totalRequests = studentRequests.length;
  const releasedCount = studentRequests.filter(r => r.status === 'Released').length;
  const processingCount = studentRequests.filter(r => r.status === 'Processing').length;
  const pendingCount = studentRequests.filter(r => r.status === 'Pending').length;

  const handleExportRegistrarCSV = () => {
    const headers = ["Request ID", "Student ID", "Student Name", "Degree Program", "Document Requested", "Purpose", "Date Filed", "Status", "Priority"];
    const rows = studentRequests.map(r => [
      r.id,
      r.studentId,
      `"${r.studentName}"`,
      `"${r.program}"`,
      `"${r.documentType}"`,
      `"${r.purpose}"`,
      r.dateFiled,
      r.status,
      r.priority
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chmsu_registrar_releasing_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${studentRequests.length} student request records to CSV!`);
  };

  const handleExportRecordsCSV = () => {
    const headers = ["ID", "Title", "Category", "Department", "Type", "Date Uploaded", "Size", "Author"];
    const rows = documents.map(d => [
      d.id,
      `"${d.title.replace(/"/g, '""')}"`,
      d.category,
      `"${(d.department || 'Records Office').replace(/"/g, '""')}"`,
      d.type,
      d.dateUploaded,
      d.size,
      `"${d.uploadedBy || 'Archivist'}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chmsu_archival_analytics_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${documents.length} repository holdings to CSV!`);
  };

  /* =========================================================================
     1. REGISTRAR REPORTS (Student Credential Releasing Velocity & Demand)
     ========================================================================= */
  if (isRegistrar) {
    const programDemand = [
      { program: 'BS Information Technology', count: 42, color: '#10b981' },
      { program: 'BS Civil Engineering', count: 35, color: '#0284c7' },
      { program: 'BS Hospitality Management', count: 28, color: '#f59e0b' },
      { program: 'BSED Major in English', count: 22, color: '#8b5cf6' },
      { program: 'BS Industrial Technology', count: 18, color: '#ec4899' },
    ];

    return (
      <div className="page-content">
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="page-title">Registrar Release Reports</h2>
            <p className="page-subtitle">
              Office of the University Registrar • Student credential processing velocity and release fulfillment
            </p>
          </div>

          <button 
            className="btn-primary"
            onClick={handleExportRegistrarCSV}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={16} /> Export Release Report
          </button>
        </div>

        {/* 4 Registrar KPIs */}
        <div className="stat-cards-grid" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <FileText size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{totalRequests}</div>
              <div className="stat-label">Total Requests Filed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <CheckCircle2 size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{releasedCount}</div>
              <div className="stat-label">Credentials Released</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper yellow">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{processingCount}</div>
              <div className="stat-label">Under Active Review</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">1.8 Days</div>
              <div className="stat-label">Avg. Releasing Window</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
          {/* Program Demand Bar Chart */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '6px' }}>Request Volume by Academic Degree Program</h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '18px' }}>
              Highest student credential requests across Talisay colleges
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {programDemand.map((item) => (
                <div key={item.program}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.program}</span>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>{item.count} requests</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(item.count / 45) * 100}%`, height: '100%', background: item.color, borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credential Distribution Donut */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Requests by Document Type</h3>
            </div>
            <DonutChart data={requestDistributionData} totalLabel="Requests" />
          </div>
        </div>

        {/* Recent Student Request Logs */}
        <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 className="card-title">Recent Releasing Pipeline Records</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Student Name</th>
                  <th>Degree Program</th>
                  <th>Credential</th>
                  <th>Date Filed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentRequests.slice(0, 6).map((req) => (
                  <tr key={req.id}>
                    <td><span className="req-id-code">{req.id}</span></td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{req.studentName}</td>
                    <td style={{ color: '#475569' }}>{req.program}</td>
                    <td>{req.documentType}</td>
                    <td style={{ color: '#64748b' }}>{req.dateFiled}</td>
                    <td>
                      <span className={`req-badge ${req.status === 'Released' ? 'badge-released' : req.status === 'Ready for Release' ? 'badge-ready' : 'badge-processing'}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. RECORDS MANAGEMENT OFFICE REPORTS (Archival Holdings & Department Volume)
     ========================================================================= */
  const collegeHoldings = [
    { name: 'College of Engineering (COE)', count: 320, color: '#0e8345' },
    { name: 'College of Industrial Technology (CIT)', count: 285, color: '#0284c7' },
    { name: 'College of Education (COED)', count: 240, color: '#8b5cf6' },
    { name: 'College of Arts and Sciences (CAS)', count: 215, color: '#f43f5e' },
    { name: 'College of Business & Management (CBMA)', count: 190, color: '#f59e0b' },
    { name: 'Administrative & Executive Offices', count: 480, color: '#64748b' }
  ];

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="page-title">Records Archival Analytics</h2>
          <p className="page-subtitle">
            Records Management Office • Repository holdings growth, department indexing, and compliance
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={handleExportRecordsCSV}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Download size={16} /> Export Holdings Report
        </button>
      </div>

      {/* 4 Records Office KPIs */}
      <div className="stat-cards-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{documents.length}</div>
            <div className="stat-label">Total Indexed Records</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Building2 size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">25 Units</div>
            <div className="stat-label">Colleges & Offices Indexed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <HardDrive size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">5.2 GB</div>
            <div className="stat-label">Storage (Quota: 20 GB)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper yellow">
            <ShieldCheck size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">100%</div>
            <div className="stat-label">NAP Retention Audited</div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        {/* Department Volume Progress Bars */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '6px' }}>Archival Holdings by Talisay College / Unit</h3>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '18px' }}>
            Document submissions across academic and administrative departments
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {collegeHoldings.map((item) => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.name}</span>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>{item.count} records</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(item.count / 500) * 100}%`, height: '100%', background: item.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Classification Donut */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Archive Classification</h3>
          </div>
          <DonutChart data={distributionData} totalLabel="Documents" />
        </div>
      </div>

      {/* Ingestion Audit Table */}
      <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 className="card-title">Latest University Ingestion Log</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Originating College / Office</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date Uploaded</th>
                <th>Archivist</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 6).map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{doc.title}</td>
                  <td style={{ color: '#475569' }}>{doc.department || 'Records Office'}</td>
                  <td>
                    <span className={`badge badge-${doc.category.toLowerCase()}`} style={{ fontSize: '0.74rem' }}>
                      {doc.category}
                    </span>
                  </td>
                  <td style={{ color: '#64748b' }}>{doc.type}</td>
                  <td style={{ color: '#64748b' }}>{doc.dateUploaded}</td>
                  <td style={{ color: '#334155' }}>{doc.uploadedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
