import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';


const SignUp = () => {
  const router = useRouter()
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  

  
  const handleSignUp = async () => {
    const url = `https://meal-management-server.onrender.com/api/auth/signUp`
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return;
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log('User registered successfully!');
        router.back()
        // Additional actions after successful sign-up, such as navigating to another screen
      } else {
        console.log('Sign-up failed.');
        // Handle sign-up failure, such as displaying an error message
      }
    } catch (error) {
      console.log(error);
      // Handle any other error that may occur during sign-up
    }
  };

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password validation regex pattern
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  return (
    <View style={styles.container}>
       <Stack.Screen options={{headerShown: false}}/>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={username}
        onChangeText={(text) => setUserName(text)}
      />
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
      <Button color={"#EA6F6F"} title="Sign Up" onPress={handleSignUp} />

      <Text style={{backgroundColor:"white", marginTop:12, padding:12, flexDirection: 'row', textAlign: 'center', borderRadius: 3}}>
        <Text style={{color:"gray", fontSize: 16, fontWeight:'bold' }}> Already registered? <Text onPress={() => router.push('../auth/SignIn')} style={{color:'#EA6F6F'}}>Sign In</Text></Text> 
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

export default SignUp