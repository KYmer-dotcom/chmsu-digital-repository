import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut, ChevronDown } from 'lucide-react';

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
                : "Search documents, policies, or memos..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Right: Notifications & Office Account Only */}
      <div className="header-right">
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
