import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function CategoriesView({ 
  categories, 
  onAddCategory, 
  onDeleteCategory, 
  showToast 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setCatName('');
    setCatDesc('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatDesc(cat.description);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!catName.trim()) {
      showToast('Please provide a category name');
      return;
    }

    if (editingCategory) {
      // update
      editingCategory.name = catName.trim();
      editingCategory.description = catDesc.trim();
      showToast(`Category "${catName}" updated.`);
    } else {
      const newCat = {
        id: Date.now(),
        name: catName.trim(),
        description: catDesc.trim(),
        count: 0
      };
      onAddCategory(newCat);
      showToast(`Category "${catName}" added.`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="page-title">Categories</h2>
          <p className="page-subtitle">Manage document categories</p>
        </div>

        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Document Count</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: 600 }}>{cat.name}</td>
                  <td style={{ color: '#64748b' }}>{cat.description}</td>
                  <td style={{ color: '#0f172a', fontWeight: 600 }}>{cat.count}</td>
                  <td>
                    <div className="table-actions" style={{ justifyContent: 'center' }}>
                      <button 
                        className="action-icon-btn" 
                        title="Edit Category"
                        onClick={() => openEditModal(cat)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="action-icon-btn delete" 
                        title="Delete Category"
                        onClick={() => {
                          onDeleteCategory(cat.id);
                          showToast(`Category "${cat.name}" removed.`);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Add/Edit Category */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button 
                className="action-icon-btn" 
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">
                    Category Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Curricula, Accreditations"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Brief description of the category purpose"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-outline" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
