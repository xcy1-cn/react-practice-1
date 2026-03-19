import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "completed" | "uncompleted";

type TodoStore = {
  todos: Todo[];
  filter: Filter;

  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;

  setFilter: (f: Filter) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: "all",

      addTodo: (text) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }],
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        })),

      editTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, text } : t)),
        })),

      setFilter: (filter) => set({ filter }),
    }),
    {
      name: "todo-storage",
      // partialize: 部分存储
      partialize: (state) => ({
        todos: state.todos,
        // filter: state.filter
      }),
    },
  ),
);
