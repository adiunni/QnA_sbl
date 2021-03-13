import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Header';
import Body from './Body';

const useStyles = makeStyles((theme) => ({

}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <Body />
        </Route>
      </Switch>
  </Router>
    );
}