import { useState } from "react";

function Home() {
  const [data, setData] = useState({ task: "" });
  const [tasks, setTasks] = useState([]);
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }
  function handleAdd() {
    if (data.task.trim() !== "") {
      const url="http://localhost:111/api/task"
      setTasks([...tasks, data.task]);
      setData({ task: "" });
    }
  }
  return (
    <div>
      <h1>Task todo</h1>
      <input
        type="text"
        name="task"
        onChange={handleChange}
        placeholder="Add Task"
        value={data.task}
      />
      <button onClick={() => handleAdd()}>Add Task</button>
      <ul>
        {tasks.map((task, index) => {
          return <li key={index}>{task}</li>;
        })}
      </ul>
    </div>
  );
}

export default Home;
