import { login } from '@/_actions/auth';
import React, { useState } from 'react'

export const LoginForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
 
   const handleSubmit = async (event: React.FormEvent) => {
     event.preventDefault();
     setLoading(true);
     setError('');
 
     try {
       const { token, user } = await login(email, password);
       localStorage.setItem('auth_token', token);
       // Redirect to onboarding form
     } catch (error: unknown) {
       setError((error as Error).message);
     } finally {
       setLoading(false);
     }
   };
 
  return (
    <div>LoginForm</div>
  )
}
