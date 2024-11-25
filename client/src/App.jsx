import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
  // const userName = localStorage.getItem("name");
  const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        {user && <Route path="/" exact element={<Home />} />}
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
