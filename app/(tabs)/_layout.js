import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from "react-native";

const StackLayout = () => {
  return (
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
        name="logout" 
        options={{
          title : 'Logout',
          tabBarIcon : () => <MaterialCommunityIcons name="logout" size={24} color="black" />
      }}/>
    </Tabs>
  )
}

export default StackLayout