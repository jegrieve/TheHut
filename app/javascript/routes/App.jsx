import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../components/Homepage";
import Navbar from "../components/Navbar";

const Routes = () => {
  const [currentUser, setCurrentUser] = useState({});


  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Homepage} />
      </Switch>
    </Router>
  );
};

export default Routes;
  
  
