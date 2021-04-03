import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import timeSince from './timeSince';
import voter from './voter';

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
        padding: 0,
        cursor: "pointer"
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
    }
}));

export default function Questions(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [choice, setChoice] = useState(1);

  const [questions, setQuestions] = useState(false);

  useEffect(() => {
      if (props.questions) {
          setQuestions(props.questions);
          return;
      }
      fetch("https://qna-sbl.herokuapp.com/api/q").then(x=>x.json()).then(setQuestions);
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
                <div>
                    <ListItem>
                        <Grid container spacing={3} className={classes.body}>
                            <Grid item xs={10}>
                                <Link className={classes.link} href={"/q/"+q.question.id}>
                                    <Typography variant="h5" gutterBottom className={classes.question}>{q.question.title}</Typography>        
                                </Link>
                                {Object.values(q.question.tags).map(tag => (
                                    <Link href={"/s/"+tag}>
                                        <Chip label={tag} variant="outlined" className={classes.tags} />
                                    </Link>
                                ))}
                                <Chip label={timeSince(q.question.updated_at) + " ago"} variant="outlined" className={classes.tags} style={{ backgroundColor: "lightgrey" }} /> 
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton className={classes.arrow} onClick={() => voter.upvoteQuestion(q.question.id)}>
                                    <ArrowDropUpIcon fontSize="large" />
                                </IconButton>
                                <IconButton style={{ margin: 0 }}>
                                    {q.sum_rating}
                                </IconButton>
                                <IconButton className={classes.arrow} onClick={() => voter.downvoteQuestion(q.question.id)}>
                                    <ArrowDropDownIcon fontSize="large" /> 
                                </IconButton>
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