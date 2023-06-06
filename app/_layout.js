import { Stack } from "expo-router"
import { createContext, useState } from "react"

export const UserContext = createContext();
const Layout = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Stack>{children}</Stack>
    </UserContext.Provider>
    
  )
}

export default Layout