import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      },
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
})(TextField);

function AddTask(props) {
    console.log(props)
    const [open, setOpen] = React.useState(false);

    const displaySnackBar = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const classes = useStyles();

    const onChange = (e) => {
        props.addTask(e.target.value)
    }

    const add = () => () => {
        document.getElementById("outlined-basic").value = ''
        props.addItem()
        displaySnackBar()
    }
  
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" style={{paddingLeft : '25%', paddingTop: '10px', backgroundColor: 'black' }}>
                <CssTextField id="outlined-basic" label="Add item here" variant="outlined" onChange={onChange} style={{ width : '55%' }} />
                <Button variant="contained" onClick={add()} style={{ width : '10%', height : 54 }}>Add</Button>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Item Added!"
            />
        </div>
    );
}

export default AddTask;
