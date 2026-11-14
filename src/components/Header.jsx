import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut, Settings as SettingsIcon, User } from 'lucide-react';

export default function Header({ 
  toggleSidebar, 
  onSearch, 
  searchQuery, 
  setSearchQuery,
  onLogout,
  currentUser
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <button 
          className="toggle-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="search-box">
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search documents, titles, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="header-right">
        <div style={{ position: 'relative' }}>
          <button 
            className="bell-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="bell-dot"></span>
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '280px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: '16px',
              zIndex: 50
            }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#0f172a' }}>Notifications</h4>
              <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <strong>New Upload:</strong> Annual Report 2024 was added by Admin.
                </div>
                <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <strong>Backup Complete:</strong> Weekly incremental backup completed.
                </div>
                <div>
                  <strong>User Access:</strong> R. Santos requested review permission.
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <div 
            className="user-profile" 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">{currentUser?.avatar || 'AD'}</div>
            <div className="user-info">
              <div className="user-name">{currentUser?.name || 'Administrator'}</div>
              <div className="user-role">{currentUser?.role || 'Repository Administrator'}</div>
            </div>
          </div>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '180px',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: '6px',
              zIndex: 50
            }}>
              <button 
                onClick={() => setShowUserMenu(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.85rem',
                  color: '#1e293b',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
              >
                <User size={15} /> Profile
              </button>
              <button 
                onClick={onLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.85rem',
                  color: '#ef4444',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
