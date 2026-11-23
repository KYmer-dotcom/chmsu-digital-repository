import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut, ChevronDown, ArrowLeftRight, Database } from 'lucide-react';

export default function Header({ 
  toggleSidebar, 
  onSearch, 
  searchQuery, 
  setSearchQuery,
  onLogout,
  onSwitchOffice,
  currentUser,
  isDbConnected
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isRegistrar = currentUser?.role === 'Registrar';
  const officeName = isRegistrar ? 'Registrar Office' : 'Records Office';
  const avatarInitials = 'RO';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="top-header">
      {/* Left: Sidebar Toggle & Search */}
      <div className="header-left">
        <button 
          className="toggle-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="search-box">
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={
              isRegistrar 
                ? "Search student ID, name, or document..." 
                : "Search documents, colleges (e.g. COE, CIT), or offices..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Right: Notifications, Database Status & Office Account */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Live Database Connection Badge */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.74rem',
            padding: '4px 10px',
            borderRadius: '20px',
            background: isDbConnected ? '#ecfdf5' : '#f8fafc',
            border: isDbConnected ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
            color: isDbConnected ? '#065f46' : '#64748b',
            fontWeight: 600
          }}
          title={isDbConnected ? 'Connected to local SQLite database (server/chmsu_repository.sqlite)' : 'Operating in Cached Offline Mode'}
        >
          <Database size={13} color={isDbConnected ? '#10b981' : '#94a3b8'} />
          <span>{isDbConnected ? 'SQLite Connected' : 'Local Cache'}</span>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button 
            className="bell-btn-modern" 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="bell-dot"></span>
          </button>

          {showNotifications && (
            <div className="header-dropdown-card notifications-menu">
              <div className="dropdown-menu-header">
                <h4>Notifications</h4>
                <span className="notification-count-tag">Recent</span>
              </div>
              <div className="notifications-list">
                <div className="notification-item">
                  <strong>{isRegistrar ? 'Student Request:' : 'Storage Ingest:'}</strong> 
                  {isRegistrar 
                    ? ' New request filed for TOR.' 
                    : ' Annual Report 2024 archived.'}
                </div>
                <div className="notification-item">
                  <strong>System Status:</strong> Repository storage is healthy.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Office Account Profile (Just Office Name) */}
        <div style={{ position: 'relative' }}>
          <div 
            className="user-profile-pill" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            title="Office Account Menu"
          >
            <div className="user-avatar-modern">{avatarInitials}</div>
            <span className="office-account-name">{officeName}</span>
            <ChevronDown size={14} className={`profile-chevron ${showUserMenu ? 'rotated' : ''}`} />
          </div>

          {showUserMenu && (
            <div className="header-dropdown-card user-menu-dropdown">
              <div className="user-menu-info-header">
                <div className="user-menu-full-name">{officeName}</div>
                <div className="user-menu-email">{isRegistrar ? 'registrar@chmsu.edu.ph' : 'records@chmsu.edu.ph'}</div>
              </div>
              <div className="user-menu-divider" />
              {onSwitchOffice && (
                <button
                  type="button"
                  onClick={() => {
                    onSwitchOffice(isRegistrar ? 'records' : 'registrar');
                    setShowUserMenu(false);
                  }}
                  className="user-menu-action-btn"
                  style={{ color: '#0e8345', fontWeight: 600 }}
                >
                  <ArrowLeftRight size={15} />
                  <span>Switch to {isRegistrar ? 'Records Office' : 'Registrar Office'}</span>
                </button>
              )}
              <button 
                onClick={onLogout}
                className="user-menu-action-btn logout-danger"
              >
                <LogOut size={15} /> 
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
