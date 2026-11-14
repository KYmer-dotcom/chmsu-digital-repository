import React, { useState } from 'react';
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
import { initialDocuments, initialCategories } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State with localStorage persistence
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('chmsu_docs');
    return saved ? JSON.parse(saved) : initialDocuments;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('chmsu_cats');
    return saved ? JSON.parse(saved) : initialCategories;
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
    setCurrentView('documents');
  };

  const handleDeleteDocument = (id) => {
    const updated = documents.filter((d) => d.id !== id);
    updateDocuments(updated);
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

  // Simulate Data-Loss Incident
  const handleSimulateDataLoss = () => {
    updateDocuments([]);
    showToast('CRITICAL INCIDENT: All documents wiped from repository!');
    setCurrentView('documents');
  };

  // If user is on the Login Screen
  if (!isAuthenticated) {
    return (
      <LoginView 
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setCurrentView('dashboard');
          showToast('Welcome back, John Doe!');
        }} 
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
        currentView={currentView}
        setCurrentView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onShowLogin={() => setIsAuthenticated(false)}
      />

      {/* Main Workspace */}
      <div className="main-wrapper">
        <Header 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onSearch={handleGlobalSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogout={() => {
            setIsAuthenticated(false);
            showToast('You have signed out.');
          }}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {currentView === 'dashboard' && (
            <DashboardView 
              documents={documents}
              onNavigate={setCurrentView}
              onSelectDocument={setSelectedDocForModal}
            />
          )}

          {currentView === 'documents' && (
            <DocumentsView 
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
              onSimulateDataLoss={handleSimulateDataLoss}
              showToast={showToast}
            />
          )}

          {currentView === 'guide' && (
            <UserGuideView />
          )}

          {currentView === 'reports' && (
            <ReportsView showToast={showToast} />
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
