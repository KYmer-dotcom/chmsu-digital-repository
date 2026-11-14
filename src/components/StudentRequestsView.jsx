import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Download, 
  Printer, 
  X, 
  Filter, 
  Check, 
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  FileCheck,
  Building2
} from 'lucide-react';

export default function StudentRequestsView({ 
  requests, 
  documents = [],
  onUpdateRequestStatus, 
  onAddRequest, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestForSlip, setSelectedRequestForSlip] = useState(null);
  const [verifyingRequest, setVerifyingRequest] = useState(null);

  // New Request Form State
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newProgram, setNewProgram] = useState('BS Information Technology');
  const [newYearLevel, setNewYearLevel] = useState('4th Year');
  const [newDocumentType, setNewDocumentType] = useState('Official Transcript of Records (TOR)');
  const [newPurpose, setNewPurpose] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newPriority, setNewPriority] = useState('Standard');

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const matchesTab = 
      activeTab === 'all' ? true :
      req.status.toLowerCase().replace(/\s+/g, '-') === activeTab;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      req.studentId.toLowerCase().includes(query) ||
      req.studentName.toLowerCase().includes(query) ||
      req.documentType.toLowerCase().includes(query) ||
      req.program.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'Pending').length,
    processing: requests.filter((r) => r.status === 'Processing').length,
    'ready-for-release': requests.filter((r) => r.status === 'Ready for Release').length,
    released: requests.filter((r) => r.status === 'Released').length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="req-badge badge-pending"><Clock size={12} /> Pending</span>;
      case 'Processing':
        return <span className="req-badge badge-processing"><Clock size={12} /> In Review</span>;
      case 'Ready for Release':
        return <span className="req-badge badge-ready"><Check size={12} /> Ready for Release</span>;
      case 'Released':
        return <span className="req-badge badge-released"><CheckCircle2 size={12} /> Released</span>;
      default:
        return <span className="req-badge">{status}</span>;
    }
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newStudentId || !newStudentName || !newPurpose) {
      showToast('Please fill in all required fields.');
      return;
    }

    const newReq = {
      id: `REQ-2026-${String(requests.length + 1).padStart(3, '0')}`,
      studentId: newStudentId,
      studentName: newStudentName,
      program: newProgram,
      yearLevel: newYearLevel,
      documentType: newDocumentType,
      purpose: newPurpose,
      dateFiled: 'Today (Nov 14, 2026)',
      status: 'Pending',
      priority: newPriority,
      contact: newContact || 'N/A'
    };

    onAddRequest(newReq);
    setIsModalOpen(false);
    showToast(`Request filed successfully for ${newStudentName}!`);

    // Reset Form
    setNewStudentId('');
    setNewStudentName('');
    setNewPurpose('');
    setNewContact('');
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">Student Document Requests</h2>
          <p className="page-subtitle">
            Office of the University Registrar • Verify, process, and release academic credentials
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
        >
          <PlusCircle size={18} />
          <span>Log New Student Request</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="requests-filter-bar">
        <div className="requests-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Requests <span className="tab-count">{counts.all}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending <span className="tab-count">{counts.pending}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
            onClick={() => setActiveTab('processing')}
          >
            In Processing <span className="tab-count">{counts.processing}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ready-for-release' ? 'active' : ''}`}
            onClick={() => setActiveTab('ready-for-release')}
          >
            Ready for Release <span className="tab-count">{counts['ready-for-release']}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'released' ? 'active' : ''}`}
            onClick={() => setActiveTab('released')}
          >
            Released <span className="tab-count">{counts.released}</span>
          </button>
        </div>

        <div className="requests-search">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by student ID, name, or document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Student Information</th>
                <th>Document Requested</th>
                <th>Purpose</th>
                <th>Date Filed</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No student document requests found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <span className="req-id-code">{req.id}</span>
                      {req.priority === 'Urgent' && (
                        <span className="priority-pill">Urgent</span>
                      )}
                    </td>
                    <td>
                      <div className="student-info-cell">
                        <span className="student-name">{req.studentName}</span>
                        <span className="student-id-sub">ID: {req.studentId} • {req.program}</span>
                      </div>
                    </td>
                    <td>
                      <div className="doc-type-cell">
                        <FileText size={16} color="#0e8345" />
                        <span>{req.documentType}</span>
                      </div>
                    </td>
                    <td style={{ maxWidth: '200px', fontSize: '0.84rem', color: '#475569' }}>
                      {req.purpose}
                    </td>
                    <td style={{ fontSize: '0.84rem', color: '#64748b' }}>
                      {req.dateFiled}
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {getStatusBadge(req.status)}
                        {req.verified && (
                          <span style={{ fontSize: '0.72rem', color: '#047857', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                            <ShieldCheck size={12} color="#10b981" /> Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-button-group">
                        {/* Cross-Office Verification Button */}
                        <button 
                          className="btn-status-action"
                          style={{
                            background: req.verified ? '#f0fdf4' : '#f8fafc',
                            color: req.verified ? '#15803d' : '#0e8345',
                            border: req.verified ? '1px solid #86efac' : '1px solid #cbd5e1',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 600
                          }}
                          onClick={() => setVerifyingRequest(req)}
                          title="Verify student records against repository archives"
                        >
                          <ShieldCheck size={14} color={req.verified ? '#16a34a' : '#0e8345'} />
                          <span>{req.verified ? 'Verified' : 'Verify'}</span>
                        </button>

                        {req.status === 'Pending' && (
                          <button 
                            className="btn-status-action btn-process"
                            onClick={() => {
                              onUpdateRequestStatus(req.id, 'Processing');
                              showToast(`Request ${req.id} moved to Processing.`);
                            }}
                            title="Mark as In Review / Processing"
                          >
                            Process
                          </button>
                        )}
                        {req.status === 'Processing' && (
                          <button 
                            className="btn-status-action btn-ready"
                            onClick={() => {
                              onUpdateRequestStatus(req.id, 'Ready for Release');
                              showToast(`Request ${req.id} marked as Ready for Release.`);
                            }}
                            title="Mark as Ready for Release"
                          >
                            Ready
                          </button>
                        )}
                        {req.status === 'Ready for Release' && (
                          <button 
                            className="btn-status-action btn-release"
                            onClick={() => {
                              onUpdateRequestStatus(req.id, 'Released');
                              showToast(`Document ${req.id} released to student.`);
                            }}
                            title="Confirm Document Handed Over to Student"
                          >
                            Release
                          </button>
                        )}
                        <button 
                          className="btn-status-action btn-slip"
                          onClick={() => setSelectedRequestForSlip(req)}
                          title="View Official Release Slip"
                        >
                          <Printer size={14} /> Slip
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Log New Student Request */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Log Student Document Request</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Student ID Number *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 2023-0142" 
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Lastname, Firstname M." 
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Degree Program / College *</label>
                  <select 
                    className="form-select"
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                  >
                    <option value="BS Information Technology">BS Information Technology</option>
                    <option value="BS Civil Engineering">BS Civil Engineering</option>
                    <option value="BSED Major in English">BSED Major in English</option>
                    <option value="BS Hospitality Management">BS Hospitality Management</option>
                    <option value="BS Criminology">BS Criminology</option>
                    <option value="BS Industrial Technology">BS Industrial Technology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Year Level / Standing</label>
                  <select 
                    className="form-select"
                    value={newYearLevel}
                    onChange={(e) => setNewYearLevel(e.target.value)}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduated">Graduated / Alumnus</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">Document Requested *</label>
                <select 
                  className="form-select"
                  value={newDocumentType}
                  onChange={(e) => setNewDocumentType(e.target.value)}
                >
                  <option value="Official Transcript of Records (TOR)">Official Transcript of Records (TOR)</option>
                  <option value="Certificate of Good Moral Character">Certificate of Good Moral Character</option>
                  <option value="Certification of Grades">Certification of Grades</option>
                  <option value="Certificate of Enrollment">Certificate of Enrollment</option>
                  <option value="Honorable Dismissal & Transfer Credential">Honorable Dismissal & Transfer Credential</option>
                  <option value="Diploma / CAV Authentication">Diploma / CAV Authentication</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">Purpose of Request *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Employment, Board Exam, Scholarship, Transfer" 
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Contact Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 0917-123-4567" 
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select 
                    className="form-select"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="Standard">Standard (3-5 Working Days)</option>
                    <option value="Urgent">Urgent / Express (1-2 Working Days)</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit & Log Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Official Release Slip */}
      {selectedRequestForSlip && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '520px', background: '#ffffff' }}>
            <div className="modal-header">
              <h3 className="modal-title">CHMSU Document Release Slip</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedRequestForSlip(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="slip-container" style={{ padding: '24px', border: '1px dashed #cbd5e1', borderRadius: '10px', margin: '16px 24px', background: '#f8fafc' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <img src="./chmsu_logo.png" alt="Seal" style={{ width: '48px', height: '48px', marginBottom: '6px' }} />
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a' }}>Carlos Hilado Memorial State University</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Office of the University Registrar • Talisay Campus</p>
                <div style={{ marginTop: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#0e8345' }}>
                  DOCUMENT CLAIM & RELEASE ACKNOWLEDGMENT
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                <div><strong>Claim No:</strong> {selectedRequestForSlip.id}</div>
                <div><strong>Date Filed:</strong> {selectedRequestForSlip.dateFiled}</div>
                <div><strong>Student ID:</strong> {selectedRequestForSlip.studentId}</div>
                <div><strong>Status:</strong> {selectedRequestForSlip.status}</div>
              </div>

              <div style={{ fontSize: '0.82rem', padding: '12px 0' }}>
                <div style={{ marginBottom: '6px' }}><strong>Student Name:</strong> {selectedRequestForSlip.studentName}</div>
                <div style={{ marginBottom: '6px' }}><strong>Program:</strong> {selectedRequestForSlip.program} ({selectedRequestForSlip.yearLevel})</div>
                <div style={{ marginBottom: '6px' }}><strong>Document:</strong> {selectedRequestForSlip.documentType}</div>
                <div><strong>Purpose:</strong> {selectedRequestForSlip.purpose}</div>
              </div>

              {/* Verification Clearance Badge */}
              {selectedRequestForSlip.verified ? (
                <div style={{
                  margin: '12px 0',
                  padding: '10px 14px',
                  background: '#ecfdf5',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <ShieldCheck size={26} color="#059669" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#065f46', textTransform: 'uppercase' }}>
                      Official Archival Verification Clearance
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#047857' }}>
                      Verified against CHMSU Digital Repository • Eligible for Official Release
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                      Cleared on: {selectedRequestForSlip.verifiedAt || 'Nov 14, 2026'} • Registrar Officer
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  margin: '12px 0',
                  padding: '8px 12px',
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#92400e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <AlertCircle size={14} color="#d97706" />
                  <span>Pending archival clearance check by Registrar.</span>
                </div>
              )}

              {/* Barcode representation */}
              <div style={{ textAlign: 'center', margin: '14px 0 6px', padding: '8px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <div style={{ fontFamily: 'monospace', letterSpacing: '5px', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  ||| | ||||| || |||| |||| | |||
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', letterSpacing: '1px' }}>
                  * {selectedRequestForSlip.id} *
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                <div>
                  <div style={{ borderBottom: '1px solid #94a3b8', width: '140px', height: '24px' }}></div>
                  <div style={{ marginTop: '4px' }}>Student Signature</div>
                </div>
                <div>
                  <div style={{ borderBottom: '1px solid #94a3b8', width: '140px', height: '24px' }}></div>
                  <div style={{ marginTop: '4px' }}>Registrar Officer</div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                className="btn-outline"
                onClick={() => setSelectedRequestForSlip(null)}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  window.print();
                  showToast('Sent to university receipt printer.');
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} /> Print Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cross-Office Archival Verification */}
      {verifyingRequest && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '640px', background: '#ffffff' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="pdf-badge" style={{ background: '#ecfdf5', color: '#10b981' }}>
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <h3 className="modal-title">Repository Archival Verification</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Cross-Office Validation • Records Office ⇄ Registrar Pipeline
                  </span>
                </div>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setVerifyingRequest(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Student Target Summary */}
              <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.84rem' }}>
                  <div><strong>Student Name:</strong> {verifyingRequest.studentName}</div>
                  <div><strong>Student ID:</strong> {verifyingRequest.studentId}</div>
                  <div><strong>Degree Program:</strong> {verifyingRequest.program}</div>
                  <div><strong>Requested File:</strong> {verifyingRequest.documentType}</div>
                </div>
              </div>

              {/* Matched Archival Documents */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={15} color="#0e8345" /> Matched Institutional Records in Repository Archive
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {documents.filter((d) => {
                    const p = (verifyingRequest.program || '').toLowerCase();
                    const dept = (d.department || '').toLowerCase();
                    const title = (d.title || '').toLowerCase();
                    if (p.includes('engineering') && (dept.includes('engineering') || title.includes('engineering'))) return true;
                    if (p.includes('industrial') && (dept.includes('industrial') || title.includes('trades'))) return true;
                    if ((p.includes('english') || p.includes('education')) && (dept.includes('education') || title.includes('teacher'))) return true;
                    if ((p.includes('hospitality') || p.includes('accountancy')) && (dept.includes('business') || dept.includes('cbma'))) return true;
                    if (dept.includes('registrar') || title.includes('transcript') || title.includes('handbook')) return true;
                    return false;
                  }).slice(0, 3).map((doc) => (
                    <div 
                      key={doc.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileCheck size={18} color="#10b981" />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1e293b' }}>{doc.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.department} • {doc.category} ({doc.year})</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#047857', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        Archived Record
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Checklist */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '14px 16px' }}>
                <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>
                  Registrar Verification Criteria
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#14532d', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckSquare size={16} color="#15803d" />
                    <span>Degree program & curriculum checklist confirmed in CHMSU archive</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckSquare size={16} color="#15803d" />
                    <span>Grading standards & retention schedule compliant (NAP Standard)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckSquare size={16} color="#15803d" />
                    <span>No outstanding university liabilities or clearance flags</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                className="btn-outline"
                onClick={() => setVerifyingRequest(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  onUpdateRequestStatus(verifyingRequest.id, 'Ready for Release', {
                    verified: true,
                    verifiedAt: 'Nov 14, 2026',
                    verifiedBy: 'Office of the University Registrar'
                  });
                  showToast(`Archival record verified! Request ${verifyingRequest.id} marked Ready for Release.`);
                  setVerifyingRequest(null);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ShieldCheck size={16} /> Confirm Verification & Mark Ready
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
