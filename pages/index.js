import Head from 'next/head'


import { IoClose, IoReturnDownBackSharp, IoSunny } from "react-icons/io5";
import { useEffect, useState, useCallback } from 'react';
import update from 'immutability-helper'


function TaskName({name, status}){
	// console.log(name)
	if(status === "completed")
		return <p className='text-[#565c74] grow'><s>{name}</s></p>
	else
		return <p className='text-[#bcbed6] grow'>{name}</p>
}


const masterTask = [
	{
		"id":1,
		"task":"Complete online JavaScript course",
		"status":"completed"
	},
	{
		"id":2,
		"task":"Jog around the park 3x",
		"status":"active"
	},
	{
		"id":3,
		"task":"10 minutes meditation",
		"status":"active"
	},
	{
		"id":4,
		"task":"Read for 1 hour",
		"status":"active"
	},
	{
		"id": 5,
		"task":"Pick up groceries",
		"status":"active"
	},
	{
		"id":6,
		"task":"Complete Todo App on Frontend Mentor",
		"status":"active"
	}
]

// async function writeToFile(tasks) {
// 	await writeJsonFile("../data-copy.json", tasks)
// }

// function TaskRow({task}){
// 	return(
// 		<div >
// 			<div key={task.id} className='flex p-[15px] gap-[25px] items-center border-b-[0.5px] border-b-[#5f668271]' onMouseEnter={() => {showCloseIcon(task.task.toLowerCase().split(" ").join())}} onMouseLeave={() => {hideCloseIcon(task.task.toLowerCase().split(" ").join())}}>
// 				<div className={`${task.status === "completed" ? "bg-gradient-to-br from-[#57DDFF] to-[#C058F3]":null} h-[18px] w-[18px] rounded-full border-[1px] border-[#5f6682] cursor-pointer hover:border-white transition-all duration-300 flex items-center justify-center`} 
// 					onClick={()=>{
// 						changeTaskStatus(task.task.toLowerCase().split(" ").join())
// 					}}>
// 					<img src = "/images/icon-check.svg" className='h-[50%]' className = {`${task.status === "active"?"hidden":""}`}/>

// 				</div>
// 				<TaskName name = {task.task} status = {task.status} />
// 				<IoClose fill="#25273c" id={`${task.task.toLowerCase().split(" ").join()}`} className='transition-all duration-300 cursor-pointer' 
// 					onClick={()=>{
// 						deleteTask(task.id)
// 					}}
// 				/>
// 			</div>
			
// 		</div>
		
// 	)	
// }

export default function Home() {


	

	const [tasks, setTasks] = useState([])

	const moveTask = useCallback((dragIndex, hoverIndex) => {
		const dragTask = tasks[dragIndex];
		setTasks(update(tasks, {
			$splice: [
				[dragIndex, 1],
				[hoverIndex, 0, dragTask],
			],
		}));
	}, [tasks]);

	const [newTaskStatus, setNewTaskStatus] = useState("active")

	const [dispTag, setDispTag] = useState("all")

	const [taskCount, setTaskCount] = useState(0)

	const [theme, setTheme] = useState("dark")

	

	useEffect(()=>{
		var localStorageData = localStorage.getItem("taskData")
		if(!localStorageData){
			localStorage.setItem("taskData",JSON.stringify({
				"taskLength":masterTask.length,
				"tasks":[...masterTask]
			}))
		}
		localStorageData = JSON.parse(localStorage.getItem("taskData"))
		// console.log("local", localStorageData)
		setTasks(localStorageData.tasks)
		// console.log(tasks) 
		setTaskCount(localStorageData.taskLength)
		// console.log("Calling UE 1")
	}, [])

	useEffect(()=>{
		// console.log("tasks after adding", tasks)
		localStorage.setItem("taskData", JSON.stringify({
			"length":tasks.length,
			"tasks":[
				...tasks
			]
		}))
		// console.log("Calling UE 2")

	}, [tasks])



	const showActive = () => {
		var localStorageData = localStorage.getItem("taskData")
		if(!localStorageData){
			localStorage.setItem("taskData",JSON.stringify({
				"taskLength":masterTask.length,
				"tasks":[...masterTask]
			}))
		}
		localStorageData = JSON.parse(localStorage.getItem("taskData")).tasks.filter(function(task) {
			return task.status === "active";
		})
		setTasks(localStorageData)
		console.log(tasks)
	}

	const showAll = () => {
		var localStorageData = localStorage.getItem("taskData")
		if(!localStorageData){
			localStorage.setItem("taskData",JSON.stringify({
				"taskLength":masterTask.length,
				"tasks":[...masterTask]
			}))
		}
		localStorageData = JSON.parse(localStorage.getItem("taskData")).tasks
		setTasks(localStorageData)
	}

	const showCompleted = () => {
		var localStorageData = localStorage.getItem("taskData")
		if(!localStorageData){
			localStorage.setItem("taskData",JSON.stringify({
				"taskLength":masterTask.length,
				"tasks":[...masterTask]
			}))
		}
		localStorageData = JSON.parse(localStorage.getItem("taskData")).tasks.filter(function(task) {
			return task.status === "completed";
		})
		setTasks(localStorageData)
		console.log(tasks)
	}

	const clearCompleted = () => {
		var localStorageData = localStorage.getItem("taskData")
		if(!localStorageData){
			localStorage.setItem("taskData",JSON.stringify({
				"taskLength":masterTask.length,
				"tasks":[...masterTask]
			}))
		}
		localStorageData = JSON.parse(localStorage.getItem("taskData")).tasks.filter(function(task) {
			return task.status !== "completed";
		})
		setTasks(localStorageData)
		// console.log(tasks)
		localStorage.setItem("taskData",JSON.stringify({
			"taskLength":localStorageData.length,
			"tasks":[...localStorageData]
		}))	}

	const addTask = (e) => {
		if (e.key === 'Enter' && e.target.value) {
			e.preventDefault()
			var tasksCopy = tasks.slice()
			tasksCopy.unshift({
				"id":tasks.length+1,
				"task":e.target.value,
				"status":newTaskStatus
			})
			setTasks(tasksCopy)
			localStorage.setItem("taskData", JSON.stringify({
				"length":tasksCopy.length,
				"tasks":[
					...tasksCopy
				]
			}))
		
		e.target.value = ""
		setNewTaskStatus("active")

		}  
	}

	const deleteTask = (id) => {
		var tasksCopy = tasks.slice()
		// console.log("Deleting id:", id)
		
		tasksCopy = tasksCopy.filter(function(task) {
			return task.id !== id;
		})
		setTasks(tasksCopy)
		var newLength = tasksCopy.length
		localStorage.setItem("taskData", JSON.stringify({
			"length":newLength,
			"tasks":[
				...tasksCopy
			]
		}))
	}

	const changeTaskStatus = (taskName) => {
		var tasksCopy = tasks.slice()
		for (let i = 0; i<tasksCopy.length; i++) {
			if (tasksCopy[i].task.toLowerCase().split(" ").join() === taskName) {
				if(tasksCopy[i].status === "active")
					tasksCopy[i].status = "completed"
				else
					tasksCopy[i].status = "active"
				break; //Stop this loop, we found it!
			}
		}
		setTasks(tasksCopy)
		localStorage.setItem("taskData", JSON.stringify({
			"length":tasks.length,
			"tasks":[
				...tasksCopy
			]
		}))		// console.log(tasksCopy)
		// forceUpdate()
	}

	// useEffect(()=>{
	// 	setTaskCount(tasks.length)
	// 	// console.log(dispTag)
	// 	// console.log(tasks)
	// 	// console.log(tasks.length)
	// }, [tasks])

	const showCloseIcon = (icon) => {
		let closeIcon = document.getElementById(icon);
		closeIcon.style.fill="#5f6682";
	}

	const hideCloseIcon = (icon) => {
		let closeIcon = document.getElementById(icon);
		closeIcon.style.fill="#25273c";
	}


	return (
		<div className = "h-screen overflow-y-scroll scrollbar-hide bg-[#181824] bg-no-repeat bg-fixed py-[80px]" style={{backgroundImage: `url(/images/bg-desktop-${theme}.jpg)`, fontFamily:"'Josefin Sans', sans-serif"}}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
				<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
			</Head>
			<div className='max-w-[32rem] w-full m-auto flex flex-col'>
				<div className='flex items-center justify-between mb-[10px]'>
					<p className='tracking-widest text-[32px] font-[600] text-white'>TODO</p>
					<IoSunny size={"28px"} fill={`${theme==="dark"?"white":"black"}`} className='cursor-pointer transition-all duration-300' onClick={()=>{theme ===  "dark"?setTheme("light"):setTheme("dark")}} />
				</div>
				<div className='p-[15px] rounded-md bg-[#25273c] flex items-center justify-start gap-[20px] my-[10px]'>
					<div className={`${newTaskStatus === "completed" ? "bg-gradient-to-br from-[#57DDFF] to-[#C058F3]":null} h-[18px] w-[18px] rounded-full border-[1px] border-[#5f6682] hover:border-white transition-all duration-300 cursor-pointer flex items-center justify-center object-contain`} 
						onClick={() => {
							if(newTaskStatus === "active")
								setNewTaskStatus("completed") 
							else 
								setNewTaskStatus("active")
						}}>
						<img src = "/images/icon-check.svg" className='h-[50%]' className = {`${newTaskStatus === "active"?"hidden":""}`}/>
					</div>
					<input className='bg-[#25273c] text-[18px] grow text-[#c8cae2] focus:outline-none' placeholder='Create a new todo...' onKeyPress={addTask} />
					{/* <p className='text-center text-[#5f6682] text-[14px]'>
						Click enter
					</p> */}
					<IoReturnDownBackSharp stroke='#5f6682' fill="#5f6682"  />
				</div>
				<div className='flex max-h-[50vh] flex-col my-[10px] bg-[#25273c] rounded-md'>
					<div className='overflow-y-scroll scrollbar-hide'>
						{
							
							tasks.map((task)=>{
								return(
									<div>
										<div key={task.id} className='flex p-[15px] gap-[25px] items-center border-b-[0.5px] border-b-[#5f668271]' onMouseEnter={() => {showCloseIcon(task.task.toLowerCase().split(" ").join())}} onMouseLeave={() => {hideCloseIcon(task.task.toLowerCase().split(" ").join())}}>
											<div className={`${task.status === "completed" ? "bg-gradient-to-br from-[#57DDFF] to-[#C058F3]":null} h-[18px] w-[18px] rounded-full border-[1px] border-[#5f6682] cursor-pointer hover:border-white transition-all duration-300 flex items-center justify-center`} 
												onClick={()=>{
													changeTaskStatus(task.task.toLowerCase().split(" ").join())
												}}>
												<img src = "/images/icon-check.svg" className='h-[50%]' className = {`${task.status === "active"?"hidden":""}`}/>
	
											</div>
											<TaskName name = {task.task} status = {task.status} />
											<IoClose fill="#25273c" id={`${task.task.toLowerCase().split(" ").join()}`} className='transition-all duration-300 cursor-pointer' 
												onClick={()=>{
													deleteTask(task.id)
												}}
											/>
										</div>
										
									</div>
									// <TaskRow task = {task} />
									
								)	
							})
						}
					</div>
					<div className='sticky top-[100%] bg-[#25273c] rounded-b-md  w-full border-t-[1px] border-t-[#5f6682] text-[14px] flex items-center justify-between px-[10px] py-[8px]'>
						<p className='text-[#5f6682] hover:text-white transition-all duration-300 cursor-pointer'>{tasks.length} item(s) {dispTag==="all"?"in all":dispTag.toLowerCase()} </p>
						<div className='flex gap-[15px] text-[#5f6682]'>
							<p className={`${dispTag ==="all"?"text-blue-500":null} hover:text-white transition-all duration-300 cursor-pointer`} onClick={()=>{setDispTag("all"); showAll()}}>All</p>
							<p className={`${dispTag ==="active"?"text-blue-500":null} hover:text-white transition-all duration-300 cursor-pointer`} onClick={()=>{setDispTag("active"); showActive()}}>Active</p>
							<p className={`${dispTag ==="completed"?"text-blue-500":null} hover:text-white transition-all duration-300 cursor-pointer`} onClick={()=>{setDispTag("completed"); showCompleted()}}>Completed</p>
						</div>
						<p className='text-[#5f6682] hover:text-white transition-all duration-300 cursor-pointer' onClick={clearCompleted}>Clear completed</p>
					</div>
				</div>
				<div>
					<p className='text-center text-[#5f6682] text-[14px] mt-[15px]'>
						Drag and drop to reorder list
					</p>
				</div>
			</div>
			
		</div>
	)
}


