import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../components/Homepage";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ShowPost from "../components/ShowPost";
import ShowUser from "../components/ShowUser";
import CreateBoard from "../components/CreateBoard";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);

  if (currentUser) {
    console.log(`current user is ${currentUser.username}`)
  }

  useEffect(() => {
    const url = "/api/v1/sessions/index";
    fetch(url)
      .then(response => {
        if (response.ok && response) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setCurrentUser(response))
      .catch(() => console.log('no user'));
  }, [])

  return (
    <Router>
        <Navbar setCurrentUser = {setCurrentUser} currentUser = {currentUser} />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route
          exact
          path="/create-post"
          render={(props) => (
            <CreatePost
              {...props}
              currentUser={currentUser}
            />
          )}
        />
        <Route exact path={"/post/:id"} component = {ShowPost} />
        <Route exact path={"/user/:id"} component = {ShowUser} />
        <Route exact path={"/create-board"} component = {CreateBoard} />
      </Switch>
    </Router>
  );
};

export default Routes;
  
  
