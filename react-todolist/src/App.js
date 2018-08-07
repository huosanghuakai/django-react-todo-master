import React, { Component, PropTypes } from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update'
import 'whatwg-fetch';
import 'babel-polyfill'

const API_URL = "http://127.0.0.1:8000/";
const API_HEADERS={
  'accept':'application/json',
};
let id=36;
class App extends Component{
  constructor() {
    super(...arguments);
    this.state = {
      tasks:[]
    };
  }

  componentDidMount(){
    fetch(API_URL+'myapp/',{
        method: "GET",
        mode: "cors",
        headers: API_HEADERS
    })
    .then((response)=>response.json())
    .then((responseData)=>{
      this.setState({tasks:responseData});
      window.state=this.state;
    });
  }
  ID2(prefix) {
    return (prefix || '') + new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
  }
  
  addTask(content,expire_date,priority){
    id+=1;
    let prevState = this.state;
    let newTask={task_id:id,content:content,status:false,expire_date:'2015-08-01',priority:priority};
    let nextState=update(this.state.tasks,{$push:[newTask]});
    //alert(JSON.stringify(nextState));
    fetch(API_URL+'myapp/',{
      method:'POST',
      mode:'cors',
      headers:API_HEADERS,
      body:JSON.stringify(newTask)
    })
    .then((response)=>{
       console.log(response);
      if(response.ok){
        this.setState({tasks:nextState});
        console.log("response.ok");
        return response.json()
      }else{
        console.log("Server response wasn't OK");
        throw new Error("Server response wasn't OK")
      }
    })
    .then((responseData)=>{
      console.log("responseData");
      newTask.id=responseData.task_id;
      this.setState({tasks:nextState})
    }).catch((error)=>{
      console.log("prevState");
      this.setState(prevState);
    });
  }
  
  deleteTask(taskId){
    let prevState =this.state;
    let taskIndex=this.state.tasks.findIndex((task)=>task.task_id===taskId);
    
    //alert(this.state.tasks[0]);
    let nextState=update(this.state.tasks,{$splice:[[taskIndex,1]]});
    this.setState({tasks:nextState});
    
    fetch(API_URL+'myapp/'+taskId+'/',{
          method:'delete',
          mode:'cors',
          headers:API_HEADERS
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Server response wasn't OK");
      }
    }).catch((error)=>{
      console.error("Fetch error:",error);
      this.setState(prevState);
    });
  }
  
  toggleTask(taskId){
    let prevState=this.state;
    let taskIndex=this.state.tasks.findIndex((task)=>task.task_id===taskId);
    //alert(taskIndex);
    let task=this.state.tasks.filter((task)=>task.task_id===taskId);
    let updateTask=task[0];
    let newDoneValue;
    let nextState=update(this.state.tasks,{
        [taskIndex]:{status:{$apply:(done)=>{
                    newDoneValue=!done;
                    return newDoneValue;
                }
            }
        }
    });
    updateTask['status']=newDoneValue;
    //alert(JSON.stringify(updateTask));
    this.setState({tasks:nextState});
    fetch(API_URL+'myapp/'+taskId+'/',{
      method:'put',
      mode:'cors',
      headers:API_HEADERS,
      body:JSON.stringify(updateTask)
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Server response wasn't OK");
      }
    }).catch((error)=>{
      console.error("Fetch error:",error);
      this.setState(prevState);
    });
  }
  
  editTask(taskId,expire_time,content,priority){
    let prevState=this.state;
    let taskIndex=this.state.tasks.findIndex((task)=>task.task_id===taskId);
    let newTask={task_id:taskId,content:content,status:false,expire_date:expire_time,priority:priority};
    let nextState=update(this.state.tasks,{$splice:[[taskIndex,1,newTask]]});
    //alert(JSON.stringify(this.state.tasks));
    this.setState({tasks:nextState});
    //alert(JSON.stringify(nextState));
    fetch(API_URL+'myapp/'+taskId+'/',{
      method:'put',
      mode:'cors',
      headers:API_HEADERS,
      body:JSON.stringify(newTask)
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Server response wasn't OK");
      }
    }).catch((error)=>{
      console.error("Fetch error:",error);
      //this.setState(prevState);
    });
  }
  render() {
      
    return (<KanbanBoard tasks={this.state.tasks} taskCallbacks={{
        add:this.addTask.bind(this),
        toggle:this.toggleTask.bind(this),
        delete:this.deleteTask.bind(this),
        edit:this.editTask.bind(this),
    }}/>)
  }
}


export default App;
