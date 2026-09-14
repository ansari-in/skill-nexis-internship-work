import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Todo() {
    const { token } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/tasks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message);
                    return;
                }

                setTasks(data);
            } catch (error) {
                setError("Unable to load tasks.", error);
            }
        }

        loadTasks();
    }, [token]);

    async function addTask(event) {
        event.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setTasks([data, ...tasks]);
            setTitle("");
            setError("");
        } catch (error) {
            setError("Unable to add task.",error);
        }
    }

    async function toggleTask(task) {
        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        completed: !task.completed
                    })
                }
            );

            const updatedTask = await response.json();

            if (!response.ok) {
                setError(updatedTask.message);
                return;
            }

            setTasks(
                tasks.map((item) =>
                    item._id === updatedTask._id
                        ? updatedTask
                        : item
                )
            );
        } catch (error) {
            setError("Unable to update task.", error);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setTasks(
                tasks.filter((task) => task._id !== id)
            );
        } catch (error) {
            setError("Unable to delete task.",error);
        }
    }

    return (
        <div className="todo-container">
            <h2>My Tasks</h2>

            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                />

                <button type="submit">
                    Add Task
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            <div className="tasks">
                {tasks.length === 0 ? (
                    <p>No tasks yet.</p>
                ) : (
                    tasks.map((task) => (
                        <div className="task" key={task._id}>
                            <span
                                className={
                                    task.completed
                                        ? "completed"
                                        : ""
                                }
                            >
                                {task.title}
                            </span>

                            <div>
                                <button
                                    onClick={() =>
                                        toggleTask(task)
                                    }
                                >
                                    {task.completed
                                        ? "Undo"
                                        : "Complete"}
                                </button>

                                <button
                                    onClick={() =>
                                        deleteTask(task._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Todo;