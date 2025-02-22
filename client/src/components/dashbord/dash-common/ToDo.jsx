import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ToDo() {
  const [tasks, setTasks] = useState([
    { text: "Read a book", completed: false },
    { text: "Wireframing new product", completed: false },
    { text: "Moodboard Landing Page", completed: false },
    { text: "Weekly meeting", completed: false },
    { text: "Practice a 5-minute elevator pitch", completed: false },
    { text: "Connect with 5 professionals on LinkedIn", completed: false },
    { text: "Research potential companies for job applications", completed: false }
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); 
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">

      <div className="flex flex-col space-y-4 bg-[#F8F7F3] shadow-md shadow-[#bfbcb2] rounded-2xl p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        {tasks.map((task, index) => (
          <div key={index} className="relative flex items-center justify-between p-3 bg-white shadow-sm rounded-xl transition transform hover:scale-105">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5" 
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.text}
              </span>
            </label>
            <button className="text-black-500" onClick={() => handleDeleteTask(index)}>
              <FaMinus />
            </button>
          </div>
        ))}

       
        <div className="flex space-x-2 mt-2">
          <input 
            type="text" 
            className="w-full p-2 border rounded-md text-sm bg-white" 
            placeholder="Create new task" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="px-4 py-2 bg-black text-white rounded-md flex items-center space-x-2 hover:bg-gray-800" onClick={addTask}>
            <FaPlus /> 
          </button>
        </div>
      </div>
    </div>
  );
}
