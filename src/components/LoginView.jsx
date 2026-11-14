import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { authenticateUser } from '../data/accountsDb';

export default function LoginView({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const result = authenticateUser(username, password);
    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleSsoLogin = () => {
    const result = authenticateUser('admin', 'admin123');
    if (result.success) {
      onLoginSuccess(result.user);
    }
  };

  return (
    <div className="login-v2-container">
      {/* Background with Dark Vignette Overlay */}
      <div 
        className="login-v2-bg"
        style={{ backgroundImage: `url('./carloshiladotalisay.jpg')` }}
      />
      <div className="login-v2-backdrop-overlay" />

      {/* Center Floating Authentication Card */}
      <div className="login-v2-card">
        {/* Left Green Half with CHMSU Seal */}
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
          <div className="form-eyebrow">CHMSU DIGITAL REPOSITORY</div>
          <h2 className="form-heading">Welcome</h2>
          <p className="form-subheading">Sign in to access the CHMSU Digital Repository</p>

          {/* Error Alert Banner */}
          {errorMessage && (
            <div className="v2-error-banner">
              <AlertCircle size={16} className="v2-error-icon" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-v2-form">
            {/* Username / Institutional Email Field with Left Icon */}
            <div className="v2-input-group">
              <div className="v2-input-with-icon">
                <User size={18} className="v2-input-icon-left" />
                <input
                  type="text"
                  className={`v2-input-field has-left-icon ${errorMessage ? 'has-error' : ''}`}
                  placeholder="Username (e.g. admin)"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field with Left Lock & Right Eye Toggle */}
            <div className="v2-input-group">
              <div className="v2-input-with-icon">
                <Lock size={18} className="v2-input-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`v2-input-field has-left-icon has-right-icon ${errorMessage ? 'has-error' : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                />
                <button
                  type="button"
                  className="v2-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox & Forgot Password Link */}
            <div className="v2-remember-row">
              <label className="v2-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a 
                href="#forgot" 
                className="v2-forgot-link"
                onClick={(e) => { 
                  e.preventDefault(); 
                  alert('Default credentials: Username "admin" and password "admin123"'); 
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Primary Button */}
            <button type="submit" className="v2-btn-login">
              Sign In
            </button>

            {/* Divider 'or' */}
            <div className="v2-divider">
              <span>or</span>
            </div>

            {/* SSO Institutional Option */}
            <button 
              type="button" 
              className="v2-btn-sso"
              onClick={handleSsoLogin}
            >
              <ShieldCheck size={18} color="#10b981" />
              <span>Sign in with CHMSU Account</span>
            </button>
          </form>

          {/* Footer Copyright */}
          <div className="v2-footer-copy">
            © 2026 Carlos Hilado Memorial State University - Talisay Campus.<br />
            All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
