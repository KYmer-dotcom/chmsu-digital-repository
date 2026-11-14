import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, ChevronRight, FileCheck, Shield, LifeBuoy } from 'lucide-react';
import { userGuideTopics } from '../data/mockData';

export default function UserGuideView() {
  const [activeTopic, setActiveTopic] = useState('getting-started');
  const [searchGuide, setSearchGuide] = useState('');

  const filteredTopics = userGuideTopics.filter(t => 
    t.title.toLowerCase().includes(searchGuide.toLowerCase())
  );

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">User Guide</h2>
        <p className="page-subtitle">Learn how to use the CHMSU Digital Repository</p>
      </div>

      {/* Guide Layout */}
      <div className="guide-layout">
        {/* Left Sub-sidebar */}
        <div>
          <div className="search-box" style={{ marginBottom: '16px' }}>
            <Search size={15} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search help topics..."
              value={searchGuide}
              onChange={(e) => setSearchGuide(e.target.value)}
              style={{ height: '36px', fontSize: '0.82rem' }}
            />
          </div>

          <div className="guide-sidebar">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                className={`guide-nav-btn ${activeTopic === topic.id ? 'active' : ''}`}
                onClick={() => setActiveTopic(topic.id)}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="guide-card-content">
          {activeTopic === 'getting-started' && (
            <div>
              <div className="guide-hero">
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    Getting Started
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    Welcome to the CHMSU Digital Repository. This guide will help you navigate the system and make the most of its features.
                  </p>
                </div>
                <div className="guide-hero-art">
                  <HelpCircle size={64} />
                </div>
              </div>

              <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                  Topics in this section:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { num: 1, title: 'System Overview', desc: 'Understanding repository architecture, Talisay campus archiving objectives, and preservation guidelines.' },
                    { num: 2, title: 'Logging In', desc: 'Single Sign-On using your official university @chmsu.edu.ph Google account or local repository credentials.' },
                    { num: 3, title: 'User Roles and Permissions', desc: 'Explaining access levels: Administrator, Faculty Contributor, Department Reviewer, and Student Viewer.' },
                    { num: 4, title: 'Dashboard Overview', desc: 'How to monitor real-time statistics, document storage quotas, recent activities, and category breakdowns.' },
                    { num: 5, title: 'Basic Navigation', desc: 'Quick shortcuts, sidebar toggling, fuzzy search bar, and instant download actions.' },
                  ].map((item) => (
                    <div 
                      key={item.num}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <span style={{ 
                        fontWeight: 700, 
                        color: '#0f382c', 
                        minWidth: '24px', 
                        fontSize: '0.9rem' 
                      }}>
                        {item.num}.
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'managing-documents' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Managing Documents</h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '20px' }}>
                Learn how to upload, categorize, review, and maintain digital assets in accordance with CHMSU Quality Management Standards.
              </p>
              <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.88rem' }}>
                <strong>Tip:</strong> Always attach appropriate metadata (keywords, department, and academic year) during upload for fast indexing.
              </div>
            </div>
          )}

          {activeTopic !== 'getting-started' && activeTopic !== 'managing-documents' && (
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px', textTransform: 'capitalize' }}>
                {activeTopic.replace('-', ' ')}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '16px' }}>
                Detailed documentation for {activeTopic.replace('-', ' ')} is maintained by the CHMSU ICT and Library Management Council.
              </p>
              <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.86rem', color: '#64748b' }}>
                For immediate technical inquiries, contact the IT Helpdesk at Talisay Campus or email it-support@chmsu.edu.ph.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
