// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import Login from './pages/logIn';
import { List } from './pages/list';
import { Chart } from './pages/chart';
import { SignIn } from './pages/signIn';
import { Idea } from './pages/idea';
import { Profil } from './pages/profil';
import Layout from './components/ui/layout';
import { useEffect, useState } from 'react';
import { Loader } from './components/loader';


const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setLoading(false), 2000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader isFading={isFading} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="list" element={<List />} />
          <Route path="chart" element={<Chart />} />
          <Route path="idea" element={<Idea />} />
          <Route path="profil" element={<Profil />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
