import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';

class AddTask extends Component {

checkOnClick(){
    var content = $("#content").val();
    var expire_time = $("#expire_time").val();         
    var priority = $("input[name='prio']:checked").val();
    //console.log(content+"  "+expire_time+"  "+typeof(parseInt(priority)));
    //alert(content+"  "+expire_time+"  "+typeof(parseInt(priority)));
    if(content!==undefined)
        {this.props.taskCallbacks.add(content,expire_time,parseInt(priority))}
    
}
render(){
    return (
        <div>
        <form className="form-horizontal add-task" id="add" role="form">
            <div className="form-group">
                <div className="col-sm-12">
                    <input type="text" className="form-control" id="content" placeholder="请输入新任务"/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-2">
                    <button type="button" className="btn btn-danger" onClick={this.checkOnClick.bind(this)}>
                        <span className="glyphicon glyphicon-plus">Add task</span>
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
    )}
}

export default AddTask;