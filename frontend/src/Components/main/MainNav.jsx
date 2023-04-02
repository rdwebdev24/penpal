import axios from 'axios';
import {React, useEffect, useState} from 'react'
import '../../css/mainNav.css'
import { useGlobalContext } from '../../global/Context';
import Spinner from '../../utils/Spinner';
export const MainNav = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSetting,setShowSetting] = useState(false);
    const [showProfile,setShowProfile] = useState(false);
    const {loading,setLoading} = useGlobalContext();
    const {noteData,setNoteData} = useGlobalContext();
    const [user , setUser] = useState({name:'',email:'',img:''});
    const handleChange = event => {
      setSearchTerm(event.target.value);
    };
    const handleSubmit = event => {
      event.preventDefault();
      console.log(`Searching for: ${searchTerm}`);
    };
    const sidebarHandler = () => {
      document.getElementsByClassName('side-bar')[0].classList.toggle('open');
    }
    const refreshHandler = async () => {
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
        setLoading(false)
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(user=>({...user,name:`${userData.first_name} ${userData.last_name}`,email:userData.email,img:userData.pic}))
    },[])
  return (
    <nav className='main-nav'>
        <div className="nav-left">
            <i onClick={sidebarHandler} className="fa-solid fa-bars"></i>
            <div className="logo">
                <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="logo" />
                <span>Penpal</span>
            </div>
        </div>
        <form className='searchbar' onSubmit={handleSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </form>
        <div className="nav-right">
            {/* <i onClick={refreshHandler} className={`fa-solid fa-rotate-right ${loading?'rotate-refresh':''}`}></i> */}
            {loading?<span className='loader'></span>:<i onClick={refreshHandler} className={`fa-solid fa-rotate-right`}></i> }
            <i onClick={()=>{
              if(showProfile) setShowProfile(false);
              setShowSetting(!showSetting)
            }} className="fa-solid fa-gear"></i>
            <img src={user.img} onClick={()=>{
              if(showSetting) setShowSetting(false);
              setShowProfile(!showProfile)
            }} className="fa-solid fa-user"></img>
            {showSetting?<div className="settings">
              <p onClick={()=>{
                document.getElementsByTagName('body')[0].classList.toggle('dark-theme')
              }}>Enable dark theme</p>
              <p>Help</p>
              <p>feedback</p>
              <p>keyboard shortcuts</p>
            </div>:''}
            {showProfile?<div className="profile">
              <img src={user.img} alt="" />
              <p>{user.name}</p>
              <p>{user.email}</p>
              <div className="logout">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>log out</span>
              </div>
            </div>:''}
        </div>
    </nav>
  )
}
