import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ExerciseListPage from './pages/ExerciseListPage';
import ExerciseFormPage from './pages/ExerciseFormPage';
import SessionListPage from './pages/SessionListPage';
import SessionFormPage from './pages/SessionFormPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<ExerciseListPage />} />
          <Route path="/exercises/new" element={<ExerciseFormPage />} />
          <Route path="/exercises/:id/edit" element={<ExerciseFormPage />} />
          <Route path="/sessions" element={<SessionListPage />} />
          <Route path="/sessions/new" element={<SessionFormPage />} />
          <Route path="/sessions/:id/edit" element={<SessionFormPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;