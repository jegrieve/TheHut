import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../components/Homepage";
import Navbar from "../components/Navbar";

const Routes = () => {
  //So i will pass the setcurrentuser to the form
  //stuff in the navbar
  //then once we create/sign in a user we now
  //will keep track of the user here.

  //when exit app then reload we will have a
  //compountdidmount that will check db
  //for user based on the sessions cookie
  //if there is then we fetch and set that user
  //otherwise continue as normal.
  const [currentUser, setCurrentUser] = useState(null);
  
  if (currentUser) {
    console.log(`current user is ${currentUser.username}`)
  }

  return (
    <Router>
        <Navbar setCurrentUser = {setCurrentUser} currentUser = {currentUser} />
      <Switch>
        <Route path="/" exact component={Homepage} />
      </Switch>
    </Router>
  );
};

export default Routes;
  
  
