import React, {useState} from 'react';
import './App.css';
import {List} from './List';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function changeCheckBox(id: string, value: boolean) {
        setTasks(tasks.map(el => el.id === id ? {...el, isDone: value} : el))
    }

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div className="App">
            <List title="What to learn"
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeCheckBox={changeCheckBox}
                  filter={filter}/>
        </div>
    );
}

export default App;
