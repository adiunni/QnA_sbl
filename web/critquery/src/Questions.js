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
    }
}));

export default function Questions(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [choice, setChoice] = useState(1);

  const [questions, setQuestions] = useState(false);

  useEffect(() => {
      fetch("https://hopefulemptytransformations.theabbie.repl.co/questions").then(x=>x.json()).then(setQuestions);
  },[]);

  const handleChange = (e) => {
    setOpen(false);
    setChoice(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
        <Toolbar>
            <Typography variant="h4" gutterBottom className={classes.heading}>Questions</Typography>
            <FormControl className={classes.formControl}>
            <InputLabel id="sort">Sort By</InputLabel>
            <Select labelId="sort" open={open} onOpen={() => setOpen(true)} onClose={handleClose} value={choice} onChange={handleChange}>
                <MenuItem value={0}>Votes</MenuItem>
                <MenuItem value={1}>Newest</MenuItem>
                <MenuItem value={2}>Oldest</MenuItem>
            </Select>
            </FormControl>
        </Toolbar>
        <CircularProgress style={{ display: questions?"none":"block", margin: "20px auto" }} />
        <List className={classes.list}>
            {questions?questions.map(q => (
                <ListItem>
                    <Grid container spacing={3} className={classes.body}>
                        <Grid item xs={10}>
                            <Link className={classes.link} href={"/q/"+q.id}>
                                <Typography variant="body1" gutterBottom className={classes.question}>{q.title}</Typography>        
                            </Link>
                            {Object.values(q.tags).map(tag => (
                                <Chip label={tag} variant="outlined" className={classes.tags} />
                            ))}
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
                </ListItem>
            )):""}
        </List>
    </div>
  );
}