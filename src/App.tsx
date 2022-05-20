import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import { ITask } from './Interfaces';
import TodoTask from './components/TodoTask';

const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(Number(''));
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log('EventNAme', event.target.value);
    if (event.target.name === 'task') {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    setTask('Empty');
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      }),
    );
  };

  return (
    <div className='App'>
      <div className='header'>
        <div className='inputContainer'></div>
        <input
          defaultValue={task}
          type='text'
          name='task'
          placeholder='Task...'
          onChange={handleChange}
        />
        <input
          defaultValue={deadline}
          type='number'
          name='deadline'
          placeholder='Deadline (in Days)...'
          onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todList'>
        {todoList.map((task: ITask, key: number) => {
              if(key <= 7) {
                return  <TodoTask key={key} task={task} completeTask={completeTask} />
            }
        })}
      </div>
    </div>
  );
};

export default App;
