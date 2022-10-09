import React, {useRef, useEffect, useState} from "react";
import Todo from "./Todo";
import Form from "./Form";
import FilterButton from "./FilterButton";
import {nanoid} from "nanoid";
import usePrevious from "../functions/usePrevious";

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home(props) {

    // useState Hooks
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isDark, setDark] = useState(false);
    // Theme Switcher Have a useState hook to keep track of theme state
    // isDark, setDark
    // create a CSS class in index.css for dark theme
    // I need a toggle
    // Conditionally render css class based on theme state
    // Where I need
    // About GitHub, make a nice readme.

    useEffect(() => {
        const data = localStorage.getItem('listOfTasks');
        if (data) {
            setTasks(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('listOfTasks', JSON.stringify(tasks));
    }, [tasks]); // Optimization




    function addTask(name) {
        const newTask = {id: `todo-${nanoid()}`, name, completed: false};
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    console.log(tasks);

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return {...task, name: newName}
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ));

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
    const headingText = `${taskList.length} ${tasksNoun} remaining`
    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);
    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength])
    return (
        <div className={isDark ? "todoapp-dark stack-large" : "todoapp stack-large"}>
            <label className = "switch">
                <input type="checkbox"
                       onClick={() => setDark(!isDark)}
                />
                <span className= "slider round"></span>
                <span className="labels" data-on="ON" data-off="OFF"></span>
            </label>
            <h1>TodoMatic</h1>
            <Form
                addTask={addTask}
                setTasks={setTasks}
            />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>

        </div>
    );
}

export default Home;