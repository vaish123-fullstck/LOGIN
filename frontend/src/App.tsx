import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const LoginForm = () => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginMutation = useMutation(
    async () => {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/login', {
        email: uid,
        password: password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setIsError(false);
        setMessage(data.message || '✅ Login successful!');
        setLoading(false);
      },
      onError: (error: any) => {
        setIsError(true);
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        // Provide meaningful messages based on backend feedback
        if (!uid || !password) {
          setMessage('⚠️ Please fill in both UID and password.');
        } else if (status === 400) {
          setMessage(`❌ ${serverMessage || 'Bad Request. Fill in all fields properly.'}`);
        } else if (serverMessage === 'User not found') {
          setMessage('❌ This UID is not registered. Please sign up or try a different one.');
        } else if (serverMessage === 'Incorrect password') {
          setMessage('❌ The password you entered is incorrect. Please try again.');
        } else {
          setMessage('❌ Login failed. Please check your credentials.');
        }

        setLoading(false);
      },
    }
  );

  const handleLogin = () => {
    setMessage('');
    setIsError(false);
    loginMutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    e.target.name === 'uid' ? setUid(e.target.value) : setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Welcome back!</h1>
        <input
          className="input-field"
          type="text"
          placeholder="UID"
          value={uid}
          name="uid"
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && (
          <p className={`feedback ${isError ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoginForm />
  </QueryClientProvider>
);

export default App;
