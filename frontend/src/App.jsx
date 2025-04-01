import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data.text);
    };
    getTasks();
  }, []);

  return (
    <>
      <h1>Docker Compose Demo: Tasks</h1>
      <div>
        {tasks.map((task) => (
          <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
