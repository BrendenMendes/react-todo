import React, { Component } from 'react';
import './Tasks.css';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import AddTask from './AddTask'
import RenderTasks from './RenderTasks';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

class Tasks extends Component{

    componentDidMount() {
        this.props.setToken(this.props.location.state.token)
        axios.post(`http://localhost:5000/fetch`, {}, { headers: { 'Authorization': `Bearer ${this.props.location.state.token}`} })
        .then(res => {
            console.log(res);
            this.props.setList(res.data)
        })
    }

    status = (id) => {
        this.props.setStatus(id)
    }
    
    addItem = () => {
        this.props.addItem()
    }

    addTask = (item) => {
        this.props.addTask(item)
    }

    delItem = (item) => {
        this.props.delItem(item)
    }
    
    render() {
        return(
            <ThemeProvider theme={theme}>
                <div className='AddTasksandList'>
                    <AddTask addItem={this.addItem} addTask={this.addTask} />
                    <div className="Background" style={{ width: `100%`, height:'93vh', overflowY:'auto', backgroundImage: `url(${require("./images/blurred.jpg")})` }} >
                        <div className='List' style={{paddingLeft: '25%', paddingRight: '25%'}}>
                            <RenderTasks list={this.props.list} status={this.status} delItem={this.delItem} />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

export default withRouter(Tasks);
