import logo from "./logo.svg";
import TodoList from "./components/TodoList";
import "./Css/App.css";

function App() {
  return (
    <div className="todo-app">
      <img src={logo} className="app-logo" alt="logo" />
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}

export default App;
