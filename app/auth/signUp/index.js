import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


const SignUp = () => {
  const router = useRouter()
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  
  const handleSignUp = async () => {
  
    console.log(username, email, password)
    const url = `https://meal-management-server.onrender.com/api/auth/signUp`
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
  return (
    <View style={styles.container}>
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default SignUp