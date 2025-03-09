import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import Main from "./public/Main";
import Create from "./public/Create";
import Single from "./public/Single";
import Modify from "./public/Modify";
import NotFound from "./public/NotFound";
import CardNotFound from "./public/CardNotFound";
import About from "./public/About";
import { Profile } from "./components/UI/Profile";
import { useAuthStore } from "./store/authStore";
import { Navigate } from "react-router-dom";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        } />
        <Route path="/card/:id" element={
          <ProtectedRoute>
            <Single />
          </ProtectedRoute>
        } />
        <Route path="/modify/:id" element={
          <ProtectedRoute>
            <Modify />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Error Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/card-not-found" element={
          <ProtectedRoute>
            <CardNotFound />
          </ProtectedRoute>
        } />
        
        {/* Fallback Route - Redirect to 404 for unknown routes */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
