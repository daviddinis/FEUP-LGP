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
import Login from 'pages/Authentication/Login';

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

                <PrivateRoute path="/admin">
                    <Admin/>
                </PrivateRoute>

                <PrivateRoute path="/parameters">
                    <Parameters/>
                </PrivateRoute>

                <PrivateRoute path="/users/:username/:id/submissions">
                    <AdminUserDocs/>
                </PrivateRoute>
                <PrivateRoute path="/users">
                    <RegisteredUsers/>
                </PrivateRoute>
                <Route path="/login">
                    <Login/>
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
