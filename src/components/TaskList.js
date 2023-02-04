import React, { useState, useEffect } from "react";

export default function TaskList() {
  //eslint-disable-next-line
  const [tasks, setTasks] = useState([]);
  const url = "https://tender-foal-tunic.cyclic.app/api/task";

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line
  }, []);

  function setCheck(data) {
    data.forEach((task) => {
      if (task.status) {
        let checkInput = document.getElementById(`checkUser${task._id}`);
        checkInput.checked = true;
      }
    });
  }
  async function handleCheckBox(id) {
    document.title="Updating...."
    let checkInput = document.getElementById(`checkUser${id}`);
    const response = await fetch(`${url}/updatestatus:${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: checkInput.checked,
      }),
    });
    const data = await response.json();
    if (data.message === "error") {
      alert("Something went wrong can you check again");
    }
    document.title="Task Manager"
  }

  async function fetchTask() {
    const userid = sessionStorage.getItem("userid");
    const response = await fetch(`${url}/getalltask:${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message === "error") {
      alert(data.error);
    } else {
      setTasks(data.data);
      setTimeout(() => {
        setCheck(data.data);
      }, 2000);
    }
  }
  async function deleteTask(id,title){
    let confirming=window.confirm( `Do you really want to delete "${title}" .`)
    if(confirming){
      document.title="Deleting....."
      const response=await fetch(`${url}/deletetask:${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data=await response.json()
      if(data.message==="error"){
        alert(data.error)
      }
      else{
        document.location.reload()
      }
    }
  }
  return (
    <div className="taskContainer disflex-col">
       {tasks.length === 0 ? (
        <h4>No task created yet</h4>
      ) : (
        tasks.map((task) => {
          return (
            <div className="card" key={task._id}>
             <button className="deleteBtn" onClick={()=>{
                deleteTask(task._id,task.title)
             }}>
               <i className="fa-regular fa-trash-can"></i>
             </button>
              <p>{task.title}</p>
              <p>{task.detail}</p>
              <p style={{ textAlign: "center",color:"yellow",fontSize:"1.2rem" }}>
                date : {task.date.split("T")[0]}
              </p>
              <div className="statusDiv">
                <label htmlFor="statusBox">Completed</label>
                <input
                  type="checkbox"
                  className="statusBox"
                  id={`checkUser${task._id}`}
                  onClick={() => {
                    handleCheckBox(task._id);
                  }}
                />
              </div>
            </div>
          );
        })
      )}

     </div>
     
    // <div className="taskContainer disflex-col">
    //   <div className="card">
    //       <button className="deleteBtn">
    //         <i class="fa-regular fa-trash-can"></i>
    //       </button>
    //     <p>{"title of the task 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus "}</p>
    //     <p>{"description or detail of the project"}</p>
    //     <p style={{ textAlign: "center", color: "yellow",fontSize:"1.2rem" }}>
    //       date : {"05:31:06"}
    //     </p>
    //     <div className="statusDiv">
    //       <label htmlFor="statusBox">Completed</label>
    //       <input type="checkbox" className="statusBox" />
    //     </div>
    //   </div>
    // </div>
  );
}
