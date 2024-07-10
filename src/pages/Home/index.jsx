import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTask } from '../../../features/taskSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
const Home = () => {
  const maxCharCount = 100;
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [remainingChars, setRemainingChars] = useState(maxCharCount);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const handelChange = (e) => {
    e.preventDefault();
    if(name !== "" && title !== "" && description !== ""){
      const newNote = {
        id: Date.now().toString(32),
        name,
        title,
        description,
        createdAt: new Date().toString(32)
      }
      setName("");
      setTitle("");
      setDescription("");
      setRemainingChars(maxCharCount);
      setIsChecked(false);
      dispatch(addTask(newNote));
      toast.success('Successfully task added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }else{
      toast.error('Please fill up all the fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    
  }

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= maxCharCount) {
      setDescription(newDescription);
      setRemainingChars(maxCharCount - newDescription.length);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
    <ToastContainer />
      <div className="w-full h-[calc(100vh-theme(spacing.24))] flex justify-center items-center">
        <div className='w-1/4 bg-white shadow-md rounded-md p-4'>
          <div>
            <h1 className='text-3xl font-bold text-center font-mono px-4 box-border mb-4'>Add your Tasks</h1>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' type="text" className='w-full rounded-md border border-gray-300 p-4 mb-2' />
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Add Note' type="text" className='w-full rounded-md border border-gray-300 p-4 mb-2' />
            <textarea onChange={handleDescriptionChange} value={description} placeholder='Description' rows={5} className='w-full rounded-md border border-gray-300 p-4 resize-none'></textarea>
            <div className={`text-right text-sm mb-2 ${remainingChars === 0 ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars} characters remaining
            </div>
            <div className="flex items-center">
              <input id="checked-checkbox" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-slate-500" />
              <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 cursor-pointer">I want to add this task</label>
            </div>
            <button onClick={handelChange} className={`w-full ${isChecked ? 'bg-black hover:bg-gray-500' : 'bg-gray-300 cursor-not-allowed'} text-white rounded-md p-4 mt-4`} disabled={!isChecked}>Save Note</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home