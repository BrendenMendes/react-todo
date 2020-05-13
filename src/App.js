import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Tasks from './Tasks'
import axios from 'axios'

class App extends Component {

	state = {
        token : '',
        username : '',
        list : [],
        addItem : ''
    }
	
	setToken = (token) => {
		console.log(token)
		this.setState({token : token})
	}

	setList = (list) => {
		this.setState({list : list})
	}

    setStatus = (id) => {
		this.setState({ list : this.state.list.map(item=>{
            if(item.id === id){
                item.completed = !item.completed  
            }
			return item
		})})
		axios.post(`http://localhost:5000/status`, { id }, { headers: { 'Authorization': `Bearer ${this.state.token}`} })
		.then(res => {
			console.log(res);
		})
    }
    
    addItem = () => {
        axios.post(`http://localhost:5000/add`, { item : this.state.addItem }, { headers: { 'Authorization': `Bearer ${this.state.token}`} })
        .then(res => {
            console.log(res);
			this.setState({list : [res.data, ...this.state.list], addItem : ''})
			console.log(this.state)
		})
	}

    addTask = (item) => {
        this.setState({ addItem : item })
    }

    delItem = (id) => {
        this.setState( {list : this.state.list.filter((items)=>{ 
			return items.id !== id
		})})
		axios.post(`http://localhost:5000/delete`, { id }, { headers: { 'Authorization': `Bearer ${this.state.token}`} })
		.then(res => {
			console.log(res);
		})
    }
		
	render(){
		console.log(this.state)
		return(
			<Router>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/signup' render={()=>(
					<Signup setToken={this.setToken} />
				)} />
				<Route exact path='/login' render={()=>(
					<Login setToken={this.setToken} />
				)} />
				<Route exact path='/list' render={()=>(
					this.state.token ? 
					(<Tasks setToken={this.setToken} setList={this.setList} list={this.state.list} setStatus={this.setStatus} addItem={this.addItem} addTask={this.addTask} delItem={this.delItem} />) :
					(<Redirect to='/' />)
				)} />
			</Router>
		)
	}
}

export default App;
