import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        paddingTop: 15,
        marginBottom: 20, 
        flexGrow: 1
    },
    list: {
        paddingLeft: 25,
    },
    arrow: {
        padding: 4,
        background: '#26a69a',
        color: 'white',
        margin: 0,
        "&:hover": {
            background: '#26a69a'
        }
    },
    question: {
        fontWeight: 900
    },
    tags: {
        border: '2px solid #999999',
        fontWeight: 900,
        margin: 5,
        padding: 0
    },
    divider: {
        background: '#BBBBBB',
        width: '90%',
        margin: 'auto'
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        "&:hover": {
            textDecoration: 'none'
        }
    },
    div: {
        marginTop: 10
    },
    avatar: {
        height: 100,
        width: 100
    }
}));

export default function Users(props) {
  const classes = useStyles();

  const [users, setusers] = useState(null);

  useEffect(() => {
      fetch("https://qna-sbl.herokuapp.com/api/u").then(x=>x.json()).then(setusers);
  },[]);

  return (
    <div>
        <Helmet>
            <title>Users</title>
        </Helmet>
        <CircularProgress style={{ display: users?"none":"block", margin: "20px auto" }} />
        <List className={classes.list}>
            {users?users.map(u => (
                <div>
                    <ListItem>
                        <Grid container spacing={3} className={classes.body}>
                            <Grid item xs={12}>
                                <Toolbar>
                                    <Paper elevation={3} variant="outlined" style={{ margin: 15 }}>
                                        <img alt={u.username} src={"https://avatars.dicebear.com/api/male/"+u.username+".svg"} className={classes.avatar} />
                                    </Paper>
                                    <Link href={"/u/"+u.username}>
                                        <Typography variant="h5">
                                            {u.first_name} {u.last_name} (@{u.username})
                                        </Typography>
                                    </Link>
                                </Toolbar>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid container spacing={3} className={classes.body}>
                            <Grid item xs={12}>
                                <Divider classes={{root: classes.div}} />
                            </Grid>
                        </Grid>
                    </ListItem>
                </div>
            )):""}
        </List>
    </div>
  );
}