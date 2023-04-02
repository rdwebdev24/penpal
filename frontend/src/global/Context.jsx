import React, { useState } from 'react'
import {useContext} from 'react'


const AppContext = React.createContext();


const AppProvider = ({children}) =>{
     const [loading,setLoading] = useState(true);
     const [noteData,setNoteData] = useState([]);
     const [archive,setArchive] = useState([]);
  
       return <AppContext.Provider value={{
            loading,
            setLoading,
            noteData,
            setNoteData,
            archive,
            setArchive
       }}>
            {children}
       </AppContext.Provider>
  }
  
  const useGlobalContext = () =>{
       return useContext(AppContext)
  }

  export {AppContext,AppProvider, useGlobalContext}