import React,{useEffect} from 'react'
import CreateTask from './CreateTask'
import "../stylesheets/Home.css"
import TaskList from './TaskList'

export default function Home() {
  useEffect(() => {
    checkLogin()
    document.title="Task Manager"
  }, []);
  function checkLogin(){
    const userid=sessionStorage.getItem("userid")
    if(!userid){
       window.location.href="/signup"
    }
  }
 
  return (
    <div className='container'>
        <CreateTask/>
        <TaskList/>
        </div>
  )
}


