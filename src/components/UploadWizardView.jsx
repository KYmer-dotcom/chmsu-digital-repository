import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, FileText, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { chmsuTalisayDepartments } from '../data/mockData';

export default function UploadWizardView({ onCancel, onUploadSuccess, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [docType, setDocType] = useState('');
  const [department, setDepartment] = useState('College of Engineering (COE)');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [author, setAuthor] = useState('Records Officer');
  const [tags, setTags] = useState('Academic, Institutional');
  const [accessLevel, setAccessLevel] = useState('Public');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!title.trim()) {
        showToast('Please enter a document title');
        return;
      }
      if (!category) {
        showToast('Please select a category');
        return;
      }
      if (!docType) {
        showToast('Please select a document type');
        return;
      }
      if (!department) {
        showToast('Please select an originating department');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Complete upload
      const newDoc = {
        id: Date.now(),
        title: title.trim(),
        category: category,
        department: department,
        type: docType,
        dateUploaded: 'Nov 14, 2026',
        size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
        uploadedBy: author || 'Records Officer',
        description: description || 'Official university record archived into CHMSU repository.',
        year: '2026'
      };

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback
      }

      onUploadSuccess(newDoc);
      showToast('Document uploaded successfully to repository!');
    }
  };

  return (
    <div className="page-content">
      <div className="card upload-card">
        <h2 className="page-title" style={{ marginBottom: '24px' }}>Upload Document</h2>

        {/* Stepper */}
        <div className="stepper-header">
          <div className={`step-item ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-circle">
              {currentStep > 1 ? <CheckCircle2 size={16} /> : '1'}
            </div>
            <span>Document Details</span>
          </div>

          <div className={`step-item ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-circle">
              {currentStep > 2 ? <CheckCircle2 size={16} /> : '2'}
            </div>
            <span>Metadata</span>
          </div>

          <div className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
            <div className="step-circle">
              3
            </div>
            <span>Review</span>
          </div>
        </div>

        {/* Step 1: Document Details */}
        {currentStep === 1 && (
          <div className="upload-step-content">
            <div className="form-group">
              <label className="form-label">
                Title <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">
                  Category <span className="req">*</span>
                </label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Policies">Policies</option>
                  <option value="Reports">Reports</option>
                  <option value="Manuals">Manuals</option>
                  <option value="Forms">Forms</option>
                  <option value="Plans">Plans</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Document Type <span className="req">*</span>
                </label>
                <select
                  className="form-select"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option value="">Select document type</option>
                  <option value="PDF">PDF Document</option>
                  <option value="DOCX">Microsoft Word (DOCX)</option>
                  <option value="XLSX">Microsoft Excel (XLSX)</option>
                </select>
              </div>
            </div>

            {/* Originating Department / Office */}
            <div className="form-group">
              <label className="form-label">
                Originating Department / Office <span className="req">*</span>
              </label>
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <optgroup label="Academic Colleges (Talisay Main Campus)">
                  {chmsuTalisayDepartments
                    .filter(d => d.type === 'Academic')
                    .map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                </optgroup>
                <optgroup label="Administrative & Support Offices">
                  {chmsuTalisayDepartments
                    .filter(d => d.type === 'Administrative')
                    .map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Enter a brief description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">File Upload</label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx"
              />
              <div 
                className={`dropzone-box ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="dropzone-icon">
                  <UploadCloud size={38} />
                </div>
                {selectedFile ? (
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f382c', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <FileText size={18} />
                      {selectedFile.name}
                    </div>
                    <div className="dropzone-subtext">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB - Click to change
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="dropzone-text">
                      Drag and drop files here <br />
                      or <span className="dropzone-choose-btn">Choose File</span>
                    </div>
                    <div className="dropzone-subtext">
                      (Max file size: 50 MB)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Metadata */}
        {currentStep === 2 && (
          <div className="upload-step-content">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Uploaded By / Author</label>
                <input
                  type="text"
                  className="form-input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Access Level</label>
                <select
                  className="form-select"
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                >
                  <option value="Public">Public (Open Access)</option>
                  <option value="Internal">Internal (CHMSU Faculty & Staff)</option>
                  <option value="Restricted">Restricted (Admin Only)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Keywords / Tags</label>
              <input
                type="text"
                className="form-input"
                placeholder="Comma separated tags..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Originating Department / Unit</label>
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
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
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="upload-step-content">
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '14px' }}>Review Document Submission</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '12px', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Title:</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{title}</span>

                <span style={{ color: '#64748b', fontWeight: 600 }}>Originating Dept:</span>
                <span style={{ color: '#0e8345', fontWeight: 700 }}>{department}</span>

                <span style={{ color: '#64748b', fontWeight: 600 }}>Category:</span>
                <span>{category}</span>

                <span style={{ color: '#64748b', fontWeight: 600 }}>Document Type:</span>
                <span>{docType}</span>

                <span style={{ color: '#64748b', fontWeight: 600 }}>File Attachment:</span>
                <span>{selectedFile ? selectedFile.name : 'Generated repository artifact'}</span>

                <span style={{ color: '#64748b', fontWeight: 600 }}>Description:</span>
                <span style={{ color: '#475569' }}>{description || 'None provided'}</span>

                <span style={{ color: '#64748b', fontWeight: 600 }}>Access Level:</span>
                <span>{accessLevel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="wizard-actions">
          {currentStep === 1 ? (
            <button className="btn-outline" onClick={onCancel}>
              Cancel
            </button>
          ) : (
            <button 
              className="btn-outline" 
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <button className="btn-primary" onClick={handleNext}>
            {currentStep === 3 ? 'Submit to Repository' : 'Next'}
            {currentStep < 3 && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
