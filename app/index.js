import { SafeAreaView} from 'react-native';
import { useContext } from 'react';
import { UserContext } from './_layout';
import SignIn from './auth/SignIn';

const Welcome = () => {
  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email
  if (!userEmail) {
      console.log("Not logged in")
  }
  
  return (
    <SafeAreaView style={{flex:1}}>
      {
        !loggedInUser.email && <SignIn/>
      }
        
    </SafeAreaView> 
  )
}



export default Welcome