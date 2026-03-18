import { createContext, useContext, ReactNode, Dispatch, type SetStateAction, useState } from "react";
import type { Todo } from "../types/todo";
import { useTodo, type Action } from "../hooks/useTodo";

// todoState
const TodoStateContext = createContext<Todo[] | null>(null);
// todoDispatch
const TodoDispatchContext = createContext<Dispatch<Action> | null>(null);
// filter
type Filter = "all" | "completed" | "uncompleted";
const TodoFilterContext = createContext<{
    filter: Filter
    setFilter: Dispatch<SetStateAction<Filter>>
} | null >(null)


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

export function useTodoFilter() {
  const context = useContext(TodoFilterContext);
  if (context === null) {
    throw new Error("useTodoFilter must be used within TodoProvider");
  }
  return context;
}


interface Props {
  children: ReactNode;
}

export function TodoProvider({ children }: Props) {
  const { todos, dispatch } = useTodo();
  const [filter, setFilter] = useState<Filter>('all')  
  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoFilterContext.Provider value={{filter, setFilter}}>
            {children}
        </TodoFilterContext.Provider>
    
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

