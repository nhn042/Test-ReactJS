import './NewTask.css';
import React, { useEffect, useState } from 'react';

function NewTask() {
    const storageTask = JSON.parse(localStorage.getItem('taskName'))
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toDateString());
    const [priority, setPriority] = useState('medium');
    const [toDoList, setToDoList] = useState(storageTask ?? [])
    const [search, setSearch] = useState('')
    
    const handleClick = () => {
        setToDoList([...toDoList, {
            taskName: taskName,
            description: description,
            dueDate: dueDate,
            priority: priority,
            showDetail: true
        }])
        setTaskName('');
        console.log(toDoList)
    }
    const deleteTodo = (i) => {
        var newList = toDoList;
        newList.splice(i,1);
        setToDoList([...newList]);
    }
    useEffect(() => {
        console.log(taskName, description, dueDate, priority)
    }, [taskName, description, dueDate, priority])

    return (
        <div className="panel">
            <div className="left-panel">
                <h2>New Task</h2>
                <input placeholder="Add new task..." onChange={event => setTaskName(event.target.value)} value={taskName} />
                <div>
                    <p>Description</p>
                    <textarea onChange={event => setDescription(event.target.value)} value={description}></textarea>
                </div>
                <div className="divide">
                    <div>
                        <p>Due Date</p>
                        <input type="date" onChange={event => setDueDate(event.target.value)} value={dueDate} />
                    </div>
                    <div>
                        <p>Priority</p>
                        <select onChange={event => setPriority(event.target.value)} value={priority} >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div className="btn-area">
                    <button onClick={handleClick}>
                        Add
                    </button>
                </div>
            </div>

            <div className="right-panel">
                <h2>To do list</h2>
                <div className="search-box">
                    <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}></input>
                </div>
                

                <ul>
                    {toDoList.map((e, isCompleted, i)=> {
                        return <li key={i}>
                            <div className="task">
                                <div className="check-box">
                                    <input type="checkbox"></input>
                                    <label>{e.taskName}</label>
                                </div>
                                <div className="task-btn">
                                    <button className="btn detail">Detail</button>
                                    <button className="btn remove" onClick={() => deleteTodo(i)}>Remove</button>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default NewTask;
