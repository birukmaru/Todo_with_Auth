import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", password: "" });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:1111/api/login";
      const res = await axios.post(url, data);
      enqueueSnackbar("User Sign In successfully", { variant: "success" });
      console.log(res);
      navigate("/home");
      // window.location = "/home";
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
          type="text"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit">Login In</button>
      </form>
      <Link to="/register">
        <button>Sing Up</button>
      </Link>
    </div>
  );
}

export default Login;
