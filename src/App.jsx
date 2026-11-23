import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import DocumentsView from './components/DocumentsView';
import UploadWizardView from './components/UploadWizardView';
import SearchResultsView from './components/SearchResultsView';
import CategoriesView from './components/CategoriesView';
import BackupRecoveryView from './components/BackupRecoveryView';
import UserGuideView from './components/UserGuideView';
import ReportsView from './components/ReportsView';
import UsersView from './components/UsersView';
import SettingsView from './components/SettingsView';
import DocumentModal from './components/DocumentModal';
import StudentRequestsView from './components/StudentRequestsView';
import { initialDocuments, initialCategories, initialStudentRequests } from './data/mockData';
import { getCurrentSession, clearCurrentSession, initialAccounts } from './data/accountsDb';
import { CheckCircle2 } from 'lucide-react';
import { api } from './services/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return getCurrentSession() || initialAccounts[0];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getCurrentSession();
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDbConnected, setIsDbConnected] = useState(false);
  
  // Data State with localStorage persistence & automatic schema upgrade
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('chmsu_docs');
    if (!saved) return initialDocuments;
    try {
      const parsed = JSON.parse(saved);
      // If legacy docs lack department or mock dataset expanded, upgrade to initialDocuments
      const needsUpgrade = parsed.some(d => !d.department) || parsed.length < initialDocuments.length;
      if (needsUpgrade) {
        localStorage.setItem('chmsu_docs', JSON.stringify(initialDocuments));
        return initialDocuments;
      }
      return parsed;
    } catch {
      return initialDocuments;
    }
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('chmsu_cats');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [studentRequests, setStudentRequests] = useState(() => {
    const saved = localStorage.getItem('chmsu_student_requests');
    return saved ? JSON.parse(saved) : initialStudentRequests;
  });
  const [selectedDocForModal, setSelectedDocForModal] = useState(null);

  // Sync to localStorage
  const updateDocuments = (docs) => {
    setDocuments(docs);
    localStorage.setItem('chmsu_docs', JSON.stringify(docs));
  };

  const updateCategories = (cats) => {
    setCategories(cats);
    localStorage.setItem('chmsu_cats', JSON.stringify(cats));
  };

  const updateStudentRequests = (reqs) => {
    setStudentRequests(reqs);
    localStorage.setItem('chmsu_student_requests', JSON.stringify(reqs));
  };

  // SQLite Database Health Check and Sync on Mount
  useEffect(() => {
    let isMounted = true;
    async function syncWithSQLiteDatabase() {
      const health = await api.checkHealth();
      if (health.isConnected && isMounted) {
        setIsDbConnected(true);
        const [dbDocs, dbReqs, dbCats] = await Promise.all([
          api.getDocuments(),
          api.getStudentRequests(),
          api.getCategories()
        ]);
        if (dbDocs && dbDocs.length > 0 && isMounted) updateDocuments(dbDocs);
        if (dbReqs && dbReqs.length > 0 && isMounted) updateStudentRequests(dbReqs);
        if (dbCats && dbCats.length > 0 && isMounted) updateCategories(dbCats);
      }
    }
    syncWithSQLiteDatabase();
    return () => { isMounted = false; };
  }, []);

  const handleUpdateRequestStatus = (id, newStatus, extraData = {}) => {
    const updated = studentRequests.map((r) => 
      r.id === id ? { ...r, status: newStatus, ...extraData } : r
    );
    updateStudentRequests(updated);
    // Sync to SQLite database
    api.updateRequestStatus(id, newStatus, extraData);
  };

  const handleAddRequest = (newReq) => {
    const updated = [newReq, ...studentRequests];
    updateStudentRequests(updated);
    // Sync to SQLite database
    api.createStudentRequest(newReq);
  };

  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleGlobalSearch = (query) => {
    if (query && query.trim()) {
      setSearchQuery(query.trim());
      setCurrentView('search');
    }
  };

  const handleUploadSuccess = (newDoc) => {
    const updated = [newDoc, ...documents];
    updateDocuments(updated);
    // Sync to SQLite database
    api.createDocument(newDoc);
    setCurrentView('documents');
  };

  const handleDeleteDocument = (id) => {
    const updated = documents.filter((d) => d.id !== id);
    updateDocuments(updated);
    // Sync to SQLite database
    api.deleteDocument(id);
  };

  const handleAddCategory = (newCat) => {
    const updated = [...categories, newCat];
    updateCategories(updated);
  };

  const handleDeleteCategory = (id) => {
    const updated = categories.filter((c) => c.id !== id);
    updateCategories(updated);
  };

  // Restore State Handler
  const handleRestoreState = (restoredDocs, restoredCats) => {
    if (restoredDocs) updateDocuments(restoredDocs);
    if (restoredCats) updateCategories(restoredCats);
    setCurrentView('documents');
  };

  const handleLoginSuccess = (user) => {
    if (user) setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    showToast(`Welcome back, ${user?.name || user?.username || 'Admin'}!`);
  };

  const handleLogout = () => {
    clearCurrentSession();
    setIsAuthenticated(false);
    showToast('You have signed out.');
  };

  const handleSwitchOffice = (targetUsername) => {
    const targetUser = initialAccounts.find(acc => acc.username === targetUsername) || initialAccounts[0];
    setCurrentUser(targetUser);
    localStorage.setItem('chmsu_current_session', JSON.stringify(targetUser));
    setCurrentView('dashboard');
    showToast(`Switched workspace to ${targetUser.name}`);
  };

  // If user is on the Login Screen
  if (!isAuthenticated) {
    return (
      <LoginView 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  return (
    <div className="app-container">
      {/* Toast popup */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Document Details Modal */}
      <DocumentModal 
        doc={selectedDocForModal}
        onClose={() => setSelectedDocForModal(null)}
        showToast={showToast}
      />

      {/* Main Sidebar */}
      <Sidebar 
        currentUser={currentUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Workspace */}
      <div className="main-wrapper">
        <Header 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onSearch={handleGlobalSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogout={handleLogout}
          onSwitchOffice={handleSwitchOffice}
          currentUser={currentUser}
          isDbConnected={isDbConnected}
          onNavigate={setCurrentView}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {currentView === 'dashboard' && (
            <DashboardView 
              currentUser={currentUser}
              documents={documents}
              studentRequests={studentRequests}
              onNavigate={setCurrentView}
              onSelectDocument={setSelectedDocForModal}
            />
          )}

          {currentView === 'requests' && (
            <StudentRequestsView 
              requests={studentRequests}
              documents={documents}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onAddRequest={handleAddRequest}
              showToast={showToast}
            />
          )}

          {currentView === 'documents' && (
            <DocumentsView 
              currentUser={currentUser}
              documents={documents}
              onNavigate={setCurrentView}
              onSelectDocument={setSelectedDocForModal}
              onDeleteDocument={handleDeleteDocument}
              showToast={showToast}
            />
          )}

          {currentView === 'upload' && (
            <UploadWizardView 
              onCancel={() => setCurrentView('documents')}
              onUploadSuccess={handleUploadSuccess}
              showToast={showToast}
            />
          )}

          {currentView === 'search' && (
            <SearchResultsView 
              query={searchQuery}
              onSearch={handleGlobalSearch}
              documents={documents}
              onSelectDocument={setSelectedDocForModal}
              showToast={showToast}
            />
          )}

          {currentView === 'categories' && (
            <CategoriesView 
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              showToast={showToast}
            />
          )}

          {currentView === 'backup' && (
            <BackupRecoveryView 
              documents={documents}
              categories={categories}
              onRestoreState={handleRestoreState}
              showToast={showToast}
            />
          )}

          {currentView === 'guide' && (
            <UserGuideView />
          )}

          {currentView === 'reports' && (
            <ReportsView 
              currentUser={currentUser}
              studentRequests={studentRequests}
              documents={documents}
              showToast={showToast} 
            />
          )}

          {currentView === 'users' && (
            <UsersView showToast={showToast} />
          )}

          {currentView === 'settings' && (
            <SettingsView showToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}
