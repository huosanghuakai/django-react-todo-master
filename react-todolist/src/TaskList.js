import React, {Component} from 'react';
import './App.css';
import $ from 'jquery'
class TaskList extends Component {

checkOnClick(taskId){
    let modal = document.getElementById('myModal');
    let span = document.querySelector('.close');
    let save = document.querySelector('#edit');
    modal.style.display = "block";
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var content = document.getElementById("content").value;
    var expire_time = document.getElementById("expire_time").value;         
    var priority = $("input[name='prio']:checked").val();
    var flag=false;
    save.onclick = function() {
        flag=true;
        modal.style.display = "none";
    }
    if(flag)
        this.props.taskCallbacks.edit(taskId,expire_time,content,priority);
    
}

render(){
  let tasks = this.props.tasks.map((task) => (
            <tr>
				<td className="icon">
					<a href="#"><span className="glyphicon glyphicon-ok-circle" onClick={
                        this.props.taskCallbacks.toggle.bind(null,task.task_id)
                    }></span></a>
				</td>
				<td className="task-text" id={task.task_id}><span className="text">{task.content} {task.task_id}</span></td>
				<td className="icon">
					<a href="#" id={task.id}><span className="glyphicon glyphicon-edit" onClick={
                        this.checkOnClick.bind(this,task.task_id)}>
                    编辑</span></a>
				</td>
				<td className="icon">
					<a href="#"><span className="glyphicon glyphicon-remove-circle" onClick={
                        this.props.taskCallbacks.delete.bind(null,task.task_id)
                    }>删除</span></a>
				</td>
			</tr>
        ))
  return (
    <div className="task-editor">
		<table className="table">
        <tbody>
        {tasks}
        </tbody>
		</table>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>弹窗中的文本...</p>
            <form className="form-horizontal add-task" id="add" role="form">
            <div className="form-group">
                <div className="col-sm-12">
                    <input type="text" className="form-control" id="content" placeholder="请输入新任务"/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-2">
                    <button type="button" className="btn btn-danger" id="edit">
                        <span className="glyphicon glyphicon-plus" >Save task</span>
                    </button>
                </div>
                
                <div className="col-sm-10" id="priority">
                    <div className="radio options">
                        <label>Priority:</label>
                        <label>
                            <input name='prio' type="radio" value='1'/> 1 
                        </label>
                        <label>
                            <input name='prio' type="radio" value='2'/> 2 
                        </label>
                        <label>
                            <input name='prio' type="radio" value='3'/> 3 
                        </label>
                        <label>
                            <input name='prio' type="radio" value='4' defaultChecked/> 4 
                        </label>
                        <label>Expire date:
                            <input id='expire_time' type="date" value="2018-08-04"/>
                        </label>
                    </div>
                </div>
            </div>
        </form>
          </div>
        </div>
	</div>
  )}
}

export default TaskList;