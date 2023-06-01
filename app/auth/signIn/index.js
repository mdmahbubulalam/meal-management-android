import { Link, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../../_layout';


const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignIn = async () => {
    const url = `https://meal-management-server.onrender.com/api/auth/signIn`
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
        console.log('sasasd',email)
        console.log('User signed in successfully!');
        router.push(`/home`);
        // Additional actions after successful sign-in, such as navigating to another screen
      } else {
        console.log('Sign-in failed.');
        // Handle sign-in failure, such as displaying an error message
      }
    } catch (error) {
      console.log(error);
      // Handle any other error that may occur during sign-in
    }
  };
  return (
    <View style={styles.container}>
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
    <Button title="Sign In" onPress={handleSignIn} />
    <Link href="/auth/signUp">
        click here
    </Link>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default SignIn