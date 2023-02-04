import React,{useState} from 'react'
import "../stylesheets/Home.css"

export default function CreateTask() {
  const [task,setTask]=useState({
    title:"",
    detail:""
  })
  const [err,setErr]=useState("")
  const handleOnchange=(e)=>{
    setTask({...task,[e.target.name]:e.target.value})
  }
  async function createTaskBtn(e){
    document.title="Creating....."
    const userid=sessionStorage.getItem("userid")
    e.preventDefault();
    const {title,detail}=task
    if(title===""){
      return setErr("Title should be there")
    }
    const url='https://tender-foal-tunic.cyclic.app/api/task'
    const response=await fetch(`${url}/createtask:${userid}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        title:title,
        detail:detail,
        status:false
      })
    });
    const data=await response.json()
    document.title="Task Manager"
    if(data.message==="error"){
      setErr(data.error)
    }
    else{
      alert("Task Created Sucessfully")
      window.location.reload();
    }


  }
  return (
    <div className='createContainer'>
      <h1><span>T</span>ask <span>M</span>anager</h1>
      <h2>Create <a href="https://manishkulal.netlify.app/" target="noreferrer">your</a> task here 👇👇</h2>
        <form className='disflex-col'>
              <input type="text" name='title' placeholder='Title of the task' id='title' onChange={handleOnchange} value={task.title}/>
              <textarea type="text" rows="10" name='detail' placeholder='Description' id='desc' onChange={handleOnchange} value={task.detail}/>
              <p style={{color:"red"}}>{err}</p>
              <button type='submit' onClick={createTaskBtn}>Create</button>
        </form>
    </div>
  )
}
