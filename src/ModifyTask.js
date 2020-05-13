import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752
    },
    demo: {
      backgroundColor: theme.palette.background.paper
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
}));

const changeStatus = (completed) => {
    return { color : 'white', textDecoration : completed ? 'line-through' : 'none' }
}

const ModifyTask = (props) => {
    const classes = useStyles();
    const { id, title, completed } = props.todo

    const handleCheckboxToggle = (id) => () => {
        props.status(id)
    };

    const handleDeleteToggle = (id) => () => {
        props.delItem(id)
    }

    return (
        <div className={classes.demo}>
            <List>
                {
                    <ListItem key={id} dense button onClick={handleCheckboxToggle(id)} divider>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={completed}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': id }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={title} style={changeStatus(completed)} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={handleDeleteToggle(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                }
            </List>
        </div>
    )
}

export default ModifyTask;
