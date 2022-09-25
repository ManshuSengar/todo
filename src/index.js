import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';


class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskdec:''
        }
    }
    handletextchange(e){
       let dec=e.target.value;
       this.setState({
        taskdec:dec
    }
);
    }
    handleAddTaskOnClick(e){
        this.props.getnewtask(this.state.taskdec);
        this.setState({
            taskdec:''
        }
    );
    }
    render(){
        return(
            <form>
                <input type='text' value={this.state.taskdec} onChange={(e)=>this.handletextchange(e)}/>
                <input type='button' value="Add Task" onClick={(e)=>this.handleAddTaskOnClick(e)}/>
            </form>
        )
    } 
}

class TaskList extends React.Component{
    constructor(props){
        super(props);
    }
    handledonetask(desc){
     this.props.handledonefinishedtask(desc)
    }
    render(){
        let list=[];
        for(let i=0;i<this.props.tasks.length;i++){
            let task=this.props.tasks[i];
            var spancation;
            if (!task.isFinished) {
                spancation=( <span onClick={()=>this.handledonetask(task.desc)} class="material-icons">done</span>)
             } 
             else {
                spancation=( <span onClick={()=>this.handledonetask(task.desc)} class="material-icons">delete</span>)
             }
            let listitem=(
                <li key={i}>
                    <span>
                        {task.desc}
                    </span>
                   {spancation}
                </li>
            );
            list.push(listitem);
        }
        return(
            <div className={this.props.forStyling}>
                <div>{this.props.purpose}</div>
                <ul>
                    {list}
                </ul>
                </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[{
            desc:'Switch off light',
            isFinished:false
            },
        {
            desc:'Turn on fan',
            isFinished:true
        },
    {
        desc:'Make tea',
        isFinished: false
    },
    {
        desc:'Make dinner',
        isFinished: true
    }
    ]
        }
    }
    handletasklist(task){
        let oldtasks=this.state.tasks.slice();
        oldtasks.push({
            desc:task,
            isFinished: false
        })
        this.setState({
            tasks:oldtasks
        })

    }
    AddDoneTask(task,val){
        debugger;
        let oldtasks=this.state.tasks.slice();
        let newtask=oldtasks.find(t => t.desc==task);
        newtask.isFinished=val;
        this.setState({
            tasks:oldtasks
        })
        
    }
    render(){
        let tasks=this.state.tasks;
        let todoTasks=tasks.filter(t => t.isFinished == false);
        let doneTasks = tasks.filter(t => t.isFinished == true);
        return(
       <>
       <div className='add-task'>
         <AddTask getnewtask={(task)=>this.handletasklist(task)}/>
        </div>
        <div className='task-lists'>
         <TaskList tasks={todoTasks} handledonefinishedtask={(task)=>this.AddDoneTask(task,true)}  purpose="Tasks to do" forStyling="todo"/>
         <TaskList tasks={doneTasks} handledonefinishedtask={(task)=>this.AddDoneTask(task,false)} purpose="Finished Task" forStyling="finished"/>
        </div>
       </>
        );
    }
}
ReactDOM.render(<App/>,document.getElementById("root"));