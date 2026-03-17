import React, { useState } from 'react'
import { useTodoDispatch } from '../context/TodoContext'


// interface Props {
//     onAdd: (text: string) => void
// }

const TodoInput = () => {
  // useContext
  const dispatch = useTodoDispatch()

  // 1. 收集input的数据
  const [text, setText] = useState('')
  const handleAdd = () => {
    const value = text.trim()
    if(!text.trim()) return
    dispatch({type: 'add', payload: value})
    setText('') // 置空
  }
  // 2. 点击btn后将数据传给onAdd（）
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleAdd}
        onKeyDown={(e) => {
          if (e.key === "Enter") {handleAdd()}}}>
        Add
      </button>
    </div>
  );
}

export default TodoInput
