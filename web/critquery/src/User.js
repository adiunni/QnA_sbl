import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';

import Questions from './Questions';

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
    }
}));

export default function User(props) {
  const classes = useStyles();

  const [userdetails, setuserdetails] = useState(null);

  useEffect(() => {
      fetch("https://qna-sbl.herokuapp.com/api/u/"+props.match.params.id).then(x=>{
          if (!x.ok) window.location.href="/";
          return x.json()
      }).then(setuserdetails);
  },[]);

  return (
    <div>
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Helmet>
                    <title>{ userdetails?(userdetails.user.first_name+" "+userdetails.user.last_name+" (@"+userdetails.user.username+")"):"CritQuery - Where Curiosity Ends" }</title>
                </Helmet>
                <CircularProgress style={{ display: userdetails?"none":"block", margin: "20px auto" }} />
                <Toolbar>
                    <Typography variant="h4" className={classes.username}>{userdetails?userdetails.user.username:""}</Typography>
                    <Paper elevation={3} variant="outlined">
                        <img alt="User Avatar" style={{ display: userdetails?"block":"none" }} src={"https://avatars.dicebear.com/api/male/"+(userdetails?userdetails.user.username:"")+".svg"} className={classes.avatar} />
                    </Paper>
                </Toolbar>
                <Toolbar>
                    {userdetails?userdetails.user.first_name+" "+userdetails.user.last_name:""}
                </Toolbar>
            </Grid>
        </Grid>
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                {userdetails?<Questions questions={userdetails.questions} />:""} 
            </Grid>
        </Grid>
    </div>
  );
}