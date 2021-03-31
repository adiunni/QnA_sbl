import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
  const [avatar,setavatar] = useState(Math.random());

  useEffect(() => {
      fetch("https://qna-sbl.herokuapp.com/api/u/"+props.match.params.id).then(x=>x.json()).then(setuserdetails);
  },[]);

  return (
    <div>
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <CircularProgress style={{ display: userdetails?"none":"block", margin: "20px auto" }} />
                <Toolbar>
                    <Typography variant="h4" className={classes.username}>{userdetails?userdetails.username:""}</Typography>
                    <Paper elevation={3} variant="outlined">
                        <img alt="User Avatar" style={{ display: userdetails?"block":"none" }} src={"https://avatars.dicebear.com/api/male/"+avatar+".png"} className={classes.avatar} />
                    </Paper>
                </Toolbar>
                <Toolbar>
                    {userdetails?"Member Since: " + new Date(+userdetails.joined).toGMTString():""}
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