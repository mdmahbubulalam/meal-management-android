import { SafeAreaView} from 'react-native';
import SignIn from './auth/signIn';
import { useContext } from 'react';
import { UserContext } from './_layout';
import Home from './(tabs)/home';
import { Redirect } from 'expo-router';


const Welcome = () => {
  const [loggedInUser] = useContext(UserContext)
  console.log('ddddd',loggedInUser)
  return (
    <SafeAreaView style={{flex:1}}>
      {
        loggedInUser.email ? <Home/> : <SignIn/>
      }
        
    </SafeAreaView> 
  )
}



export default Welcome