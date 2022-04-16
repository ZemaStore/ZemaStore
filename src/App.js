import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css"
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserLIst from "./pages/userList/UserLIst"
import User from "./pages/user/User";


function App() {
  return (
    <Router >
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UserLIst />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
