import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import Login from './pages/logIn';
import { List } from './pages/list';
import { Chart } from './pages/chart';
import { SignIn } from './pages/signIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<List />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
