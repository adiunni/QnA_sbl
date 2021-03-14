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

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 25
    },
    post: {
        background: '#26a69a',
        color: 'white',
        textShadow: '1px 0 white',
        letterSpacing: 3,
        fontWeight: 700,
        margin: 20,
        "&:hover": {
            background: '#26a69a'
        }
    },
    question: {
        border: 'none',
        margin: 0,
        width: 375,
        background: 'transparent',
        padding: 15,
        "&:focus": {
            outline: 'none'
        }
    },
    container: {
        margin: 20
    }
}));

export default function Ask(props) {
  const classes = useStyles();

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Grid container xs={11} className={classes.container}>
        <Grid item xs>
            <Typography variant="h4" gutterBottom className={classes.heading}>Ask Question</Typography>
            <Paper elevation={3} variant="outlined" className={classes.container}>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400 }}>
                    <TextareaAutosize value={question} onChange={ (e) => setQuestion(e.target.value) } maxLength={600} className={classes.question} boxShadow={3} rowsMin={1} placeholder="Question" />
                </Paper>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400 }}>
                    <TextareaAutosize value={description} onChange={ (e) => setDescription(e.target.value) } maxLength={600} className={classes.question} boxShadow={3} rowsMin={6} placeholder="Description" />
                </Paper>
                <Button className={classes.post}>POST</Button>
            </Paper>
        </Grid>
    </Grid>
  );
}