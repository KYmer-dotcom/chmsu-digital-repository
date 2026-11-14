import React, { useState } from 'react';
import { Search, FileCode2, Eye, Download, Building2 } from 'lucide-react';
import { chmsuTalisayDepartments } from '../data/mockData';

export default function SearchResultsView({ 
  query, 
  onSearch, 
  documents, 
  onSelectDocument, 
  showToast 
}) {
  const [searchInput, setSearchInput] = useState(query || 'research');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  const getBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'reports': return 'badge-reports';
      case 'policies': return 'badge-policies';
      case 'manuals': return 'badge-manuals';
      case 'forms': return 'badge-forms';
      case 'plans': return 'badge-plans';
      default: return 'badge-others';
    }
  };

  // Filter based on searchInput and dropdowns
  const matchedDocs = documents.filter((doc) => {
    const q = searchInput.toLowerCase();
    const matchesQuery = 
      doc.title.toLowerCase().includes(q) ||
      (doc.description && doc.description.toLowerCase().includes(q)) ||
      (doc.department && doc.department.toLowerCase().includes(q)) ||
      doc.category.toLowerCase().includes(q);

    if (!matchesQuery) return false;
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;
    if (selectedDepartment !== 'All' && doc.department !== selectedDepartment) return false;
    if (selectedType !== 'All' && doc.type !== selectedType) return false;
    if (selectedYear !== 'All' && doc.year !== selectedYear) return false;
    return true;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Search & Retrieval</h2>
        <p className="page-subtitle">Instant multi-parameter search across CHMSU Talisay colleges, offices, and classifications</p>
      </div>

      {/* Search Input Bar with Green Button */}
      <form onSubmit={handleSearchSubmit} className="search-results-bar">
        <div className="search-box" style={{ maxWidth: '600px' }}>
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search documents, colleges, offices, or keywords..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          <Search size={16} /> Search Repository
        </button>
      </form>

      {/* Filters row */}
      <div className="filters-bar" style={{ justifyContent: 'flex-start', gap: '12px' }}>
        <select 
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Policies">Policies</option>
          <option value="Reports">Reports</option>
          <option value="Manuals">Manuals</option>
          <option value="Forms">Forms</option>
          <option value="Plans">Plans</option>
          <option value="Others">Others</option>
        </select>

        {/* Department Filter */}
        <select 
          className="filter-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ minWidth: '220px' }}
        >
          <option value="All">All Departments / Offices</option>
          <optgroup label="Academic Colleges (Talisay)">
            {chmsuTalisayDepartments
              .filter(d => d.type === 'Academic')
              .map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
          </optgroup>
          <optgroup label="Administrative Offices">
            {chmsuTalisayDepartments
              .filter(d => d.type === 'Administrative')
              .map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
          </optgroup>
        </select>

        <select 
          className="filter-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Document Types</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="XLSX">XLSX</option>
        </select>

        <select 
          className="filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {/* Results Title Count */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
          Search Results for "{searchInput || 'all'}"
        </h3>
        <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '2px' }}>
          Found {matchedDocs.length} {matchedDocs.length === 1 ? 'record' : 'records'} matching criteria
          {selectedDepartment !== 'All' && (
            <span style={{ color: '#0e8345', fontWeight: 600, marginLeft: '6px' }}>
              • {selectedDepartment}
            </span>
          )}
        </p>
      </div>

      {/* Results List */}
      <div className="search-results-list">
        {matchedDocs.map((doc) => (
          <div key={doc.id} className="search-result-card">
            <div className="search-card-top">
              <div className="search-card-title-group" style={{ flexWrap: 'wrap', gap: '8px' }}>
                <span className="pdf-badge">
                  <FileCode2 size={16} />
                </span>
                <span 
                  className="search-card-title"
                  onClick={() => onSelectDocument(doc)}
                >
                  {doc.title}
                </span>
                <span className={`badge ${getBadgeClass(doc.category)}`}>
                  {doc.category}
                </span>
                <span 
                  className="dept-pill"
                  title={`Originating Department: ${doc.department || 'Records Office'}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.78rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    color: '#334155',
                    fontWeight: 500,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <Building2 size={13} color="#0e8345" />
                  {doc.department || 'Records Office'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="search-card-date">{doc.dateUploaded}</span>
                <div className="table-actions">
                  <button 
                    className="action-icon-btn" 
                    title="View Document"
                    onClick={() => onSelectDocument(doc)}
                  >
                    <Eye size={17} />
                  </button>
                  <button 
                    className="action-icon-btn" 
                    title="Download Document"
                    onClick={() => showToast(`Downloading "${doc.title}.pdf"...`)}
                  >
                    <Download size={17} />
                  </button>
                </div>
              </div>
            </div>

            <p className="search-card-desc">
              {doc.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
