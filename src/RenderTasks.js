import React, { Component } from 'react'
import ModifyTask from './ModifyTask'

class RenderTasks extends Component{

    render() {
        return this.props.list.map((item)=>(
            <ModifyTask key={item.id} todo={item} status={this.props.status} delItem={this.props.delItem} />
        ))
    }
}

export default RenderTasks