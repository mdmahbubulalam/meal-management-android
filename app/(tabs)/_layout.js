import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../_layout";
import SignIn from "../auth/signIn";

const StackLayout = () => {
  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email
  return (
    <>
    {
      userEmail ? 
      <Tabs>
      <Tabs.Screen 
        name="home" 
        options={{
          title : "Home",
          headerStyle : {backgroundColor : "#EA6F6F"},
          tabBarIcon : () => <FontAwesome name="home" size={24} color="black" />
        }}/>
      <Tabs.Screen 
        name="month" 
        options={{
          title : 'Month',
          headerStyle : {backgroundColor : "#EA6F6F"},
          tabBarIcon : () => <MaterialCommunityIcons name="calendar-month" size={24} color="black" />
      }}/>
      <Tabs.Screen 
        name="table" 
        options={{
          title : 'Table',
          headerStyle : {backgroundColor : "#EA6F6F"},
          tabBarIcon : () => <FontAwesome name="table" size={24} color="black" />
      }}/>
      <Tabs.Screen 
        name="logout" 
        options={{
          title : 'Logout',
          tabBarIcon : () => <MaterialCommunityIcons name="logout" size={24} color="black" />
      }}/>
    </Tabs>
    :
    <SignIn/>

    }
    
    </>
    
  )
}

export default StackLayout