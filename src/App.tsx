import TodoInput from "./views/TodoInput";
import TodoList from "./views/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <>
      <div>React Todo App</div>
      <TodoProvider>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
      </TodoProvider>
    </>
  );
}

export default App;

// // useContext
// export const TodoContext = createContext(null);
