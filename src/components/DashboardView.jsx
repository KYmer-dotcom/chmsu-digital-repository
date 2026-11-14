import React from 'react';
import { 
  FileText, 
  Layers, 
  HardDrive,
  FileCode2,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Database,
  ArrowRight,
  ShieldCheck,
  Search,
  Printer
} from 'lucide-react';
import DonutChart from './DonutChart';
import { initialStats, distributionData, requestDistributionData } from '../data/mockData';

export default function DashboardView({ 
  currentUser,
  documents, 
  studentRequests = [],
  onNavigate, 
  onSelectDocument 
}) {
  const isRegistrar = currentUser?.role === 'Registrar';

  // Registrar Metrics
  const pendingCount = studentRequests.filter((r) => r.status === 'Pending').length;
  const processingCount = studentRequests.filter((r) => r.status === 'Processing').length;
  const readyCount = studentRequests.filter((r) => r.status === 'Ready for Release').length;
  const releasedCount = studentRequests.filter((r) => r.status === 'Released').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="req-badge badge-pending"><Clock size={12} /> Pending</span>;
      case 'Processing':
        return <span className="req-badge badge-processing"><Clock size={12} /> In Review</span>;
      case 'Ready for Release':
        return <span className="req-badge badge-ready"><CheckCircle2 size={12} /> Ready</span>;
      case 'Released':
        return <span className="req-badge badge-released"><CheckCircle2 size={12} /> Released</span>;
      default:
        return <span className="req-badge">{status}</span>;
    }
  };

  const getBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'reports': return 'badge-reports';
      case 'policies': return 'badge-policies';
      case 'manuals': return 'badge-manuals';
      case 'forms': return 'badge-forms';
      case 'plans': return 'badge-plans';
      default: return 'badge-others';
    }
  };

  /* =========================================================================
     1. REGISTRAR DASHBOARD (Student Document Requests Focus)
     ========================================================================= */
  if (isRegistrar) {
    return (
      <div className="page-content">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="page-title">Registrar Requests Dashboard</h2>
            <p className="page-subtitle">
              Office of the University Registrar • Live student document processing & release center
            </p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => onNavigate('requests')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <PlusCircle size={17} />
            <span>Open Request Pipeline</span>
          </button>
        </div>

        {/* 4 Registrar KPIs */}
        <div className="stat-cards-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper blue">
              <FileText size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{studentRequests.length}</div>
              <div className="stat-label">Total Student Requests</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper yellow">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{pendingCount}</div>
              <div className="stat-label">Pending Verification</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple">
              <Layers size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{processingCount}</div>
              <div className="stat-label">In Review / Processing</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <CheckCircle2 size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{releasedCount}</div>
              <div className="stat-label">Released to Students</div>
            </div>
          </div>
        </div>

        {/* Main Grid: Student Requests Pipeline + Distribution */}
        <div className="dashboard-grid">
          {/* Left Column: Recent Student Requests */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Recent Document Requests</h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                  Latest requests filed by CHMSU students
                </p>
              </div>
              <span 
                className="card-action-link"
                onClick={() => onNavigate('requests')}
              >
                View Full Queue <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </span>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>Student Name</th>
                    <th>Document</th>
                    <th>Date Filed</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentRequests.slice(0, 5).map((req) => (
                    <tr 
                      key={req.id}
                      onClick={() => onNavigate('requests')}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <span className="req-id-code">{req.id}</span>
                      </td>
                      <td>
                        <div className="student-info-cell">
                          <span className="student-name">{req.studentName}</span>
                          <span className="student-id-sub">{req.program}</span>
                        </div>
                      </td>
                      <td>
                        <div className="doc-type-cell">
                          <FileText size={15} color="#0e8345" />
                          <span>{req.documentType}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {req.dateFiled}
                      </td>
                      <td>
                        {getStatusBadge(req.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Request Breakdown Donut + Quick Office Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Requests by Document</h3>
              </div>
              <DonutChart data={requestDistributionData} totalLabel="Requests" />
            </div>

            {/* Quick Action Box */}
            <div className="card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#0f172a' }}>
                Registrar Quick Tools
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 14px' }}>
                Need to verify university student records or print an acknowledgment slip?
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-outline"
                  onClick={() => onNavigate('documents')}
                  style={{ flex: 1, fontSize: '0.82rem', padding: '8px' }}
                >
                  <Search size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Search Archive
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => onNavigate('requests')}
                  style={{ flex: 1, fontSize: '0.82rem', padding: '8px' }}
                >
                  <PlusCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  New Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. RECORDS OFFICE DASHBOARD (Storage & Archiving Authority)
     ========================================================================= */
  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">Records Storage & Archive Dashboard</h2>
          <p className="page-subtitle">
            Records Management Office • Repository storage health, document ingest, and university archives
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => onNavigate('upload')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle size={17} />
          <span>Ingest New Document</span>
        </button>
      </div>

      {/* 4 Records Office KPIs */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{documents.length}</div>
            <div className="stat-label">Archived Documents</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Layers size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{initialStats.categories}</div>
            <div className="stat-label">Active Categories</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <HardDrive size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{initialStats.storageUsed}</div>
            <div className="stat-label">Storage (Quota: {initialStats.storageQuota})</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <ShieldCheck size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">Secured</div>
            <div className="stat-label">System Backup Status</div>
          </div>
        </div>
      </div>

      {/* Storage Quota Progress Bar Widget */}
      <div className="card" style={{ marginBottom: '24px', padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={17} color="#0e8345" />
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
              Institutional Repository Storage Meter
            </span>
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>
            5.2 GB of 20.0 GB (26% Utilized)
          </span>
        </div>
        <div className="storage-meter-bar">
          <div className="storage-meter-fill" style={{ width: '26%' }}></div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Ingested Documents */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Ingested Records</h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                Latest policies, issuances, and memoranda archived
              </p>
            </div>
            <span 
              className="card-action-link"
              onClick={() => onNavigate('documents')}
            >
              View Repository <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date Archived</th>
                  <th>Archivist</th>
                </tr>
              </thead>
              <tbody>
                {documents.slice(0, 5).map((doc) => (
                  <tr 
                    key={doc.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectDocument(doc)}
                  >
                    <td>
                      <div className="doc-title-cell">
                        <span className="pdf-badge">
                          <FileCode2 size={16} />
                        </span>
                        <div>
                          <div className="doc-title-text">{doc.title}</div>
                          <div className="doc-meta-text">{doc.size} • {doc.type}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeClass(doc.category)}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {doc.dateUploaded}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#475569' }}>
                      {doc.uploadedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Storage Distribution Chart & Disaster Recovery Snapshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Archive by Classification</h3>
            </div>
            <DonutChart data={distributionData} totalLabel="Documents" />
          </div>

          {/* Quick Backup Snapshot */}
          <div className="card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.9rem', color: '#0f172a' }}>
              Disaster Recovery & Snapshots
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 14px' }}>
              Full database mirror and document snapshots are up to date.
            </p>
            <button 
              className="btn-outline"
              onClick={() => onNavigate('backup')}
              style={{ width: '100%', fontSize: '0.84rem', padding: '8px' }}
            >
              <Database size={15} style={{ display: 'inline', marginRight: '6px' }} />
              Open Backup & Recovery Manager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
