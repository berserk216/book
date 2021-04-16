import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookDetailPage from './pages/BookDetailPage'
import ReadingPage from './pages/ReadingPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PublicNavbar from './pages/PublicNavbar'
import AlertMsg from "./components/alertmsg";

function App() {
  return (
    <Router>
    <PublicNavbar />
    <AlertMsg/>
    <Switch>
      <Route exact path="/books/:id" component={BookDetailPage} />
      <Route exact path="/reading" component={ReadingPage} />
      <Route exact path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
  );
}

export default App;
