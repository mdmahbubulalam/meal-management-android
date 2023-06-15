import { Link, Stack, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { UserContext } from '../_layout';


const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignIn = async () => {
    const url = `https://meal-management-server.onrender.com/api/auth/signIn`

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const userEmail = {
          email:email
        }
        setLoggedInUser(userEmail)
        console.log('User signed in successfully!');
        router.push(`/home`);
        // Additional actions after successful sign-in, such as navigating to another screen
      } else {
        console.log('Sign-in failed.');
        Alert.alert('Error', 'Wrong email or password');
        // Handle sign-in failure, such as displaying an error message
      }
    } catch (error) {
      console.log(error);
      // Handle any other error that may occur during sign-in
    }
  };

  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown: false}}/>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry={true}
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
    <Button style={styles.button} color={"#EA6F6F"} title="Sign In" onPress={handleSignIn} />

    

    <Text style={{backgroundColor:"white", padding:12, flexDirection: 'row', marginTop:12, textAlign: 'center', borderRadius: 3}}>
      <Text style={{color:"gray", fontSize: 16, fontWeight:'bold' }}> Not yet registered? <Text onPress={() => router.push('../auth/SignUp')} style={{color:'#EA6F6F'}}>Sign Up</Text> </Text>
    </Text>
             
    
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    marginBottom: 12,
    padding: 10,
    borderRadius: 3,
    borderColor : "#EA6F6F"
  },

  button : {
    borderRadius: 4
  }
});

export default SignIn