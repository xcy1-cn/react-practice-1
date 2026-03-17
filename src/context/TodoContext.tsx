import { createContext, useContext, ReactNode, Dispatch } from "react";
import type { Todo } from "../types/todo";
import { useTodo, type Action } from "../hooks/useTodo";

const TodoStateContext = createContext<Todo[] | null>(null);
const TodoDispatchContext = createContext<Dispatch<Action> | null>(null);

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === null) {
    throw new Error("useTodoState must be used within TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === null) {
    throw new Error("useTodoDispatch must be used within TodoProvider");
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export function TodoProvider({ children }: Props) {
  const { todos, dispatch } = useTodo();

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

