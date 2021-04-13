import CourseManager from "./components/course-manager";
import {BrowserRouter, Link, Route} from "react-router-dom";
import Home from "./components/home"
import QuizzesList from './components/quizzes/quizzes-list';
import Quiz from './components/quizzes/quiz';
import React from 'react';

function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid">
            <Route path="/" exact={true}>
                <Home/>
            </Route>
            <Route path="/courses/:layout">
                <CourseManager/>
            </Route>
            <Route path="/courses/:courseId/quizzes" exact={true}>
                <QuizzesList/>
            </Route>
            <Route path="/courses/:courseId/quizzes/:quizId" exact={true}>
                <Quiz/>
            </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
