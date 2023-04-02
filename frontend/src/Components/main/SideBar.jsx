import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/side-bar.css'
export const SideBar = () => {
    const [active,setActive] = useState('notes')
  return (
    <aside className='side-bar'>
        <Link className={`sidebar-item ${active=='notes'?'active':''}`} onClick={()=>setActive('notes')} to='notes'>
            <i className="fa-regular fa-lightbulb"></i>
            <span>notes</span>
        </Link>
        <Link className={`sidebar-item ${active=='archive'?'active':''}`} onClick={()=>setActive('archive')} to='archive'>
            <i className="fa-regular fa-file-zipper"></i>
            <span>archive</span>
        </Link>
        <Link  className={`sidebar-item ${active=='trash'?'active':''}`} onClick={()=>setActive('trash')} to='trash'>
            <i className="fa-regular fa-trash-can"></i>
            <span>trash</span>
        </Link>
    </aside>
  )
}
