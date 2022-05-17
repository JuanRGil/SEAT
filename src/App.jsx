import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from './routes';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <Routes>
      <Route
        path={routes.USER}
      >
        <Route index element={<UserList />} />
        <Route path=":userId" element={<UserDetail />} />
      </Route>
      <Route path="*" element={<Navigate to={routes.USER} />} />
    </Routes>
  );
}

export default App;
