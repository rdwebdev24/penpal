import { useEffect } from 'react';
import {React,useState} from 'react'
import { useGlobalContext } from '../../global/Context';
import '../../css/notes.css'
import axios from 'axios';
import { Empty } from './Empty';
export const Notes = () => {
    const {loading,setLoading} = useGlobalContext();
    const {noteData,setNoteData} = useGlobalContext();
    const [showform,setShowForm] = useState(false);
    const [notes,setNote] = useState({title:"",text:""});
    const [showDelete, setShowDelete] = useState(false);
    const [noteId,setNoteId] = useState(0)
    const [showEdit,setShowEdit] = useState(false);
    const [editdata,setEditData] = useState({title:'note 1',text:''});

    const submitHandler = async (e) => {
            e.preventDefault()
            const newstr = `${notes.title}-${notes.text}`
            console.log(newstr);
            const url = `http://localhost:5000/task/${localStorage.getItem('userId')}`;
            const headers = {
              "Access-Control-Allow-Origin": "*",
              "Content-type": "application/json",
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
            try {
              const {data} = await axios.post(url,{data:newstr},headers)
              console.log(data," post");
              setNoteData(data[0].todoData)
              setLoading(false)
              setNote({title:"",text:""})
              setShowForm(false);
            } catch (error) {
              setShowForm(false);
            }
           
    }
    const getTask = async () => {
      setLoading(true);
      const url = `http://localhost:5000/task/${localStorage.getItem('userId')}`;
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      } 
      try {
        const {data} = await axios.get(url,headers)
        setNoteData(data[0].todoData)
        console.log(noteData," get");
        setLoading(false)
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    const deleteHandler = async () => {
      const url = "http://localhost:5000/task";
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
      try {
        const {data} = await axios.delete(`${url}/${noteId}/${localStorage.getItem('userId')}`,headers)
        console.log(data," delete");
        setNoteData(data[0].todoData);
        setShowDelete(false);
      } catch (error) {
        console.log(error);
        alert("network error")
      }      
    }
    const editHandler = (data,_id) => {
      setShowEdit(true);
      setNoteId(_id);
      const title = data.split('-')[0];
      const text = data.split('-')[1];
      setEditData(editdata=>({
        ...editdata,
        title,
        text
      }));
    }
    const editHandler2 = async () => {
      const newstr = `${editdata.title}-${editdata.text}`
      console.log(newstr," edit data");
      const url = `http://localhost:5000/task/${noteId}/${localStorage.getItem('userId')}`;
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
      try {
        const {data} = await axios.put(url,{data:newstr},headers)
        console.log(data," edited");
        setNoteData(data[0].todoData)
        setEditData(editdata=>({
          ...editdata,
          title:'',
          text:''
        }))
        setShowEdit(false);
      } catch (error) {
        setShowEdit(false);
      }
    }
    useEffect(()=>{
      getTask()
    },[])
    useEffect(()=>{
      const textarea = document.querySelector("#autoresizing");
      const textarea2 = document.querySelector("#notes-text");
      textarea2!=null?textarea2.addEventListener('input', autoResize, false):'';
      textarea!=null?textarea.addEventListener('input', autoResize, false):'';
            
      function autoResize() {
        console.log("sdds");
          this.style.height = 'auto';
          this.style.height = this.scrollHeight + 'px';
      }
    })
  return (
    <div className='notes-wrapper'>
      {/* NOTES FORM */}
        {(!showform)?<div onClick={()=>setShowForm(true)} className="addnote">add a note...</div>
        :<form onSubmit={submitHandler} className="note-form addnote">
            <input autoFocus={true} value={notes.title} onChange={(e)=>setNote({...notes,title:e.target.value})} type="text" placeholder='Title' />
            <textarea value={notes.text} onChange={(e)=>setNote(notes=>({
              ...notes,
              text:e.target.value
            }))} id="notes-text"></textarea>
            <div className="form-button">
                <button type='submit'>save</button>
                <button onClick={()=>setShowForm(false)}>close</button>
            </div>
        </form>}


      {/* NOTES CONTAINER */}
       <div className="notes-cont">
           {loading==true?'':
           noteData.map((item,index)=>{
            const {data,_id} = item
            return (<div key={item._id} className="note-card">
                <i className="fa-sharp fa-solid fa-thumbtack"></i>
                <div className="note-info">
                  <h4>{data!=undefined?data.split('-')[0]:''}</h4>
                  <p>{data!=undefined?data.split('-')[1]:''}</p>
                </div>
                <div className="note-options">
                  <i onClick={()=>editHandler(data,_id)} className="fa-regular fa-pen-to-square"></i>
                  <i onClick={()=>{
                    setNoteId(_id);
                    setShowDelete(true);
                  }} className="fa-regular fa-trash-can"></i>
                  <i className="fa-regular fa-file-zipper"></i>
                </div>
              </div>)
           })}
           {noteData.length==0?<Empty icon={'fa-regular fa-lightbulb'} info={'Notes you add appear here'}/>:''}
       </div>

       {/* models */}
       {!showDelete?'': <div className="delete-cont">
        <div className="delete-model">
          <p>are you sure you want to delete ? </p>
          <div className="btn-div">
            <button onClick={()=>setShowDelete(false)}>cancel</button>
            <button onClick={deleteHandler}>delete</button>
          </div>
        </div>
       </div>}
        {!showEdit?'':<div className="edit-cont">
            <div className="edit-model">
                <input value={editdata.title} onChange={(e)=>{
                  setEditData(editdata=>({
                    ...editdata,
                    title:e.target.value
                  }))
                }} type="text" placeholder=''/>
                <textarea value={editdata.text} onChange={(e)=>{
                  setEditData(editdata=>({
                    ...editdata,
                    text:e.target.value
                  }))
                }} id="autoresizing"></textarea>
                <div className="edit-btn">
                  <button onClick={()=>{
                    setShowEdit(false);
                  }}>cancel</button>
                  <button onClick={editHandler2}>edit</button>
                </div>
            </div>
        </div>}
    </div>
  )
}