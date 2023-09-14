import React, { useEffect, useState } from "react";
import axios from "axios";

function Works() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const listWorks = async () => {
    await axios
      .get("http://localhost:3000/api/v1/works")
      .then((res) => setTodos(res.data.works))
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    listWorks();
  }, []);

  console.log(todos);
  const addTodo = async () => {
    try {
      const response = await axios
        .post("http://localhost:3000/api/v1/works", {
          name: newTodo,
          status: "uncomplete",
        })
        .then((res) => {
          setTodos([...todos, res.data]);
          setNewTodo("");
          listWorks();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const markComplete = async (id) => {
    console.log("test");
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: "complete" } : todo
    );
    try {
      await axios
        .put(`http://localhost:3000/api/v1/works/${id}/complete`)
        .then((res) => {
          setTodos(updatedTodos);
          
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/works/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="container">
        <h1>TODOLIST</h1>
        <div className="btn">
          <div className="action">
            <div className="action-add">
              <input
                type="text"
                name="name"
                placeholder="Add"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </div>
            <button onClick={addTodo} className="action-icon">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h2>Uncompleted Tasks</h2>
            <ul>
              {todos
                .filter((todo) => todo.status === "uncomplete")
                .map((todo) => (
                  <li key={todo.id}>
                    <span>{todo.name}</span>
                    <span>
                      <button onClick={() => markComplete(todo.id)}>
                        Hoàn thành
                      </button>
                      <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-6">
            <h2>Completed Tasks</h2>
            <ul>
              {todos
                .filter((todo) => todo.status === "complete")
                .map((todo) => (
                  <li key={todo.id}>
                    <span>{todo.name}</span>
                    <span>
                      <button>Đã hoàn thành</button>
                      <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
