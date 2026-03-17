import React, { act, useEffect, useReducer } from 'react'
import type { Todo } from '../types/todo';

export type Action =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "toggle"; payload: number }
  | { type: "edit"; payload: {id: number; text: string} };

function reducer (state: Todo[], action: Action) :Todo[] {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: Date.now(), text: action.payload, completed: false },
        ];
      case "remove":
        return state.filter((todo) => todo.id !== action.payload);
      case "toggle":
        return state.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        );
      case "edit":
        return state.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text  }
            : todo,
        );
      default:
        return state;
    }
}


export const useTodo = () => {
  // ()=> {
  //      读取本地仓库里的todos数据
  //     const stored = localStorage.getItem('todos')
  //     return stored? JSON.parse(stored): []
  //   }
    const [todos, dispatch] = useReducer(reducer, [], ()=> {
      try {
        const stored = localStorage.getItem('todos')
      return stored? JSON.parse(stored): []
      } catch {
        return []
      }
    })

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
  return {todos, dispatch}
}



