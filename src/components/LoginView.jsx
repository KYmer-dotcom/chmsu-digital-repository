import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginView({ onLoginSuccess, onExploreGuest }) {
  const [username, setUsername] = useState('john.doe@chmsu.edu.ph');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="login-page">
      {/* Left Grand Campus Banner */}
      <div 
        className="login-left-banner"
        style={{ backgroundImage: `url('./chmsu_bg.jpg')` }}
      >
        <div className="login-overlay"></div>
        <div className="login-brand-content">
          <img 
            src="./chmsu_logo.png" 
            alt="Carlos Hilado Memorial State University Seal" 
            className="login-seal"
          />
          <h1>CHMSU</h1>
          <h2>Digital Repository</h2>
          <div className="login-tagline">
            Preserve • Organize • Access • Share
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="login-right-section">
        {/* Guest quick access banner */}
        <div style={{ position: 'absolute', top: '20px', right: '24px' }}>
          <button 
            className="btn-outline"
            style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={onLoginSuccess}
          >
            Direct to Dashboard <ArrowRight size={14} />
          </button>
        </div>

        <div className="login-form-card">
          <h3 className="login-form-title">Welcome</h3>
          <p className="login-form-subtitle">
            Sign in to access the CHMSU Digital Repository
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username or Email */}
            <div className="form-group">
              <div className="input-with-icon">
                <User size={18} className="input-icon-left" />
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="login-options-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#0f382c', width: '15px', height: '15px', cursor: 'pointer' }}
                />
                Remember me
              </label>
              <a 
                href="#forgot" 
                className="forgot-link"
                onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered institutional email.'); }}
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="btn-login-submit">
              Sign In
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span>or</span>
            </div>

            {/* Sign in with CHMSU Account SSO */}
            <button 
              type="button" 
              className="btn-sso"
              onClick={onLoginSuccess}
            >
              <ShieldCheck size={18} color="#0f382c" />
              Sign in with CHMSU Account
            </button>
          </form>

          {/* Footer Copyright */}
          <div className="login-footer-copy">
            © 2026 Carlos Hilado Memorial State University - Talisay Campus.<br />
            All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
