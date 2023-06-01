import { Stack } from "expo-router"
import { createContext, useState } from "react"

export const UserContext = createContext();
const Layout = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Stack/>
    </UserContext.Provider>
    
  )
}

export default Layout