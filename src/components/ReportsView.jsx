import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';

export default function ReportsView({ showToast }) {
  const monthlyData = [
    { month: 'Jan', uploads: 120, downloads: 450 },
    { month: 'Feb', uploads: 180, downloads: 620 },
    { month: 'Mar', uploads: 240, downloads: 890 },
    { month: 'Apr', uploads: 210, downloads: 780 },
    { month: 'May', uploads: 310, downloads: 1100 },
    { month: 'Jun', uploads: 280, downloads: 950 },
    { month: 'Jul', uploads: 350, downloads: 1300 },
    { month: 'Aug', uploads: 420, downloads: 1540 },
  ];

  const maxVal = 1600;

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="page-title">Analytics & Reports</h2>
          <p className="page-subtitle">Repository utilization, download trends, and publication metrics</p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => showToast('Exporting repository analytics CSV...')}
        >
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Metrics overview */}
      <div className="stat-cards-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">+28.4%</div>
            <div className="stat-label">Upload Growth YoY</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Download size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">18,490</div>
            <div className="stat-label">Total Downloads</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper yellow">
            <BarChart3 size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">94.2%</div>
            <div className="stat-label">System Uptime</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">2026</div>
            <div className="stat-label">Fiscal Year Active</div>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Monthly Document Uploads & Downloads Activity</h3>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '220px', padding: '20px 10px 10px', borderBottom: '1px solid #e2e8f0' }}>
          {monthlyData.map((d) => {
            const upHeight = (d.uploads / maxVal) * 180;
            const downHeight = (d.downloads / maxVal) * 180;
            return (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center' }}>
                  <div 
                    title={`Uploads: ${d.uploads}`}
                    style={{ 
                      width: '16px', 
                      height: `${upHeight}px`, 
                      background: '#10b981', 
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease'
                    }} 
                  />
                  <div 
                    title={`Downloads: ${d.downloads}`}
                    style={{ 
                      width: '16px', 
                      height: `${downHeight}px`, 
                      background: '#0284c7', 
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease'
                    }} 
                  />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>{d.month}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '0.82rem', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}></span>
            <span>New Documents Uploaded</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', background: '#0284c7', borderRadius: '2px' }}></span>
            <span>Document Downloads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
