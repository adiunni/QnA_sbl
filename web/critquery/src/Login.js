import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 25
    },
    btn: {
        background: '#26a69a',
        color: 'white',
        textShadow: '1px 0 white',
        letterSpacing: 3,
        fontWeight: 700,
        padding: 9,
        margin: 10,
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
    },
    paper: {
        maxWidth: 400,
        margin: "auto",
        padding: 0,
        textAlign: "center",
        backgroundColor: "rgb(47,54,73)"
    },
    txt: {
        padding: 5,
        color: "white",
        marginLeft: 15,
        marginRight: 15
    },
    txtcont: {
        margin: 25,
        backgroundColor: "rgb(57,64,83)",
        borderRadius: 20,
        [theme.breakpoints.down('xs')]: {
            margin: 10
        }
    },
    boxtitle: {
        padding: 15,
        color: "rgb(157,164,183)",
        transition: "1s all"
    },
    div: {
        backgroundColor: "rgb(57,64,83)" 
    },
    btn: {
        backgroundColor: "rgb(57,64,83)",
        color: "rgb(157,164,183)",
        margin: 10,
        padding: 10
    }
}));

export default function Login(props) {
  const classes = useStyles();

  const [username,setUsername] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [repass,setrepass] = useState(null);
  const [fname,setfname] = useState(null);
  const [lname,setlname] = useState(null);
  const [err, setErr] = useState([]);
  const [show,setshow] = useState(false);
  const [mode,setmode] = useState(0);
  const [isloggedin,setisloggedin] = useState(localStorage.getItem("token")?true:false);

  function throwErr(msg) {
    setErr(e=>[...e,msg]);
    setTimeout(()=>setErr([]),3500);
  }

  function emailvalid(email) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  function signup() {
      var errctr = 0;
      setErr([]);
      if (!fname && errctr++) throwErr("First Name Required");
      if (!lname && errctr++) throwErr("Last Name Required");
      if (!username && errctr++) throwErr("Username Required");
      if (!password && errctr++) throwErr("Password Required");
      if (!repass && errctr++) throwErr("Repeat Password Required");
      if (password!=repass && errctr++) throwErr("Passwords Don't Match");
      if (!emailvalid(email) && errctr++) throwErr("Email Invalid");
      console.log(errctr)
      if (errctr==0) {
          fetch("https://qna-sbl.herokuapp.com/api/u",{method: "POST", body: JSON.stringify({first_name: fname, last_name: lname, username: username, email: email, password: password, password2: repass}), headers: {'Content-Type': "application/json"}}).then(res => {
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
              setmode(0);
          });
      }
  }

  function login() {
    var errctr = 0;
    setErr([]);
    if (!username && errctr++) throwErr("Username Required");
    if (!password && errctr++) throwErr("Password Required");
    console.log(errctr);
    if (errctr==0) {
        fetch("https://qna-sbl.herokuapp.com/api/login",{method: "POST", body: JSON.stringify({username: username, password: password}), headers: {'Content-Type': "application/json"}}).then(res => {
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
              localStorage.setItem("token",res.token);
              localStorage.setItem("user",username);
              setmode(0);
              window.location.href="/";
          });
    }
  }

  useEffect(() => {
    if (isloggedin) window.location.href="/";
  },[]);

  return (
    <Grid container xs={10} className={classes.container}>
        <Grid item xs>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Typography variant={mode==0?"h3":"subtitle1"} className={classes.boxtitle} style={{ flexGrow: 1 }} onClick={() => setmode(0)}>Log In</Typography>
                    <Typography variant={mode==1?"h3":"subtitle1"} className={classes.boxtitle} onClick={() => setmode(1)}>Sign Up</Typography>
                </Toolbar>
                {Array(5).fill(<Divider classes={{root: classes.div}} />)}
                <Paper variant="outlined" className={classes.txtcont}>
                    <InputBase className={classes.txt} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
                </Paper>
                <Paper variant="outlined" className={classes.txtcont} style={{ display: mode==0?"none":"block" }}>
                    <InputBase className={classes.txt} onChange={e => setfname(e.target.value)} placeholder="First Name"/>
                </Paper>
                <Paper variant="outlined" className={classes.txtcont} style={{ display: mode==0?"none":"block" }}>
                    <InputBase className={classes.txt} onChange={e => setlname(e.target.value)} placeholder="Last Name"/>
                </Paper>
                <Paper variant="outlined" className={classes.txtcont} style={{ display: mode==0?"none":"block" }}>
                    <InputBase className={classes.txt} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                </Paper>
                <Paper variant="outlined" className={classes.txtcont}>
                    <InputBase className={classes.txt} onChange={e => setPassword(e.target.value)} placeholder="Password" type={show?"text":"password"}/>
                </Paper>
                <Paper variant="outlined" className={classes.txtcont} style={{ display: mode==0?"none":"block" }}>
                    <InputBase className={classes.txt} onChange={e => setrepass(e.target.value)} placeholder="Repeat Password" type={show?"text":"password"}/>
                </Paper>
                <Paper elevation={3} variant="outlined" style={{ margin: 20, maxWidth: 400, background: 'rgba(255,0,0,0.1)', color: 'red', padding: 10, display: err.length>0?"block":"none" }}>
                    {err.map(e => <li>{e}</li>)}
                </Paper>
                <Toolbar>
                    <Switch color="default" onChange={() => setshow(!show)}/>
                    <Typography variant="subtitle1" className={classes.boxtitle}>Show Password</Typography>
                </Toolbar>
                <Button className={classes.btn} style={{ display: mode==1?"none":"" }} onClick={login}>Login</Button>
                <Button className={classes.btn} style={{ display: mode==0?"none":"" }} onClick={signup}>Sign Up</Button>
            </Paper>
        </Grid>
    </Grid>
  );
}