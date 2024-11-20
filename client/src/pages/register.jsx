import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

function Register() {
  const [data, setData] = useState({ name: "", email: "" });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:1111/api/register";
      const { data: res } = await axios.post(url, data);
      enqueueSnackbar("Registration Successfull", {
        variant: "success",
        autoHideDuration: 3000, // Duration in milliseconds
        ContentProps: {
          style: { background: "#4caf50", color: "#fff" }, // Customize snackbar style
        },
      });
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={data.name}
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={data.email}
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="text"
          name="password"
          value={data.password}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
      <Link to="/">
        <button>Log In</button>
      </Link>
    </div>
  );
}

export default Register;
