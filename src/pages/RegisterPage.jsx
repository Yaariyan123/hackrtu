import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <section className="auth-section">
      <div className="auth-section-bg" />
      <div className="auth-section-content">
        <RegisterForm />
      </div>
    </section>
  );
}

export default RegisterPage;
