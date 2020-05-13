import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

function Homepage() {

	const classes = useStyles();
	const history = useHistory();

    return (
        <div className={classes.root}>
			<AppBar position="static" style={{ background: '#000' }}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>To Do List</Typography>
					<Button color="inherit" style={{backgroundColor: '#6a6b6f', margin:'1%'}} onClick={()=>{ history.push('/signup') }}>Sign Up</Button>
					<Button color="inherit" style={{backgroundColor: '#6a6b6f'}} onClick={()=>{ history.push('/login') }}>Login</Button>
				</Toolbar>
			</AppBar>
			<div className="Background" style={{ width: `100%`, height:'93vh', overflowY:'auto', backgroundImage: `url(${require("./images/"+Math.ceil(Math.random() * 12)+".jpg")})` }} >

			</div>
        </div>
    );
}

export default Homepage