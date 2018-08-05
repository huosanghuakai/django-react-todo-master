import React, {Component,PropTypes} from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';
class KanbanBoard extends Component {

render(){
  return (
    <div className='bg'>
        <div className='content'>
            <ul className="nav nav-pills nav-stacked left-menu">
				<li>
					<a href="#">View all</a>
				</li>
				<li>
					<a href="#">Expire time</a>
				</li>
				<li>
					<a href="#">Priority</a>
				</li>
			</ul>
          <div className="editor">
            <AddTask tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks}/>
            <TaskList tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks}/>
          </div>
        </div>
    </div>
  )
}
}

export default KanbanBoard;