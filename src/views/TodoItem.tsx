import React, { useState } from 'react'
import type { Todo } from '../types/todo'

interface Props {
  todo: Todo;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const TodoItem = React.memo(function TodoItem ({todo, onRemove, onToggle,onEdit}: Props){
  // 新增局部状态
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditText(todo.text);
      return;
    }

    const value = editText.trim();
    if (!value) return;

    onEdit(todo.id, value);
    setIsEditing(false);
  }
  // react。memo：浅比较(引用比较),如果props不稳定，则会导致失效
  // console.log("render item:", todo.id);
  // console.log(todo.completed);
  
  return (
    <div>
      {
        isEditing ? <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} /> : <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",marginRight: '30px'
        }}
      >
        {todo.text}
      </span>
      }
      <button onClick={() => onRemove(todo.id)}>删除</button>
      <button onClick={() => onToggle(todo.id)}>toggle</button>
      <button onClick={handleEdit}>{!isEditing? 'edit' : 'confirm'}</button>
    </div>
  );
})
export default TodoItem
