import TodoInput from "./views/TodoInput";
import TodoList from "./views/TodoList";
import { useTodo } from "./hooks/useTodo";
import { useCallback } from "react";

function App() {
  const { todos, dispatch } = useTodo();

  // 通过text传入数据
  // useCallback
  const handleAdd = useCallback((text: string) => {
    dispatch({
      type: "add",
      payload: text, // 接收要进行添加的数据源
    });
  }, [dispatch])

  const handleRemove = useCallback((id: number) => {
    dispatch({ type: "remove", payload: id })
  }, [dispatch]) 

  const handleToggle = useCallback((id: number) => {
    dispatch({ type: "toggle", payload: id })
  }, [dispatch])
  const handleEdit = useCallback((id: number, text: string) => {
    dispatch({ type: "edit", payload:{id, text}})
  }, [dispatch])
  return (
    <>
      <div>React Todo App</div>
        <TodoInput onAdd={handleAdd} onEdit={handleEdit} ></TodoInput>
        <TodoList onRemove={handleRemove} onToggle={handleToggle} todos={todos}onEdit={handleEdit}></TodoList>
    </>
  );
}

export default App;
