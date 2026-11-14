import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Upload, 
  BarChart3, 
  Database, 
  Settings, 
  HelpCircle,
  LogOut,
  ClipboardList
} from 'lucide-react';

export default function Sidebar({ 
  currentUser,
  currentView, 
  setCurrentView, 
  isCollapsed, 
  onLogout 
}) {
  const isRegistrar = currentUser?.role === 'Registrar';

  // Registrar Items (Student Request focus)
  const registrarItems = [
    { id: 'dashboard', label: 'Requests Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Student Requests', icon: ClipboardList },
    { id: 'documents', label: 'Archived Records', icon: FileText },
    { id: 'reports', label: 'Release Reports', icon: BarChart3 },
  ];

  // Records Office Items (Storage, Backups, and Ingestion focus)
  const recordsItems = [
    { id: 'dashboard', label: 'Storage Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Repository Files', icon: FileText },
    { id: 'categories', label: 'Categories', icon: FolderKanban },
    { id: 'upload', label: 'Upload Wizard', icon: Upload },
    { id: 'reports', label: 'Archive Reports', icon: BarChart3 },
    { id: 'backup', label: 'Backup & Storage', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const navItems = isRegistrar ? registrarItems : recordsItems;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <img 
          src="./chmsu_logo.png" 
          alt="CHMSU Logo" 
          className="sidebar-logo" 
        />
        {!isCollapsed && (
          <div className="sidebar-brand">
            <h1>CHMSU</h1>
            <p>{isRegistrar ? 'Office of the Registrar' : 'Records Management'}</p>
          </div>
        )}
      </div>

      {/* Office Role Pill in Sidebar */}
      {!isCollapsed && (
        <div className="sidebar-office-tag">
          <span className="office-tag-dot"></span>
          <span>{isRegistrar ? 'Student Requests Portal' : 'Storage & Archiving Portal'}</span>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={19} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer: Help & Sign Out */}
      <div className="sidebar-footer">
        <button
          className={`nav-item ${currentView === 'guide' ? 'active' : ''}`}
          onClick={() => setCurrentView('guide')}
          title={isCollapsed ? 'Help / User Guide' : undefined}
        >
          <HelpCircle size={19} />
          {!isCollapsed && <span>Help / User Guide</span>}
        </button>
        <button
          className="nav-item btn-sidebar-logout"
          onClick={onLogout}
          title={isCollapsed ? 'Sign Out' : undefined}
          style={{ marginTop: '4px' }}
        >
          <LogOut size={19} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
