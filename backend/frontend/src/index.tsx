import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import Admin from 'pages/AdminFeed/AdminFeed';
import RegisteredUsers from 'pages/RegisteredUsers/RegisteredUsers';
import AdminUserDocs from 'pages/AdminUserDocs/AdminUserDocs';
import reportWebVitals from 'reportWebVitals';
import Submission from 'pages/Submission/Submission';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import User from 'pages/UserFeed/UserFeed';
import Home from 'pages/HomePage/HomePage';
import Parameters from 'pages/Parameters/Parameters';
import PrivateRoute from 'routes/PrivateRoute';
import AdminRoute from 'routes/AdminRoute'
import Login from 'pages/Authentication/Login';
import Register from 'pages/Authentication/Register';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <PrivateRoute path="/user">
                    <User/>
                </PrivateRoute>
                <PrivateRoute path="/submissions/:id">
                    <Submission/>
                </PrivateRoute>

                <AdminRoute path="/admin">
                    <Admin/>
                </AdminRoute>

                <AdminRoute path="/parameters">
                    <Parameters/>
                </AdminRoute>

                <AdminRoute path="/users/:username/:id/submissions">
                    <AdminUserDocs/>
                </AdminRoute>
                <AdminRoute path="/users">
                    <RegisteredUsers/>
                </AdminRoute>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
