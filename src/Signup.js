import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

var background = {
    width: `100%`,
    height: `100vh`,
    backgroundImage: `url(${require("./images/"+Math.ceil(Math.random() * 12)+".jpg")})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0
};

var signupcss = { 
    paddingTop: '12%', 
    paddingLeft:'72%', 
    paddingRight:'12%', 
    height: '50vh' 
}

const CssTextField = withStyles({
    root: {
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
      },
    },
})(TextField);

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
	},
	typography: {
        useNextVariants: true,
        fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
    },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function Signup(props) {
	const classes = useStyles();
	const history = useHistory();
	
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const usernameHelperText = () => {
        console.log(username)
        if(username === ''){
            return ''
        }
        else if(!username.match(/^[A-Z][a-z]+$/)){
            return 'Username needs to be in title case format. eg. John'
        }
        else if(username.length < 4){
            return 'Username should consists of minimum 4 alphabets'
        }
    }

    const editPasswordField = () => {
        if(username.match(/^[A-Z][a-z]+$/)){
            return false
        } 
        else{
            return true
        }
    }

    const confirmPasswordField = () => {
        if(password.length > 3){
            return false
        }
        else{
            return true
        }
    }

    const confirmPasswordHelperText = () => {
        if((confirmPassword === '') || (confirmPassword === password)){
            return ''
        }
        else{
            return 'Password mismatch'
        }
    }

    const passwordMatch = () => {
        if(password.length > 3 && password === confirmPassword){
            return false
        }
        else{
            return true
        }
    }

	const signup = () => () => {
		axios.post(`http://localhost:5000/signup`, { username, password })
		.then(res => {
            console.log(res.data)
			if(res.status === 200 && res.data.token){
                props.setToken(res.data.token)
				return history.push({
					pathname: '/list',
					state: { token: res.data.token }
				})
			}
		})
		.catch(e=>{
			setUsername('') 
			setPassword('')
			alert('Signup failed. Username already exists.')
		})
	}

	return (
		<div className="Background" style={ background }>
			<div className="Signup" style={ signupcss }>
				<div style={{backgroundColor: 'black', height: '50vh', borderRadius: '20px'}}>
					<ThemeProvider theme={darkTheme}>
						<Typography variant="h2" gutterBottom style={{color: 'white', textAlign: 'center', paddingTop: '9%', fontSize: '2vw'}}>Sign Up</Typography>
						<Divider style={{backgroundColor: 'white'}} />
						<form className={classes.root} style={{paddingLeft: '20%', paddingTop: '10%'}} noValidate autoComplete="off">
							<CssTextField className={classes.margin} id="username" label="Username" InputLabelProps={{style: { color: 'grey' } }} style={{width: '70%'}} value={username} onChange={ e=> setUsername(e.target.value) } error helperText={usernameHelperText()} />
							<CssTextField disabled={editPasswordField()} className={classes.margin} type="password" id="password" label="Password" InputLabelProps={{style: { color: 'grey' } }} style={{width: '70%'} } value={password} onChange={e=> setPassword(e.target.value) } />
                            <CssTextField disabled={confirmPasswordField()} className={classes.margin} type="password" id="confirmPassword" label="Confirm Password" InputLabelProps={{style: { color: 'grey' } }} style={{width: '70%'} } value={confirmPassword} onChange={e=> setconfirmPassword(e.target.value) } error helperText={confirmPasswordHelperText()} />
							<div style={{paddingLeft: '18%', paddingTop: '15%', width: '60%'}}>
								<Button disabled={passwordMatch()} style={{ width : '60%', backgroundColor:'grey' }} onClick={signup()}>Sign Up</Button>
							</div>
						</form>
					</ThemeProvider>
				</div>
			</div>
		</div>
	);
}

export default Signup