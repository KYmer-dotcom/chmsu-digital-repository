import React, { useState } from 'react';
import { User, Eye, EyeOff, ChevronDown, Check, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginView({ onLoginSuccess }) {
  const roles = [
    { label: 'Library Staff (Circulation)', defaultUser: 'staff' },
    { label: 'Administrator (MIS)', defaultUser: 'john.doe@chmsu.edu.ph' },
    { label: 'Faculty Researcher', defaultUser: 'r.santos@chmsu.edu.ph' },
    { label: 'Student / Guest', defaultUser: 'student.chmsu' }
  ];

  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [username, setUsername] = useState(roles[0].defaultUser);
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setUsername(role.defaultUser);
    setIsRoleDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="login-v2-container">
      {/* Background with Dark Vignette Overlay */}
      <div 
        className="login-v2-bg"
        style={{ backgroundImage: `url('./carloshiladotalisay.jpg')` }}
      />
      <div className="login-v2-backdrop-overlay" />

      {/* Top Header Bar / Role Switcher & Bypass */}
      <div className="login-v2-topbar">
        {/* Bypass / Direct Access Button */}
        <button 
          className="login-v2-bypass-btn"
          onClick={onLoginSuccess}
          title="Direct to Repository Dashboard"
        >
          Direct to Dashboard <ArrowRight size={14} />
        </button>

        {/* Role Selector Pill */}
        <div className="login-v2-role-wrapper">
          <button 
            type="button" 
            className="login-v2-role-badge"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
          >
            <User size={15} className="role-icon" />
            <span className="role-tag">ROLE:</span>
            <span className="role-name">{selectedRole.label}</span>
            <ChevronDown size={14} className={`role-chevron ${isRoleDropdownOpen ? 'rotated' : ''}`} />
          </button>

          {isRoleDropdownOpen && (
            <div className="login-v2-role-menu">
              <div className="role-menu-header">Select University Role</div>
              {roles.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  className={`role-menu-item ${selectedRole.label === r.label ? 'active' : ''}`}
                  onClick={() => handleRoleChange(r)}
                >
                  <span>{r.label}</span>
                  {selectedRole.label === r.label && <Check size={14} color="#e5a93b" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Floating Authentication Card */}
      <div className="login-v2-card">
        {/* Left Green Half with Seal */}
        <div className="login-v2-seal-section">
          <div className="seal-ring">
            <img 
              src="./chmsu_logo.png" 
              alt="Carlos Hilado Memorial State University Seal" 
              className="seal-image"
            />
          </div>
        </div>

        {/* Right Dark Navy Half with Form */}
        <div className="login-v2-form-section">
          <div className="form-eyebrow">CHMSU LIBRARY</div>
          <h2 className="form-heading">Login to your Account</h2>

          <form onSubmit={handleSubmit} className="login-v2-form">
            {/* Username Field */}
            <div className="v2-input-group">
              <input
                type="text"
                className="v2-input-field"
                placeholder="Username or Institutional Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="v2-input-group">
              <label className="v2-field-label">PASSWORD</label>
              <div className="v2-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="v2-input-field"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="v2-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="v2-remember-row">
              <label className="v2-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <a 
                href="#forgot" 
                className="v2-forgot-link"
                onClick={(e) => { 
                  e.preventDefault(); 
                  alert('A recovery link has been sent to your registered @chmsu.edu.ph address.'); 
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Yellow / Amber Login Button */}
            <button type="submit" className="v2-btn-login">
              Login
            </button>

            {/* SSO Institutional Option */}
            <div className="v2-sso-container">
              <button 
                type="button" 
                className="v2-sso-link"
                onClick={onLoginSuccess}
              >
                <ShieldCheck size={14} color="#e5a93b" />
                <span>Sign in with CHMSU Google SSO</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
