import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Upload, 
  BarChart3, 
  Users, 
  Database, 
  Settings, 
  HelpCircle,
  LogIn
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, isCollapsed, onShowLogin }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'categories', label: 'Categories', icon: FolderKanban },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'backup', label: 'Backup & Recovery', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img 
          src="./chmsu_logo.png" 
          alt="CHMSU Logo" 
          className="sidebar-logo" 
        />
        {!isCollapsed && (
          <div className="sidebar-brand">
            <h1>CHMSU</h1>
            <p>Digital Repository</p>
          </div>
        )}
      </div>

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
          className="nav-item"
          onClick={onShowLogin}
          title={isCollapsed ? 'Sign In Screen' : undefined}
          style={{ marginTop: '4px', opacity: 0.8 }}
        >
          <LogIn size={19} />
          {!isCollapsed && <span>Sign In Screen</span>}
        </button>
      </div>
    </aside>
  );
}
