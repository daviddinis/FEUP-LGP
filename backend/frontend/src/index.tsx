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

ReactDOM.render(
    <React.StrictMode>
        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
        <link href='http://fonts.googleapis.com/css?family=Ubuntu&subset=cyrillic,latin' rel='stylesheet'
              type='text/css'/>
        <link href='https://fonts.googleapis.com/css?family=Anaheim' rel='stylesheet'></link>
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

                <Route path="/users/:id/submissions">
                    <AdminUserDocs/>
                </Route>
                <Route path="/users">
                    <RegisteredUsers/>
                </Route>
                <Route path="/">
                    <User/>
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
