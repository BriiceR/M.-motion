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

const App: React.FC = () => {
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
