import { createBrowserRouter } from "react-router-dom";
import Error from "../../Error/Error";
import Main from "../../Layouts/Main/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTasks from "../../Pages/CompletedTasks/CompletedTasks";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyTasks from "../../Pages/MyTasks/MyTasks";
import UpdateTask from "../../Pages/UpdateTask/UpdateTask";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-task',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: '/my-tasks',
                element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>
            },
            {
                path: '/update/:id',
                element: <PrivateRoute><UpdateTask></UpdateTask></PrivateRoute>,
                loader: ({params})=> fetch(`https://smart-task-manager-tool-server.vercel.app/task/${params.id}`)
            },
            {
                path: '/completed-tasks',
                element: <PrivateRoute><CompletedTasks></CompletedTasks></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
])