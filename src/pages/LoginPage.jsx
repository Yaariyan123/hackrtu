import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <section className="auth-section">
      <div className="auth-section-bg" />
      <div className="auth-section-content">
        <LoginForm />
      </div>
    </section>
  );
}

export default LoginPage;
