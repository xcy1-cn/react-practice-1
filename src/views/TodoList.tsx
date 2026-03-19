import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";
import { useContext, useMemo, useState } from "react";
import { useTodoFilter, useTodoState } from "../context/TodoContext";
import { useTodoStore } from "../store/useTodoStore";

// interface Props {
//   // todos: Todo[];
//   onRemove: (id: number) => void;
//   onToggle: (id: number) => void;
//   onEdit: (id: number, text: string) => void;
// }

const TodoList = () => {
  // useContext
  // const todos = useTodoState()

  // 需要一个什么状态
  // const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
  //   "all",
  // );

  // Zustand
  const todos = useTodoStore((s) => s.todos)
  const filter = useTodoStore((s) => s.filter)
  const setFilter = useTodoStore((s) => s.setFilter);

  // context
  // const {filter, setFilter} = useTodoFilter()
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
