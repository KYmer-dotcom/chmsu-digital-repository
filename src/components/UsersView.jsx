import React, { useState } from 'react';
import { Users, UserPlus, Shield, CheckCircle2, MoreVertical, Trash2 } from 'lucide-react';

export default function UsersView({ showToast }) {
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@chmsu.edu.ph', role: 'Administrator', department: 'Management Information System', status: 'Active' },
    { id: 2, name: 'R. Santos', email: 'r.santos@chmsu.edu.ph', role: 'Faculty Researcher', department: 'College of Arts & Sciences', status: 'Active' },
    { id: 3, name: 'L. Dela Cruz', email: 'l.delacruz@chmsu.edu.ph', role: 'Department Reviewer', department: 'Office of Student Affairs', status: 'Active' },
    { id: 4, name: 'M. Torres', email: 'm.torres@chmsu.edu.ph', role: 'Planning Officer', department: 'Planning & Development Office', status: 'Active' },
    { id: 5, name: 'E. Villanueva', email: 'e.villanueva@chmsu.edu.ph', role: 'Archivist', department: 'University Library System', status: 'Active' },
  ]);

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="page-title">User Management</h2>
          <p className="page-subtitle">Configure accounts, permission tiers, and institutional access</p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => showToast('Invitation sent to new CHMSU faculty account.')}
        >
          <UserPlus size={16} /> Add User
        </button>
      </div>

      <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Institutional Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: '#0284c7' }}>{u.email}</td>
                  <td>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '0.8rem', 
                      padding: '3px 8px', 
                      borderRadius: '6px',
                      background: u.role === 'Administrator' ? '#fef3c7' : '#f1f5f9',
                      color: u.role === 'Administrator' ? '#92400e' : '#334155',
                      fontWeight: 600
                    }}>
                      <Shield size={13} /> {u.role}
                    </span>
                  </td>
                  <td style={{ color: '#64748b' }}>{u.department}</td>
                  <td>
                    <span className="badge badge-completed">
                      {u.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="action-icon-btn delete"
                      title="Remove User"
                      onClick={() => {
                        setUsersList(usersList.filter(x => x.id !== u.id));
                        showToast(`Removed access for ${u.name}`);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
