import React, { useState } from 'react';
import { 
  FileCode2, 
  Eye, 
  Download, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Share2,
  Building2,
  RotateCcw,
  FileSpreadsheet,
  Printer,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { chmsuTalisayDepartments } from '../data/mockData';

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
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isTransmittalOpen, setIsTransmittalOpen] = useState(false);

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
    if (selectedDepartment !== 'All' && doc.department !== selectedDepartment) return false;
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

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedDepartment('All');
    setSelectedType('All');
    setSelectedYear('All');
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Category", "Department", "Type", "Date Uploaded", "Size", "Author", "Retention"];
    const rows = filteredDocs.map(d => [
      d.id,
      `"${d.title.replace(/"/g, '""')}"`,
      d.category,
      `"${(d.department || 'Records Office').replace(/"/g, '""')}"`,
      d.type,
      d.dateUploaded,
      d.size,
      `"${(d.uploadedBy || 'Archivist').replace(/"/g, '""')}"`,
      d.category === 'Policies' ? 'Permanent Archival' : d.category === 'Plans' ? '10-Year Fiscal' : '5-Year Administrative'
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chmsu_records_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredDocs.length} records to CSV!`);
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedDepartment !== 'All' || 
    selectedType !== 'All' || 
    selectedYear !== 'All';

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Documents</h2>
        <p className="page-subtitle">Browse, filter, and retrieve official CHMSU Talisay records</p>
      </div>

      {/* Filters & Export Action Bar */}
      <div className="filters-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div className="filter-selects">
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            <option value="Policies">Policies</option>
            <option value="Reports">Reports</option>
            <option value="Manuals">Manuals</option>
            <option value="Forms">Forms</option>
            <option value="Plans">Plans</option>
            <option value="Others">Others</option>
          </select>

          {/* Department / Office Filter */}
          <select 
            className="filter-select"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            style={{ minWidth: '220px' }}
          >
            <option value="All">All Departments / Offices</option>
            <optgroup label="Academic Colleges (Talisay)">
              {chmsuTalisayDepartments
                .filter(d => d.type === 'Academic')
                .map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
            </optgroup>
            <optgroup label="Administrative Offices">
              {chmsuTalisayDepartments
                .filter(d => d.type === 'Administrative')
                .map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
            </optgroup>
          </select>

          <select 
            className="filter-select"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Document Types</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
          </select>

          <select 
            className="filter-select"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#475569',
                cursor: 'pointer',
                fontWeight: 600
              }}
              title="Reset all filters"
            >
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>

        {/* Archival Export & Transmittal Sheet Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn-outline"
            onClick={() => setIsTransmittalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', height: '38px', fontSize: '0.82rem', padding: '0 14px' }}
            title="Generate Official CHMSU Transmittal Sheet"
          >
            <FileSpreadsheet size={15} color="#0e8345" />
            <span>Transmittal Sheet</span>
          </button>
          <button
            className="btn-outline"
            onClick={handleExportCSV}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', height: '38px', fontSize: '0.82rem', padding: '0 12px' }}
            title="Export filtered records to CSV"
          >
            <Download size={15} color="#0284c7" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Originating Department</th>
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
                  <td>
                    <span 
                      className="dept-pill"
                      title={`Filter by ${doc.department || 'Records Office'}`}
                      onClick={() => setSelectedDepartment(doc.department || 'All')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        padding: '4px 9px',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        color: '#1e293b',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: '1px solid #e2e8f0',
                        maxWidth: '220px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      <Building2 size={13} color="#0e8345" style={{ flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.department || 'Records Office'}
                      </span>
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
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Showing {filteredDocs.length} {filteredDocs.length === 1 ? 'record' : 'records'} 
            {selectedDepartment !== 'All' && (
              <span style={{ marginLeft: '6px', color: '#0e8345', fontWeight: 600 }}>
                • {selectedDepartment}
              </span>
            )}
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

      {/* Modal: Official CHMSU Transmittal Sheet */}
      {isTransmittalOpen && (
        <div className="modal-backdrop" onClick={() => setIsTransmittalOpen(false)}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '820px', width: '95%', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header" style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="pdf-badge" style={{ background: '#ecfdf5', color: '#0e8345', padding: '6px' }}>
                  <FileSpreadsheet size={20} />
                </span>
                <div>
                  <h3 className="modal-title">Official Records Transmittal Sheet</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Republic Act 9470 (National Archives of the Philippines) Compliance
                  </span>
                </div>
              </div>
              <button 
                className="action-icon-btn" 
                onClick={() => setIsTransmittalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '24px' }}>
              {/* Official CHMSU Letterhead */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f382c', paddingBottom: '16px', marginBottom: '20px' }}>
                <img 
                  src="./chmsu_logo.png" 
                  alt="Seal" 
                  style={{ width: '56px', height: '56px', margin: '0 auto 8px' }} 
                />
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Republic of the Philippines
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f382c', letterSpacing: '0.5px' }}>
                  CARLOS HILADO MEMORIAL STATE UNIVERSITY
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Talisay Main Campus • Talisay City, Negros Occidental 6115
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0e8345', marginTop: '6px' }}>
                  RECORDS MANAGEMENT OFFICE • CENTRAL REPOSITORY
                </div>
                <div style={{ 
                  marginTop: '10px', 
                  display: 'inline-block',
                  background: '#f1f5f9', 
                  color: '#0f172a', 
                  padding: '4px 16px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.5px' 
                }}>
                  OFFICIAL ARCHIVAL RECORDS TRANSMITTAL & INVENTORY
                </div>
              </div>

              {/* Transmittal Metadata */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '12px', 
                background: '#f8fafc', 
                padding: '14px 18px', 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                fontSize: '0.82rem',
                marginBottom: '20px'
              }}>
                <div><strong>Transmittal Ref:</strong> CHMSU-RMO-TR-2026-088</div>
                <div><strong>Custodian Office:</strong> Records Management Office</div>
                <div><strong>Scope / College:</strong> {selectedDepartment !== 'All' ? selectedDepartment : 'Consolidated Repository'}</div>
                <div><strong>Date Generated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div><strong>Total Holdings:</strong> {filteredDocs.length} Archival Records</div>
                <div><strong>Classification:</strong> Quality Records (ISO 9001:2015)</div>
              </div>

              {/* Inventory Table */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#334155', borderBottom: '1px solid #cbd5e1' }}>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Item #</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Record Title</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Originating Office / College</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Category</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Date Archived</th>
                      <th style={{ padding: '8px 12px', textAlign: 'left' }}>Retention Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc, idx) => {
                      const retention = doc.category === 'Policies' ? 'Permanent' : doc.category === 'Plans' ? '10-Yr Fiscal' : '5-Yr Admin';
                      return (
                        <tr key={doc.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '8px 12px', color: '#64748b' }}>{String(idx + 1).padStart(2, '0')}</td>
                          <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{doc.title}</td>
                          <td style={{ padding: '8px 12px', color: '#475569' }}>{doc.department || 'Records Office'}</td>
                          <td style={{ padding: '8px 12px' }}>
                            <span className={`badge ${getBadgeClass(doc.category)}`} style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                              {doc.category}
                            </span>
                          </td>
                          <td style={{ padding: '8px 12px', color: '#64748b' }}>{doc.dateUploaded}</td>
                          <td style={{ padding: '8px 12px' }}>
                            <span style={{ 
                              fontSize: '0.72rem', 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              background: retention === 'Permanent' ? '#ecfdf5' : '#f1f5f9',
                              color: retention === 'Permanent' ? '#065f46' : '#475569',
                              fontWeight: 600
                            }}>
                              {retention}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Official Certification Statement */}
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic', background: '#fafafa', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid #0e8345' }}>
                "I hereby certify under official oath that the institutional records enumerated above have been verified, inventoried, and secured in the Carlos Hilado Memorial State University digital repository in accordance with Republic Act No. 9470 and university records retention guidelines."
              </div>

              {/* Signature Block */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px', paddingTop: '10px' }}>
                <div>
                  <div style={{ borderBottom: '1px solid #94a3b8', height: '36px' }}></div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                    University Records Management Officer
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Archivist & Repository Custodian
                  </div>
                </div>
                <div>
                  <div style={{ borderBottom: '1px solid #94a3b8', height: '36px' }}></div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                    Receiving Dean / Department Head
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Originating College / Unit Verification
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                className="btn-outline"
                onClick={() => setIsTransmittalOpen(false)}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn-outline"
                onClick={handleExportCSV}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={15} /> Export CSV
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  window.print();
                  showToast('Sent to university document printer.');
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} /> Print Transmittal Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
