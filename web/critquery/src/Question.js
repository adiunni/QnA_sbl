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

import Answers from './Answers';

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
        height: 40,
        width: 40,
        display: 'inline-block'
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
    }
}));

export default function Question(props) {
  const classes = useStyles();

  const [question, setQuestion] = useState(false);

  const [answer, setAnswer] = useState(localStorage.getItem("answer") || "");

  useEffect(() => {
      fetch("https://hopefulemptytransformations.theabbie.repl.co/q/"+props.match.params.id).then(x=>x.json()).then(setQuestion);
  },[]);

  return (
    <div>
        <Grid container className={classes.container}>
            <Grid item xs>
                <CircularProgress style={{ display: question?"none":"block", margin: "20px auto" }} />
                <Typography variant="h4" gutterBottom className={classes.heading}>{question?question.title:""}</Typography>
                <Typography variant="subtitle1" gutterBottom className={classes.description}>{question?question.description:""}</Typography>
                {question?Object.values(question.tags).map(tag => (
                    <Chip label={tag} variant="outlined" className={classes.tags} />
                )):""}
                {question?(
                    <Paper elevation={3} variant="outlined" className={classes.user}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Avatar alt="User Avatar" src={"https://avatars.dicebear.com/api/male/"+Math.random()+".png"} className={classes.avatar} />
                            </Grid>
                            <Grid xs className={classes.username}>
                                {question.op}
                            </Grid>
                        </Grid>
                    </Paper>
                ):""}
                { window.localStorage.setItem("answer",answer) }
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 300, display: question?"block":"none" }}>
                    <TextareaAutosize value={answer} onChange={ (e) => setAnswer(e.target.value) } maxLength={600} className={classes.answerBox} boxShadow={3} rowsMin={1} placeholder="Answer" />
                </Paper>
                <Button className={classes.post} style={{ display: question?"block":"none" }}>ANSWER</Button>
            </Grid>
            <Grid item xs={1} style={{ display: question?"block":"none" }}>
                <IconButton className={classes.arrow}>
                    <ArrowDropUpIcon fontSize="large" />
                </IconButton>
                <IconButton className={classes.arrow}>
                    <ArrowDropDownIcon fontSize="large" /> 
                </IconButton>
            </Grid>
        </Grid>
        {question?(
            <Answers answers={question.answers} />
        ):""}
    </div>
  );
}