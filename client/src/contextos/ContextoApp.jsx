import React, { useState } from 'react'

const ContextoApp = React.createContext()

const ProveedorApp = ({children}) => {

    const [app, setApp] = useState({
        usuario: 'ragar'
    })
  return (
    <ContextoApp.Provider value={{app}}>
        {children}
    </ContextoApp.Provider>
  )
}

export {ContextoApp, ProveedorApp};