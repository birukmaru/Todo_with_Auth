import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

function Home() {
  const name = localStorage.getItem("name");

  const [data, setData] = useState({ task: "" });
  const [tasks, setTasks] = useState([]);
  const [editedId, setEditedId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  async function AddTask() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      if (data.task.trim() !== "") {
        const url = "http://localhost:1111/api/task";
        const res = await axios.post(url, data, { headers });
        console.log(res.data);
        setData({ task: "" });
        await ShowTask();
      }
    } catch (error) {
      console.log({ message: error.message, add: "add" });
    } finally {
      setLoading(false);
    }
  }

  async function DeleteTask(id) {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = `http://localhost:1111/api/task/${id}`;
      const res = await axios.delete(url, { headers });
      console.log(res.data);
      ShowTask();
    } catch (error) {
      console.log({ message: error.message });
    }
  }

  async function ShowTask() {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = "http://localhost:1111/api/task";
      const res = await axios.get(url, { headers });
      console.log(res.data.tasks);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log({ message: error.message });
    }
  }

  async function EditTask(id, newTask) {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const url = `http://localhost:1111/api/task/${id}`;
      const res = await axios.put(url, { task: newTask }, { headers });
      console.log(res.data.task);
      setEditedId(null);
      ShowTask();
    } catch (error) {
      console.log({ message: error.message });
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  useEffect(() => {
    ShowTask();
  }, []);

  return (
    <div>
      <h1>
        Task Todo <h2>Welcome {name}!</h2>{" "}
        <button onClick={handleLogout}>
          <FaUserAlt /> Log Out{" "}
        </button>
      </h1>

      <input
        type="text"
        name="task"
        onChange={handleChange}
        placeholder="Add Task"
        value={data.task}
      />
      <button onClick={AddTask} disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      <ul>
        {tasks.length === 0 ? (
          <h1>No Task Yet</h1>
        ) : (
          tasks.map((taskObj) => (
            <li key={taskObj._id}>
              {editedId === taskObj._id ? (
                <>
                  <input
                    type="text"
                    onChange={(e) => setEditedTask(e.target.value)}
                    value={editedTask}
                  />
                  <button
                    onClick={() => {
                      EditTask(editedId, editedTask);
                      console.log("clicked");
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {taskObj.task}{" "}
                  <button
                    onClick={() => {
                      setEditedId(taskObj._id);
                      setEditedTask(taskObj.task);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => DeleteTask(taskObj._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
