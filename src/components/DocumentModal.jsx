import React, { useState } from 'react';
import { 
  X, 
  FileCode2, 
  Download, 
  Share2, 
  Calendar, 
  User, 
  Tag, 
  HardDrive, 
  Building2, 
  Printer, 
  ShieldCheck, 
  FileText,
  Eye
} from 'lucide-react';

export default function DocumentModal({ doc, onClose, showToast }) {
  const [activeTab, setActiveTab] = useState('metadata'); // 'metadata' | 'document'

  if (!doc) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '720px', width: '95%', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="pdf-badge" style={{ padding: '6px' }}>
              <FileCode2 size={20} />
            </span>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1rem', lineHeight: 1.3 }}>{doc.title}</h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Document #{doc.id} • {doc.department || 'CHMSU Records Archive'}
              </span>
            </div>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '0 20px' }}>
          <button
            onClick={() => setActiveTab('metadata')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: activeTab === 'metadata' ? '#0e8345' : '#64748b',
              borderBottom: activeTab === 'metadata' ? '2px solid #0e8345' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Tag size={15} /> Archival Metadata
          </button>
          <button
            onClick={() => setActiveTab('document')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: activeTab === 'document' ? '#0e8345' : '#64748b',
              borderBottom: activeTab === 'document' ? '2px solid #0e8345' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Eye size={15} /> Official Document View
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'metadata' && (
            <div>
              {/* Metadata badges row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569' }}>
                  <Tag size={15} color="#0f382c" />
                  <strong>Category:</strong> {doc.category}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569' }}>
                  <Building2 size={15} color="#0e8345" />
                  <strong>Department:</strong> {doc.department || 'Records Management Office'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569' }}>
                  <Calendar size={15} color="#0f382c" />
                  <strong>Uploaded:</strong> {doc.dateUploaded}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569' }}>
                  <User size={15} color="#0f382c" />
                  <strong>Author:</strong> {doc.uploadedBy}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#475569' }}>
                  <HardDrive size={15} color="#0f382c" />
                  <strong>Size:</strong> {doc.size}
                </div>
              </div>

              {/* Description & Scope */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '6px', fontWeight: 700 }}>
                  Description & Scope
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  {doc.description}
                </p>
              </div>

              {/* Archival Seal Card */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', background: '#fafafa', textAlign: 'center' }}>
                <img 
                  src="./chmsu_logo.png" 
                  alt="Seal" 
                  style={{ width: '48px', height: '48px', margin: '0 auto 8px' }} 
                />
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f382c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Carlos Hilado Memorial State University
                </div>
                <div style={{ fontSize: '0.8rem', color: '#0e8345', fontWeight: 600, marginTop: '2px' }}>
                  {doc.department || 'Official Repository Archive'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '10px' }}>
                  Talisay Main Campus, Negros Occidental • Official Repository Record
                </div>
                <div style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={16} /> Verified Digital Archival Holding • Disposition Audited
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Simulated Official Document Sheet with Watermark */}
          {activeTab === 'document' && (
            <div style={{
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '36px 32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              {/* Semi-transparent Watermark */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-35deg)',
                fontSize: '1.8rem',
                fontWeight: 900,
                color: 'rgba(15, 56, 44, 0.06)',
                letterSpacing: '4px',
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase'
              }}>
                OFFICIAL REPOSITORY COPY — CHMSU TALISAY
              </div>

              {/* Document Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f382c', paddingBottom: '14px', marginBottom: '22px' }}>
                <img 
                  src="./chmsu_logo.png" 
                  alt="Seal" 
                  style={{ width: '48px', height: '48px', margin: '0 auto 6px' }} 
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Republic of the Philippines
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f382c' }}>
                  CARLOS HILADO MEMORIAL STATE UNIVERSITY
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                  Talisay Main Campus • Talisay City, Negros Occidental
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0e8345', marginTop: '4px' }}>
                  {doc.department || 'OFFICE OF THE UNIVERSITY RECORDS'}
                </div>
              </div>

              {/* Document Sub-reference */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <span><strong>REF NO:</strong> CHMSU-RMO-{doc.year || '2026'}-{String(doc.id).padStart(4, '0')}</span>
                <span><strong>DATE APPROVED:</strong> {doc.dateUploaded}</span>
                <span><strong>CLASS:</strong> {doc.category}</span>
              </div>

              {/* Document Title */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {doc.title}
                </h2>
              </div>

              {/* Document Body Sections */}
              <div style={{ fontSize: '0.84rem', color: '#334155', lineHeight: '1.7', textAlign: 'justify', marginBottom: '24px' }}>
                <p style={{ marginBottom: '14px' }}>
                  <strong>SECTION 1. PURPOSE & GENERAL PRINCIPLES.</strong> {doc.description} This issuance is promulgated to establish standard operating mechanisms, institutional efficiency, and documented accountability across the university academic community.
                </p>
                <p style={{ marginBottom: '14px' }}>
                  <strong>SECTION 2. SCOPE & INSTITUTIONAL APPLICABILITY.</strong> The stipulations and requirements set forth herein shall apply to all collegiate departments under the Carlos Hilado Memorial State University Talisay Campus, subject to regular quality assurance and accreditation compliance reviews.
                </p>
                <p>
                  <strong>SECTION 3. ARCHIVAL AUTHENTICITY.</strong> This document constitutes a validated, tamper-evident digital copy preserved within the institutional repository and maintained under the custody of the University Records Management Office.
                </p>
              </div>

              {/* Verified Digital Seal Footer */}
              <div style={{
                border: '1px solid #10b981',
                background: '#f0fdf4',
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={28} color="#059669" />
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065f46' }}>
                      AUTHENTICATED UNIVERSITY ARCHIVAL RECORD
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#047857' }}>
                      Certified Digital Master Copy • Carlos Hilado Memorial State University
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#64748b' }}>
                  <div><strong>Archivist:</strong> {doc.uploadedBy}</div>
                  <div><strong>Format:</strong> {doc.type} Verified</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            className="btn-outline"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast(`Repository link copied to clipboard!`);
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Share2 size={16} /> Share Link
          </button>
          <button 
            className="btn-outline"
            onClick={() => {
              window.print();
              showToast('Sent document to printer...');
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={16} /> Print Document
          </button>
          <button 
            className="btn-primary"
            onClick={() => showToast(`Downloading "${doc.title}.pdf"...`)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={16} /> Download File ({doc.size})
          </button>
        </div>
      </div>
    </div>
  );
}
