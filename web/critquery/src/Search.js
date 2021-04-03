import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function Search(props) {
  const classes = useStyles();

  const [query,setquery] = useState(props.match.params.query);
  const [results,setresults] = useState(null);

  useEffect(() => {
      fetch("https://qna-sbl.herokuapp.com/api/q/search?q="+props.match.params.query).then(x=>{
          if (!x.ok) window.location.href="/";
          return x.json()
      }).then(r=>{
          setresults(r.map(q=>({question: q, likes: 0, dislikes: 0, sum_rating: 0})));
      });
  },[]);

  return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Helmet>
                    <title>Search Results For {query}</title>
                </Helmet>
                <CircularProgress style={{ display: results?"none":"block", margin: "20px auto" }} />
                {results?<Questions questions={results} />:""}
            </Grid>
        </Grid>
  );
}