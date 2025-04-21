import { Routes, Route } from 'react-router-dom';
import UsersPage from './assets/pages/UsersPage';
import UserDetailsPage from './assets/pages/UserDetailsPage';

const App = () => (
  <Routes>
    <Route path="/users" element={<UsersPage />} />
    <Route path="/users/:id" element={<UserDetailsPage />} />
    <Route path="/" element={<UsersPage />} />
  </Routes>
);

export default App;