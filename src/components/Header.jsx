import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut, User, PlusCircle, Building2, ChevronDown } from 'lucide-react';

export default function Header({ 
  toggleSidebar, 
  onSearch, 
  searchQuery, 
  setSearchQuery,
  onLogout,
  currentUser,
  onNavigate
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isRegistrar = currentUser?.role === 'Registrar';
  const displayName = currentUser?.name || (isRegistrar ? 'Registrar Officer' : 'Records Officer');
  const displayRole = currentUser?.officeName || (isRegistrar ? 'Office of the Registrar' : 'Records Management Office');
  const avatarInitials = currentUser?.avatar || 'RO';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="top-header">
      {/* 1. Left Section: Sidebar Toggle & Quick Context */}
      <div className="header-left">
        <button 
          className="toggle-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          title="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="header-context-badge">
          <Building2 size={15} className="context-badge-icon" />
          <span>{isRegistrar ? 'Office of the Registrar' : 'Records Management Office'}</span>
        </div>
      </div>

      {/* 2. Center Section: Prominent, Centered Global Search */}
      <div className="header-center">
        <div className="search-box">
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={
              isRegistrar 
                ? "Search student ID, name, or requested document..." 
                : "Search institutional records, policies, manuals, or memos..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="search-kbd-chip">Ctrl K</kbd>
        </div>
      </div>

      {/* 3. Right Section: Action Button, Notifications & Account Profile */}
      <div className="header-right">
        {/* Quick Primary Action Button */}
        {onNavigate && (
          <button
            className="btn-header-action"
            onClick={() => onNavigate(isRegistrar ? 'requests' : 'upload')}
            title={isRegistrar ? "Log a walk-in or online student document request" : "Ingest and archive a new document into repository storage"}
          >
            <PlusCircle size={15} />
            <span>{isRegistrar ? 'Log Student Request' : 'Ingest Document'}</span>
          </button>
        )}

        <div className="header-v-divider" />

        {/* Notification Bell */}
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
                <h4>System Notifications</h4>
                <span className="notification-count-tag">3 New</span>
              </div>
              <div className="notifications-list">
                <div className="notification-item">
                  <strong>{isRegistrar ? 'New Request:' : 'New Archive Ingest:'}</strong> 
                  {isRegistrar 
                    ? ' Student #2022-0142 filed request for TOR.' 
                    : ' Annual Report 2024 was archived.'}
                </div>
                <div className="notification-item">
                  <strong>Repository Status:</strong> Storage quota is healthy (26% utilized).
                </div>
                <div className="notification-item">
                  <strong>Security Backup:</strong> Automated snapshot created successfully.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Account Profile Pill */}
        <div style={{ position: 'relative' }}>
          <div 
            className="user-profile-pill" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            title="Account Options"
          >
            <div className="user-avatar-modern">{avatarInitials}</div>
            <div className="user-info-modern">
              <div className="user-name-modern">{displayName}</div>
              <div className="user-role-modern">{displayRole}</div>
            </div>
            <ChevronDown size={14} className={`profile-chevron ${showUserMenu ? 'rotated' : ''}`} />
          </div>

          {showUserMenu && (
            <div className="header-dropdown-card user-menu-dropdown">
              <div className="user-menu-info-header">
                <div className="user-menu-full-name">{displayName}</div>
                <div className="user-menu-email">{currentUser?.email || (isRegistrar ? 'registrar@chmsu.edu.ph' : 'records@chmsu.edu.ph')}</div>
              </div>
              <div className="user-menu-divider" />
              <button 
                onClick={() => {
                  setShowUserMenu(false);
                  if (onNavigate) onNavigate(isRegistrar ? 'requests' : 'settings');
                }}
                className="user-menu-action-btn"
              >
                <User size={15} /> 
                <span>Account Profile</span>
              </button>
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
