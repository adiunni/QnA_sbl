import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import timeSince from './timeSince';

const useStyles = makeStyles((theme) => ({
    heading: {
        paddingTop: 5,
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
    link: {
        textDecoration: 'none',
        color: 'black',
        "&:hover": {
            textDecoration: 'none'
        }
    },
    answer: {

    },
    container: {
        padding: 15,
        width: "100%"
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
    }
}));

export default function Answers(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [choice, setChoice] = useState(1);

  const [me, setme] = useState(localStorage.getItem("user") || "");

  const handleChange = (e) => {
    setOpen(false);
    setChoice(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteAnswer(id) {
    fetch("https://qna-sbl.herokuapp.com/api/a/"+id,{method: "DELETE", headers: {'Content-Type': "application/json", Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
        window.location.href="/";
    });
  }

  return (
    <div>
        <Toolbar>
            <Typography variant="h4" gutterBottom className={classes.heading}>Answers</Typography>
            <FormControl className={classes.formControl}>
            <InputLabel id="sort">Sort By</InputLabel>
            <Select labelId="sort" open={open} onOpen={() => setOpen(true)} onClose={handleClose} value={choice} onChange={handleChange}>
                <MenuItem value={0}>Votes</MenuItem>
                <MenuItem value={1}>Newest</MenuItem>
                <MenuItem value={2}>Oldest</MenuItem>
            </Select>
            </FormControl>
        </Toolbar>
        <List className={classes.list}>
            {Object.values(props.answers).map(a => (
                <ListItem>
                    <Paper elevation={3} variant="outlined" className={classes.container}>
                        <Grid container spacing={3} className={classes.body}>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1" gutterBottom className={classes.answer}>{a.text}</Typography>
                                <Chip label={timeSince(a.updated_at) + " ago"} variant="outlined" className={classes.tags} style={{ backgroundColor: "lightgrey" }} />
                                {(a.user==me)?(<IconButton aria-label="delete" onClick={() => deleteAnswer(a.id)}><DeleteIcon /></IconButton>):""}
                                <Paper elevation={3} variant="outlined" className={classes.user}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <Avatar alt="User Avatar" src={"https://avatars.dicebear.com/api/male/"+a.user+".png"} className={classes.avatar} />
                                        </Grid>
                                        <Grid xs className={classes.username}>
                                            <Link href={"/u/"+a.user} className={classes.link}>{a.user}</Link>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton className={classes.arrow}>
                                    <ArrowDropUpIcon fontSize="large" />
                                </IconButton>
                                <IconButton className={classes.arrow}>
                                    <ArrowDropDownIcon fontSize="large" /> 
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </ListItem>
            ))}
        </List>
    </div>
  );
}