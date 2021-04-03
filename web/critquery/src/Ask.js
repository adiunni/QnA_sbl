import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputBase from '@material-ui/core/InputBase';
import {Helmet} from "react-helmet";
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
        background: 'transparent',
        padding: 15,
        "&:focus": {
            outline: 'none'
        }
    },
    tags: {
        border: '2px solid #999999',
        fontWeight: 900,
        margin: 5,
        padding: 0
    },
    container: {
        margin: 20,
        width: '100%'
    }
}));

export default function Ask(props) {
  const classes = useStyles();

  const [question, setQuestion] = useState(null);
  const [description, setDescription] = useState(null);
  const [tags, setTags] = useState([]);
  const [err, setErr] = useState([]);
  const [isloggedin,setisloggedin] = useState(localStorage.getItem("token")?true:false);

  function addTag(e) {
    if (e.charCode==13) {
        if (tags.length == 5) {
            throwErr("Maximum 5 Tags Allowed");
            return;
        }
        if (e.target.value.length==0) {
            throwErr("Tag length must be greater than 0");
            return;
        }
        setTags([...tags,e.target.value]);
        e.target.value="";
    }
  }

  function throwErr(msg) {
    setErr(e=>[...e,msg]);
    setTimeout(()=>setErr([]),3000);
  }

  function post() {
      var errctr = 0;
      if (!question && errctr++) throwErr("Title Required");
      if (!description && errctr++) throwErr("Description Required");
      if (errctr==0) {
          fetch("https://qna-sbl.herokuapp.com/api/q",{method: "POST", body: JSON.stringify({title: question, desc: description, tags: tags}), headers: {'Content-Type': "application/json", Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
              res.json().then(e => {
                  for (var x in e) {
                      for (var y in e[x]) {
                          throwErr(x+": "+e[x][y]);
                      }
                  }
              });
            }
        }).then(res => {
            window.location.href="/q/"+res.id;
        });
      }
  }

  useEffect(() => {
      if (!isloggedin) window.location.href="/login";
  },[]);

  return (
    <Grid container xs={10} className={classes.container}>
        <Grid item xs>
            <Helmet>
                <title>Ask Question</title>
            </Helmet>
            <Typography variant="h4" gutterBottom className={classes.heading}>Ask Question</Typography>
            <Paper elevation={3} variant="outlined" className={classes.container}>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400 }}>
                    <InputBase value={question} onChange={ (e) => setQuestion(e.target.value) } inputProps={{maxLength :150}} className={classes.question} placeholder="Question" />
                </Paper>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400 }}>
                    <TextareaAutosize value={description} onChange={ (e) => setDescription(e.target.value) } maxLength={30000} className={classes.question} boxShadow={3} rowsMin={6} placeholder="Description" />
                </Paper>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400 }}>
                    <InputBase onKeyPress={addTag} className={classes.question} inputProps={{maxLength :20}} placeholder="Tags" />
                </Paper>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400 }}>
                    {tags.map(tag => (
                        <Chip label={tag} variant="outlined" className={classes.tags} />
                    ))}
                </Paper>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400, background: 'rgba(255,0,0,0.1)', color: 'red', padding: 10, display: err.length>0?"block":"none" }}>
                    <ul>{err.map(e=><li>{e}</li>)}</ul>
                </Paper>
                <Button className={classes.post} onClick={post}>POST</Button>
            </Paper>
        </Grid>
    </Grid>
  );
}