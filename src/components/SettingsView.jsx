import React, { useState } from 'react';
import { Save, Shield, HardDrive, BellRing, Database } from 'lucide-react';

export default function SettingsView({ showToast }) {
  const [repoName, setRepoName] = useState('CHMSU Digital Repository');
  const [campus, setCampus] = useState('Talisay Campus');
  const [autoBackup, setAutoBackup] = useState(true);
  const [allowGuestBrowse, setAllowGuestBrowse] = useState(true);
  const [quotaLimit, setQuotaLimit] = useState('50 GB');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Repository configuration settings updated successfully!');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Repository Settings</h2>
        <p className="page-subtitle">Configure system parameters, storage quotas, and security preferences</p>
      </div>

      <div className="card" style={{ maxWidth: '780px' }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Repository Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={repoName} 
              onChange={(e) => setRepoName(e.target.value)} 
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Primary Campus Location</label>
              <input 
                type="text" 
                className="form-input" 
                value={campus} 
                onChange={(e) => setCampus(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Storage Allocated</label>
              <select 
                className="form-select"
                value={quotaLimit}
                onChange={(e) => setQuotaLimit(e.target.value)}
              >
                <option value="20 GB">20 GB Cloud Archive</option>
                <option value="50 GB">50 GB Campus Server (Current)</option>
                <option value="100 GB">100 GB Enterprise Quota</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
              Automation & Security
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={autoBackup} 
                  onChange={(e) => setAutoBackup(e.target.checked)} 
                  style={{ accentColor: '#0f382c', width: '16px', height: '16px' }}
                />
                <span>Enable automated weekly incremental repository snapshots</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={allowGuestBrowse} 
                  onChange={(e) => setAllowGuestBrowse(e.target.checked)} 
                  style={{ accentColor: '#0f382c', width: '16px', height: '16px' }}
                />
                <span>Allow public search access for approved open-access research publications</span>
              </label>
            </div>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
