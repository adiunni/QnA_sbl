import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';

import Answers from './Answers';
import timeSince from './timeSince';
import voter from './voter';

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
    },
    link: {
        textDecoration: "none",
        color: "black",
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

export default function Question(props) {
  const classes = useStyles();

  const [question, setQuestion] = useState(false);

  const [answer, setAnswer] = useState(localStorage.getItem("answer") || "");

  const [me, setme] = useState(localStorage.getItem("user") || "");

  const [isloggedin,setisloggedin] = useState(localStorage.getItem("token")?true:false);

  useEffect(() => {
      fetch("https://qna-sbl.herokuapp.com/api/q/"+props.match.params.id).then(x=>{ 
        if (!x.ok) window.location.href="/";
        return x.json()
      }).then(setQuestion);
  },[]);

  function post() {
    fetch("https://qna-sbl.herokuapp.com/api/a",{method: "POST", body: JSON.stringify({text: answer, question: props.match.params.id}), headers: {'Content-Type': "application/json", Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
        if (res.ok) {
            return res.json();
        }
        else {
          res.json().then(e => {
              console.log(e);
          });
        }
    }).then(res => {
        setAnswer("");
        window.location.reload();
    });
  }

  function deleteQuestion() {
    if (!window.confirm("Are you sure?")) return;
    fetch("https://qna-sbl.herokuapp.com/api/q/"+props.match.params.id,{method: "DELETE", headers: {'Content-Type': "application/json", Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
        window.location.href="/";
    });
  }

  function Image(props) {
    return <img {...props} style={{maxWidth: '100%'}} />
  }

  function Code({language, value}) {
    return <SyntaxHighlighter style={docco} language={language} children={value} />
  }

  function RouterLink(props) {
    return <Link to={props.href}>{props.children}</Link>
  }

  return (
    <div>
        <Helmet>
            <title>{ question?question.question.title:"CritQuery - Where Curiosity Ends" }</title>
        </Helmet>
        <Grid container className={classes.container}>
            <Grid item xs>
                <CircularProgress style={{ display: question?"none":"block", margin: "20px auto" }} />
                <Typography variant="h4" gutterBottom className={classes.heading}>{question?question.question.title:""}</Typography>
                <Markdown source={question?question.question.desc:""} renderers={{image: Image, code: Code, link: RouterLink}} />
                {question?Object.values(question.question.tags).map(tag => (
                    <Chip label={tag} variant="outlined" className={classes.tags} />
                )):""}
                {question?<Chip label={timeSince(question.question.updated_at) + " ago"} variant="outlined" className={classes.tags} style={{ backgroundColor: "lightgrey" }} />:""}
                {(question && question.question.user==me)?(<IconButton aria-label="delete" onClick={deleteQuestion}><DeleteIcon /></IconButton>):""}
                {question?(
                    <Paper elevation={3} variant="outlined" className={classes.user}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Avatar alt="User Avatar" src={"https://avatars.dicebear.com/api/male/"+question.question.user+".png"} className={classes.avatar} />
                            </Grid>
                            <Grid xs className={classes.username}>
                                <Link href={"/u/"+question.question.user} className={classes.link}>{question.question.user}</Link>
                            </Grid>
                        </Grid>
                    </Paper>
                ):""}
                { window.localStorage.setItem("answer",answer) }
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 300, display: question?"block":"none" }}>
                    <TextareaAutosize value={answer} onChange={ (e) => setAnswer(e.target.value) } maxLength={30000} className={classes.answerBox} boxShadow={3} rowsMin={1} disabled={!isloggedin} placeholder="Answer" />
                </Paper>
                <Button className={classes.post} style={{ display: question?"block":"none" }} onClick={post} disabled={!isloggedin}>ANSWER</Button>
            </Grid>
            <Grid item xs={1.5} style={{ display: question?"block":"none" }}>
                <IconButton className={classes.arrow} onClick={() => voter.upvoteQuestion(question?question.question.id:"")}>
                    <ArrowDropUpIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ margin: 0 }}>
                    {question?question.sum_rating:""}
                </IconButton>
                <IconButton className={classes.arrow} onClick={() => voter.dowvoteQuestion(question?question.question.id:"")}>
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