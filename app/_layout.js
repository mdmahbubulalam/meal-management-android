import { Stack } from "expo-router"
import { createContext, useState } from "react"
import { SafeAreaView } from "react-native";

export const UserContext = createContext();
const Layout = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown : false}}/>
      </Stack> 
    </UserContext.Provider>
    
  )
}

export default Layout