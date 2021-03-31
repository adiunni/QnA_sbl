import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Questions from './Questions';
import Question from './Question';
import Ask from './Ask';
import User from './User';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%'
    },
    sidebar: {
        paddingTop: 20,
        paddingLeft: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'row',
        }
    },
    ask: {
        background: '#26a69a',
        color: 'white',
        textShadow: '1px 0 white',
        letterSpacing: 3,
        fontWeight: 700,
        "&:hover": {
            background: '#26a69a'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        "&:hover": {
            textDecoration: 'none'
        }
    }
}));

export default function Body() {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.body}>
        <Grid item xs={1.5}>
                <List className={classes.sidebar}>
                    <ListItem>
                        <Button className={classes.ask} href="/ask">ASK</Button>
                    </ListItem>
                    <ListItem button>
                        <Link className={classes.link} href="/">Questions</Link>
                    </ListItem>
                    <ListItem button>
                        <Link className={classes.link} href="https://github.com/CharieBlastX7/QnA_sbl">GitHub</Link>
                    </ListItem>
                </List>
        </Grid>
        <Grid item xs>
            <Router>
                <Switch>
                    <Route path="/q/:id" component={Question} />
                    <Route path="/u/:id" component={User} />
                    <Route path="/login" component={Login} />
                    <Route path="/ask" component={Ask} />
                    <Route path="/" component={Questions} />
                </Switch>
            </Router>
        </Grid>
    </Grid>
  );
}