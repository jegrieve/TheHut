import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../components/Homepage/Homepage";
import Navbar from "../components/Navbar/Navbar";
import CreatePost from "../components/CreateData/CreatePost";
import ShowPost from "../components/PostPage/ShowPost";
import ShowUser from "../components/UserPage/ShowUser";
import CreateBoard from "../components/CreateData/CreateBoard";
import ShowBoard from "../components/BoardPage/ShowBoard";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    getUserSession();
  }, [])
  
  const getUserSession = () => {
    const url = "/api/v1/sessions/index";
    fetch(url)
      .then(response => {
        if (response.ok) { 
          return response.json();
        }
        throw new Error("Could not login this user");
      })
      .then(response => setCurrentUser(response))
      .catch(() => setCurrentUser(null));
  }

  return (
    <Router>
        <Navbar setCurrentUser = {setCurrentUser} currentUser = {currentUser} />
      <div className = "app-page">
      <Switch>
      <Route
          exact
          path="/"
          render={(props) => (
            <Homepage
              {...props}
              currentUser={currentUser}
            />
          )}
        />
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
        <Route
          exact
          path="/post/:id"
          render={(props) => (
            <ShowPost
              {...props}
              currentUser={currentUser}
            />
          )}
        />
        <Route
          exact
          path="/user/:id"
          render={(props) => (
            <ShowUser
              {...props}
              currentUser={currentUser}
              setCurrentUser = {setCurrentUser}
            />
          )}
        />
        <Route
          exact
          path="/create-board"
          render={(props) => (
            <CreateBoard
              {...props}
              currentUser={currentUser}
            />
          )}
        />
        <Route
          exact
          path={"/board/:id"}
          render={(props) => (
            <ShowBoard
              {...props}
              currentUser={currentUser}
            />
          )}
        />
        <Route
          path="*"
          render={(props) => (
            <Homepage
              {...props}
              currentUser={currentUser}
            />
          )}
        />
      </Switch>
     </div>
    </Router>
  );
};

export default Routes;
  
  
