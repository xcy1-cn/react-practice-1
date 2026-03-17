import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";
import { useContext, useMemo, useState } from "react";
import { useTodoState } from "../context/TodoContext";

// interface Props {
//   // todos: Todo[];
//   onRemove: (id: number) => void;
//   onToggle: (id: number) => void;
//   onEdit: (id: number, text: string) => void;
// }

const TodoList = () => {
  // useContext
  const todos = useTodoState()

  // 需要一个什么状态
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
    "all",
  );
  // 派生什么结果
  const filteredTodos = useMemo(() => {
    return todos.filter((e) => {
      if (filter === "completed") return e.completed;
      if (filter === "uncompleted") return !e.completed;
      return true;
    });
  }, [todos, filter]);
  const filteredCount = filteredTodos.length;
  // console.log(todos, filter);

  return (
    <div>
      <div>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("completed")}>completed</button>
        <button onClick={() => setFilter("uncompleted")}>uncompleted</button>
      </div>
      <div>current count: {filteredCount}</div>
      <div>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </div>
  );
};;

export default TodoList;
