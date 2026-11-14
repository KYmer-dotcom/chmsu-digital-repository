import React, { useState, useRef } from 'react';
import { Database, Download, CheckCircle, RefreshCw, UploadCloud, AlertTriangle, RotateCcw } from 'lucide-react';
import { backupHistory as initialBackups } from '../data/mockData';

export default function BackupRecoveryView({ 
  documents, 
  categories, 
  onRestoreState, 
  onSimulateDataLoss, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('backup');
  const [backups, setBackups] = useState(initialBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [selectedRestoreFile, setSelectedRestoreFile] = useState(null);
  const [restorePayload, setRestorePayload] = useState(null);
  const fileInputRef = useRef(null);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(15);

    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);

          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupData = {
            version: '2.0',
            institution: 'Carlos Hilado Memorial State University',
            campus: 'Talisay Campus',
            createdAt: new Date().toLocaleString(),
            documents: documents,
            categories: categories
          };

          // Generate real JSON file download
          const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `chmsu-repository-backup-${timestamp}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          const newEntry = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: 'Full JSON Snapshot',
            size: `${(blob.size / 1024).toFixed(1)} KB`,
            status: 'Completed',
            payload: backupData
          };

          setBackups([newEntry, ...backups]);
          showToast('Real backup generated and downloaded to your computer!');
          return 0;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDownloadHistorical = (entry) => {
    const backupData = entry.payload || {
      version: '2.0',
      createdAt: entry.date,
      documents: documents,
      categories: categories
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chmsu-backup-${entry.date.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded backup snapshot (${entry.date})`);
  };

  const handleRestoreFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedRestoreFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.documents || !Array.isArray(parsed.documents)) {
          showToast('Invalid backup file: documents array missing.');
          setRestorePayload(null);
          return;
        }
        setRestorePayload(parsed);
        showToast(`Parsed valid backup: ${parsed.documents.length} documents found.`);
      } catch (err) {
        showToast('Error reading JSON backup file.');
        setRestorePayload(null);
      }
    };
    reader.readAsText(file);
  };

  const executeRestore = () => {
    if (!restorePayload) {
      showToast('Select a valid backup JSON file first.');
      return;
    }
    onRestoreState(restorePayload.documents, restorePayload.categories);
    showToast(`Restored ${restorePayload.documents.length} documents and ${restorePayload.categories?.length || 0} categories!`);
    setSelectedRestoreFile(null);
    setRestorePayload(null);
  };

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 className="page-title">Backup & Recovery</h2>
          <p className="page-subtitle">Manage system backups, export snapshots, and recover records after data loss</p>
        </div>

        {/* Disaster Incident Simulation Button */}
        <button 
          className="btn-outline" 
          onClick={onSimulateDataLoss}
          style={{ borderColor: '#ef4444', color: '#b91c1c', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          title="Wipe repository records to test incident recovery"
        >
          <AlertTriangle size={16} /> Simulate Data Loss Incident
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button 
          className={`tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
          onClick={() => setActiveTab('backup')}
        >
          Backup
        </button>
        <button 
          className={`tab-btn ${activeTab === 'restore' ? 'active' : ''}`}
          onClick={() => setActiveTab('restore')}
        >
          Restore
        </button>
      </div>

      {activeTab === 'backup' ? (
        <div>
          {/* Create Backup Box */}
          <div className="backup-section-header">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Create Backup</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                Generate a live JSON snapshot export of all repository documents and metadata
              </p>
            </div>
            
            <button 
              className="btn-primary"
              disabled={isBackingUp}
              onClick={handleCreateBackup}
            >
              {isBackingUp ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Generating ({backupProgress}%)...
                </>
              ) : (
                'Create Backup Now'
              )}
            </button>
          </div>

          {isBackingUp && (
            <div style={{ marginBottom: '24px', background: '#ecfdf5', padding: '16px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#065f46', marginBottom: '8px' }}>
                <span>Compiling {documents.length} document records into downloadable JSON snapshot...</span>
                <span>{backupProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#d1fae5', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${backupProgress}%`, height: '100%', background: '#10b981', transition: 'width 0.25s ease' }}></div>
              </div>
            </div>
          )}

          {/* Backup History Table */}
          <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Backup History</h3>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 500 }}>{item.date}</td>
                      <td style={{ color: '#475569' }}>{item.type}</td>
                      <td style={{ color: '#64748b' }}>{item.size}</td>
                      <td>
                        <span className="badge badge-completed">
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className="action-icon-btn" 
                          title="Download Snapshot File"
                          onClick={() => handleDownloadHistorical(item)}
                        >
                          <Download size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Restore Tab */
        <div className="card" style={{ maxWidth: '680px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Restore Database & Repository</h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '24px' }}>
            Upload a valid CHMSU repository backup file (.json) to restore records after a data loss incident.
          </p>

          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".json"
            onChange={handleRestoreFileSelected}
          />

          <div 
            className="dropzone-box" 
            style={{ marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="dropzone-icon">
              <UploadCloud size={40} />
            </div>
            {selectedRestoreFile ? (
              <div>
                <div style={{ fontWeight: 600, color: '#0f382c' }}>
                  {selectedRestoreFile.name}
                </div>
                <div className="dropzone-subtext">
                  {(selectedRestoreFile.size / 1024).toFixed(1)} KB - Click to choose another
                </div>
              </div>
            ) : (
              <div>
                <div className="dropzone-text">
                  Click to select backup file (.json)
                </div>
                <div className="dropzone-subtext">
                  Accepts CHMSU JSON snapshot files
                </div>
              </div>
            )}
          </div>

          {restorePayload && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem' }}>
              <div style={{ fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                Backup Validated:
              </div>
              <div style={{ color: '#15803d' }}>
                • Institution: {restorePayload.institution || 'CHMSU'}<br />
                • Created: {restorePayload.createdAt || 'N/A'}<br />
                • Records to recover: <strong>{restorePayload.documents?.length || 0} documents</strong>, <strong>{restorePayload.categories?.length || 0} categories</strong>
              </div>
            </div>
          )}

          <button 
            className="btn-primary" 
            disabled={!restorePayload}
            onClick={executeRestore}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: restorePayload ? 1 : 0.6 }}
          >
            <RotateCcw size={16} /> Recover All Records Now
          </button>
        </div>
      )}
    </div>
  );
}
