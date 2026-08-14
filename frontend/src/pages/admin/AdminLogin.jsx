import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend as useAdmin } from '../../hooks/useBackend';
import { LogIn, Mail, ShieldCheck } from 'lucide-react';
import '../../admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email);
    setIsLoading(false);
    if (success) {
      navigate('/page/admin/otp');
    }
  };

  return (
    <div className="admin-root admin-auth-bg">
      <div className="admin-auth-blob admin-auth-blob-1" />
      <div className="admin-auth-blob admin-auth-blob-2" />
      <div className="admin-auth-blob admin-auth-blob-3" />

      <div className="admin-auth-card a-fade-up">
        <div className="admin-auth-icon indigo">
          <LogIn size={26} strokeWidth={2.25} />
        </div>

        <h1 className="admin-auth-title">Welcome Back</h1>
        <p className="admin-auth-subtitle">Enter your email to access the admin panel</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="a-label" style={{ marginBottom: 8, display: 'block' }}>Email Address</label>
            <div className="admin-input-group">
              <span className="admin-input-icon">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-auth-input"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <button type="submit" className="admin-auth-btn" disabled={isLoading}>
            {isLoading ? 'Sending OTP...' : 'Continue \u2192'}
          </button>
        </form>

        <div className="admin-auth-footer">
          <ShieldCheck size={13} style={{ color: '#cbd5e1' }} />
          Secure admin access · verified by one-time code
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
