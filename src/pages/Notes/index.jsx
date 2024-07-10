import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, editTask } from '../../../features/taskSlice';
import { Helmet } from 'react-helmet-async';
import { formatDistance } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';

const Tasks = () => {
  const maxCharCount = 100;
  const perRow = 6;
  const [next, setNext] = useState(perRow);
  const tasks =useSelector((state)=>state.task.tasks)
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [remainingChars, setRemainingChars] = useState(maxCharCount);

  const handleEdit = (task) => {
    return () => {
      setCurrentTask(task);
      setName(task.name);
      setTitle(task.title);
      setDescription(task.description);
      setRemainingChars(maxCharCount - task.description.length);
      setIsEditing(true);
    };
  };

  const handleSaveEdit = () => {
    if (currentTask) {
      if(name !== "" && title !== "" && description !== ""){
        dispatch(editTask({
          id: currentTask.id,
          name,
          title,
          description,
          createdAt: new Date().toString(32),
        }));
        setIsEditing(false);
        setCurrentTask(null);
        setName('');
        setTitle('');
        setDescription('');
        setRemainingChars(maxCharCount);
        toast.success('Task Updated Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      }else{
        toast.error('Please fill all the fields', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      }
    }
    
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    if (newDescription.length <= maxCharCount) {
      setDescription(newDescription);
      setRemainingChars(maxCharCount - newDescription.length);
    }
    
  };
  const handleDeleteTask =(taskId)=>{
    return () => {
      dispatch(deleteTask(taskId));
      toast.success('Task Deleted Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
    };
  }

  const handelLoadMore = () => {
    setNext((prev) => prev + 3);
  }
  return (
    <>
      <Helmet>
        <title>Tasks</title>
      </Helmet>
      <ToastContainer />
     <div className="w-full h-[calc(100vh-theme(spacing.24))] pt-10">
      <div className="container">
      <h1 className='text-3xl font-bold text-center font-mono px-4 box-border mb-4'>Tasks</h1>
      {isEditing ? (
            <div className='w-1/3 bg-white shadow-md rounded-md p-4 mx-auto'>
              <h2 className="text-xl mb-2">Edit Task</h2>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                placeholder='Edit Name' 
                type="text" 
                className='w-full rounded-md border border-gray-300 p-4 mb-2' 
              />
              <input 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                placeholder='Edit Task' 
                type="text" 
                className='w-full rounded-md border border-gray-300 p-4 mb-2' 
              />
              <textarea 
              onChange={handleDescriptionChange}
                value={description} 
                placeholder='Description' 
                rows={5} 
                className='w-full rounded-md border border-gray-300 p-4 resize-none'>
              </textarea>
              <div className={`text-right text-sm mb-2 ${remainingChars === 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </div>
              <div className="flex justify-center gap-5 mt-4">
                <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-3 gap-3">
              {tasks && tasks.slice(0,next).map((task) => (
                <div key={task.id} className="shadow-sm bg-white rounded-md p-4 py-3">
                  <h3 className="font-mono font-bold text-2xl">{task.name}</h3>
                  <h3 className="font-mono font-bold text-xl">{task.title}</h3>
                  <p className="font-sans text-lg font-normal">{task.description}</p>
                  <span className="text-base font-mono text-slate-500">{formatDistance(task.createdAt, new Date(), { addSuffix: true }) }</span>
                  <div className="flex items-center justify-end gap-x-3 mt-4">
                    <button onClick={handleDeleteTask(task.id)} className="px-5 py-2 bg-red-700 text-white font-medium rounded-md">Remove</button>
                    <button onClick={handleEdit(task)} className="px-5 py-2 bg-slate-500 text-white font-medium rounded-md">Update</button>
                  </div>
                </div>
              ))}
            </div>
            {
              tasks.length > next   && (
                <div className='text-center'>
                  <button className='px-4 py-2 bg-cyan-800 text-white font-medium rounded-md mt-5' onClick={handelLoadMore}>Load More</button>
                </div>
              )
            }
            
            </>
          )}
      </div>
     </div>
    </>
  )
}

export default Tasks