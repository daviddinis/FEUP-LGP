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
import Register from 'pages/Register/Register';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/user">
                    <User/>
                </Route>
                <Route path="/submissions/:id">
                    <Submission/>
                </Route>

                <Route path="/admin">
                    <Admin/>
                </Route>

                <Route path="/parameters">
                    <Parameters/>
                </Route>

                <Route path="/users/:username/:id/submissions">
                    <AdminUserDocs/>
                </Route>
                <Route path="/users">
                    <RegisteredUsers/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/">
                    <Register/>
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
