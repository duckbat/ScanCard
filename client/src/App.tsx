import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Test } from "./components/UI/Test";
import Login from "./public/Login";
import Register from "./public/Register";

// TODO: Create auth routes
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Test />} />
        </Routes>
    </Router>
  );
}

export default App;
