import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loginSuccess } from './store/slices/authSlice';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';
import Loading from './components/Loading';
import Layout from './components/Layout';

const AppRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const Login = lazy(() => import('./pages/Login'));
  const Signup = lazy(() => import('./pages/Signup'));
  const CreatorDashboard = lazy(() => import('./pages/CreatorDashboard'));
  const EditCreator = lazy(() => import('./pages/EditCreator'));
  const CreatorProfile = lazy(() => import('./pages/CreatorProfile'));
  const CreateCreator = lazy(() => import('./pages/CreateCreator'));

  useEffect(() => {
    const stored = localStorage.getItem('creator_auth')
      ? JSON.parse(localStorage.getItem('creator_auth'))
      : null;
    if (stored) {
      try {
        // const parsed = JSON.parse(stored);
        dispatch(loginSuccess(stored));
      } catch (e) {
        console.log('Failed to parse stored auth data', e);
        // localStorage.removeItem('creator_auth');
      }
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          {/* <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          /> */}

          {/* Protected routes wrapped with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<CreatorDashboard />} />
            <Route path="/creators/:id" element={<CreatorProfile />} />
            <Route path="/create" element={<CreateCreator />} />
            <Route path="/edit/:id" element={<EditCreator />} />
          </Route>

          {/* Default route - redirect based on auth */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <AppRoute />
    </div>
  );
}
