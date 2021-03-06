import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";

// CRUD
// create +
// read ++
// update +
// delete +

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
type TaskStateType = {
    [todoLostId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })
    const removeTask = (taskID: string, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = tasks[todoListId].filter(el => el.id !== taskID)
        setTasks(copyTasks)
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        /*const copyTasks = {...tasks}
        copyTasks[todoListId] = [newTask, ...copyTasks[todoListId]]
        setTasks(copyTasks)*/
        //or
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})

    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]:
                tasks[todoListId].map(t => t.id === taskID ? {...t, title: title} : t)
        })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoList(todoLists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoList(todoLists.map(el => el.id === todoListId ? {...el, title: title} : el))
    }
    const removeTodolist = (todolistId: string) => {
        setTodoList(todoLists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    //UI:
    const todoListsComponents = todoLists.map(el => {
        let tasksForRender;
        switch (el.filter) {
            case "active":
                tasksForRender = tasks[el.id].filter(t => !t.isDone)
                break
            case "completed":
                tasksForRender = tasks[el.id].filter(t => t.isDone)
                break
            default:
                tasksForRender = tasks[el.id]
        }
        return (
            <Grid item key={el.id}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <TodoList
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={tasksForRender}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                        removeTodolist={removeTodolist}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className={'App'}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: 'space-between', backgroundColor: 'teal'}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
