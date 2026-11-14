import React from 'react';
import { X, FileCode2, Download, Share2, Calendar, User, Tag, HardDrive, Building2 } from 'lucide-react';

export default function DocumentModal({ doc, onClose, showToast }) {
  if (!doc) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="pdf-badge" style={{ padding: '6px' }}>
              <FileCode2 size={20} />
            </span>
            <div>
              <h3 className="modal-title">{doc.title}</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Document ID: #{doc.id} • {doc.type} Format
              </span>
            </div>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Metadata badges row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px' }}>
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

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '6px', fontWeight: 700 }}>
              Description & Scope
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
              {doc.description}
            </p>
          </div>

          {/* Document Preview Box */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', background: '#fafafa', textAlign: 'center' }}>
            <img 
              src="./chmsu_logo.png" 
              alt="Seal" 
              style={{ width: '48px', height: '48px', margin: '0 auto 12px' }} 
            />
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f382c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Carlos Hilado Memorial State University
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0e8345', fontWeight: 600, marginTop: '2px' }}>
              {doc.department || 'Official Repository Archive'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '14px' }}>
              Talisay Main Campus, Negros Occidental • Official Repository Record
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
              {doc.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '6px', fontWeight: 600 }}>
              Verified Digital Record • Archival Copy
            </div>
          </div>
        </div>

        <div className="modal-footer">
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
