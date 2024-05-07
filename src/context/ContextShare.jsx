import React, { createContext, useState } from 'react'


// context to add project

export const addProjectResponseContext=createContext()
export const editProjectResponseContext=createContext()
export const logoutResponseContext=createContext()

function ContextShare({children}) {
    // children is a predefined props used to share data between the components

    const [addProjectResponse,setaddProjectResponse]=useState({})
    const [editProjectResponse,seteditProjectResponse]=useState({})
    const [authorToken,setauthorToken]=useState(true)

  return (
    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setaddProjectResponse}}> 
       <editProjectResponseContext.Provider value={{editProjectResponse,seteditProjectResponse}}>
        <logoutResponseContext.Provider value={{authorToken,setauthorToken}}> 
          {children}
        </logoutResponseContext.Provider>
      </editProjectResponseContext.Provider>
    </addProjectResponseContext.Provider> 
    
    </>
  )
}

export default ContextShare