      
import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import {v4 as uuid} from 'uuid';
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    const newTask = {
      id:  tasks[tasks.length - 1] ?tasks[tasks.length - 1].id +1 : 1 ,
      title: newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const mirror = tasks;
    const idx = tasks.findIndex(element => element.id ===id);
    if(idx > -1) {
      mirror[idx].isComplete = true;
      console.log(`😎 ${new Date()} ~ file: TaskList.tsx ~ line 44 ~ handleToggleTaskCompletion ~ tasks`, tasks)

      setTasks([...mirror]);
    }
  }

  function handleRemoveTask(id: number) {
    const foundTask = tasks.findIndex(element => element.id === id);
    if (foundTask > -1){
      const slicedTasks = tasks.splice(foundTask +1, tasks.length + 1);
      console.log(`slicedTasks: `, slicedTasks)
      setTasks([...slicedTasks])
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}