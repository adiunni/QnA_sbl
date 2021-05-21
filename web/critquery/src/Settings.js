import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { List, ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 25
    },
    description: {
        marginLeft: 10
    },
    list: {
        paddingLeft: 25,
    },
    arrow: {
        padding: 4,
        background: '#26a69a',
        color: 'white',
        margin: 3,
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
    avatar: {
        height: 100,
        width: 100
    },
    user: {
        margin: 15,
        maxWidth: 150,
        padding: 5
    },
    username: {
        padding: 5,
        fontWeight: 900
    },
    post: {
        background: '#26a69a',
        color: 'white',
        textShadow: '1px 0 white',
        letterSpacing: 3,
        fontWeight: 700,
        marginLeft: 20,
        "&:hover": {
            background: '#26a69a'
        }
    },
    answerBox: {
        border: 'none',
        margin: 0,
        width: '90%',
        background: 'transparent',
        padding: 15,
        "&:focus": {
            outline: 'none'
        }
    },
    username: {
        flexGrow: 1
    },
    setting: {
        width: "90%",
        maxWidth: 500
    }
}));

export default function Settings(props) {
  const classes = useStyles();

  const [isloggedin,setisloggedin] = useState(localStorage.getItem("token")?true:false);

  useEffect(() => {
    if (!isloggedin) window.location.href="/login";
  },[]);

  return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Helmet>
                    <title>Settings</title>
                </Helmet>
                <List>
                    <ListItem>
                        <Toolbar className={classes.setting}>
                            <Typography variant="h6">
                                Hello World
                            </Typography>
                            <div style={{ flexGrow: 1 }} />
                            <Switch />
                        </Toolbar>
                    </ListItem>
                    <ListItem>
                        <Divider />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
  );
}