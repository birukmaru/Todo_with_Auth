import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Login() {
  const [data, setData] = useState({ name: "", password: "" });
  const [isObsecure, setIsObsecure] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:1111/api/auth/login";
      const res = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      enqueueSnackbar("User Sign In successfully", { variant: "success" });

      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          value={data.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type={isObsecure ? "password" : "text"}
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button
          type="button" // Prevents form submission
          onClick={() => setIsObsecure(!isObsecure)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isObsecure ? <FaEye /> : <FaEyeSlash />} {/* Toggle icons */}
        </button>

        <button type="submit">Login In</button>
      </form>
      <Link to="/register">
        <button>Sing Up</button>
      </Link>
    </div>
  );
}

export default Login;
