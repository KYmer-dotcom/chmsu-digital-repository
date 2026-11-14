import React, { useState } from 'react';
import { 
  FileCode2, 
  Plus, 
  Eye, 
  Download, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Share2
} from 'lucide-react';

export default function DocumentsView({ 
  currentUser,
  documents, 
  onNavigate, 
  onSelectDocument, 
  onDeleteDocument,
  showToast 
}) {
  const isRegistrar = currentUser?.role === 'Registrar';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null);

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

  const getDocIconColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'reports': return '#0284c7';
      case 'policies': return '#0e8345';
      case 'manuals': return '#8b5cf6';
      case 'forms': return '#f43f5e';
      case 'plans': return '#d97706';
      default: return '#64748b';
    }
  };

  // Filter documents
  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;
    if (selectedType !== 'All' && doc.type !== selectedType) return false;
    if (selectedYear !== 'All' && doc.year !== selectedYear) return false;
    return true;
  });

  const handleDownload = (e, doc) => {
    e.stopPropagation();
    showToast(`Downloading "${doc.title}.pdf"...`);
  };

  const handleShare = (e, doc) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Repository link copied for "${doc.title}"!`);
    setActiveMenuId(null);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Documents</h2>
        <p className="page-subtitle">Browse and manage all repository documents</p>
      </div>

      {/* Filters and Upload Action */}
      <div className="filters-bar">
        <div className="filter-selects">
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Policies">Policies</option>
            <option value="Reports">Reports</option>
            <option value="Manuals">Manuals</option>
            <option value="Forms">Forms</option>
            <option value="Plans">Plans</option>
            <option value="Others">Others</option>
          </select>

          <select 
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Document Types</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
          </select>

          <select 
            className="filter-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {!isRegistrar && (
          <button 
            className="btn-primary"
            onClick={() => onNavigate('upload')}
          >
            <Plus size={18} />
            Upload Document
          </button>
        )}
      </div>

      {/* Documents Table */}
      <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date Uploaded</th>
                <th>Size</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div 
                      className="doc-title-cell" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => onSelectDocument(doc)}
                    >
                      <span 
                        className="pdf-badge"
                        style={{ 
                          backgroundColor: `${getDocIconColor(doc.category)}15`, 
                          color: getDocIconColor(doc.category) 
                        }}
                      >
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
                  <td style={{ color: '#64748b' }}>{doc.type}</td>
                  <td style={{ color: '#64748b' }}>{doc.dateUploaded}</td>
                  <td style={{ color: '#64748b' }}>{doc.size}</td>
                  <td>
                    <div className="table-actions" style={{ justifyContent: 'center', position: 'relative' }}>
                      <button 
                        className="action-icon-btn" 
                        title="View Document"
                        onClick={() => onSelectDocument(doc)}
                      >
                        <Eye size={17} />
                      </button>
                      <button 
                        className="action-icon-btn" 
                        title="Download PDF"
                        onClick={(e) => handleDownload(e, doc)}
                      >
                        <Download size={17} />
                      </button>
                      <div style={{ position: 'relative' }}>
                        <button 
                          className="action-icon-btn" 
                          title="More options"
                          onClick={() => setActiveMenuId(activeMenuId === doc.id ? null : doc.id)}
                        >
                          <MoreVertical size={17} />
                        </button>
                        {activeMenuId === doc.id && (
                          <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '30px',
                            background: '#ffffff',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                            padding: '4px',
                            zIndex: 20,
                            minWidth: '130px'
                          }}>
                            <button
                              onClick={(e) => handleShare(e, doc)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 10px',
                                border: 'none',
                                background: 'transparent',
                                fontSize: '0.8rem',
                                color: '#1e293b',
                                cursor: 'pointer',
                                borderRadius: '4px'
                              }}
                            >
                              <Share2 size={14} /> Share Link
                            </button>
                            <button
                              onClick={() => {
                                onDeleteDocument(doc.id);
                                setActiveMenuId(null);
                                showToast(`Deleted "${doc.title}"`);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 10px',
                                border: 'none',
                                background: 'transparent',
                                fontSize: '0.8rem',
                                color: '#ef4444',
                                cursor: 'pointer',
                                borderRadius: '4px'
                              }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="pagination-container" style={{ padding: '16px 20px' }}>
          <div>
            Showing 1 to {filteredDocs.length} of 2,504 entries
          </div>

          <div className="pagination-controls">
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button 
              className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button 
              className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <button 
              className={`page-btn ${currentPage === 4 ? 'active' : ''}`}
              onClick={() => setCurrentPage(4)}
            >
              4
            </button>
            <button 
              className={`page-btn ${currentPage === 5 ? 'active' : ''}`}
              onClick={() => setCurrentPage(5)}
            >
              5
            </button>
            <span className="page-ellipsis">...</span>
            <button 
              className={`page-btn ${currentPage === 501 ? 'active' : ''}`}
              onClick={() => setCurrentPage(501)}
            >
              501
            </button>
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(Math.min(501, currentPage + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
