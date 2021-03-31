import React, { useEffect, useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        background: 'rgb(47,54,73)'
    },
    logo: {
        height: 40,
        width: 40,
        margin: 15,
        [theme.breakpoints.down('xs')]: {
            margin: 5
        }
    },
    title: {
        color: 'white',
        margin: 15,
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    search: {
        color: 'white',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
    searchContainer: {
        margin: 15,
        background: 'rgb(17,24,43)',
        borderRadius: 20,
        [theme.breakpoints.down('xs')]: {
            margin: 10
        }
    },
    menubar: {
        "& .MuiPaper-root": {
            backgroundColor: "rgb(17,24,43)",
            color: 'white'
        }
    },
    link: {
        color: "white",
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

export default function Header() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar,setavatar] = useState(Math.random());
  const [user,setuser] = useState(localStorage.getItem("user") || "");
  const [isloggedin,setisloggedin] = useState(localStorage.getItem("token")?true:false);

  function showMenu(e) {
      setAnchorEl(e.currentTarget);
  }

  function closeMenu() {
      setAnchorEl(null);
  }

  function logout() {
    fetch("https://qna-sbl.herokuapp.com/api/u/logout",{method: "POST", headers: {'Content-Type': "application/json", Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
        localStorage.removeItem("token");
        window.location.reload();
    });
  }

  return (
    <AppBar position="static" className={classes.header}>
        <Toolbar>
            <Link href="/">
                <Avatar alt="CritQuery" src="/logo512.png" className={classes.logo} />
            </Link>
            <Typography variant="h5" gutterBottom className={classes.title}>CritQuery</Typography>
            <div style={{flexGrow: 1}}></div>
            <Paper component="form" className={classes.searchContainer}>
                <InputBase className={classes.search} placeholder="Search"/>
            </Paper>
            <Avatar alt="User Avatar" src={"https://avatars.dicebear.com/api/male/"+avatar+".png"} className={classes.logo} onClick={showMenu} />
            <Menu id="menu-appbar" onClose={closeMenu} anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={Boolean(anchorEl)} className={classes.menubar} >
                <Link href="/login" className={classes.link} style={{ display: isloggedin?"none":"" }}><MenuItem>Login</MenuItem></Link>
                <Link href={"/u/"+user} className={classes.link}><MenuItem>View Profile</MenuItem></Link>
                <MenuItem>Settings</MenuItem>
                <MenuItem style={{ display: isloggedin?"":"none" }} onClick={logout}>Log out</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
  );
}