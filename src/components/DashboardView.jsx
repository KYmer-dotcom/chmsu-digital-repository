import React from 'react';
import { 
  FileText, 
  Layers, 
  Users, 
  HardDrive,
  FileCode2
} from 'lucide-react';
import DonutChart from './DonutChart';
import { initialStats, distributionData } from '../data/mockData';

export default function DashboardView({ documents, onNavigate, onSelectDocument }) {
  const recentDocs = documents.slice(0, 5);

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

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">Overview of the CHMSU Digital Repository</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{initialStats.totalDocuments}</div>
            <div className="stat-label">Total Documents</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Layers size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{initialStats.categories}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper yellow">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{initialStats.users}</div>
            <div className="stat-label">Users</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <HardDrive size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{initialStats.storageUsed}</div>
            <div className="stat-label">Storage Used</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Documents */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Documents</h3>
            <span 
              className="card-action-link"
              onClick={() => onNavigate('documents')}
            >
              View All
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date Uploaded</th>
                  <th>Uploaded By</th>
                </tr>
              </thead>
              <tbody>
                {recentDocs.map((doc) => (
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
                        <span>{doc.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeClass(doc.category)}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td style={{ color: '#64748b' }}>{doc.dateUploaded}</td>
                    <td style={{ color: '#64748b' }}>{doc.uploadedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Document Distribution</h3>
          </div>
          <DonutChart data={distributionData} />
        </div>
      </div>
    </div>
  );
}
