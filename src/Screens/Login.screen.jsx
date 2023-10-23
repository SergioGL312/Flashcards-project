import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

// FIREBASE
import { FIREBASE_AUTH } from "../api/db";
import { signInWithEmailAndPassword } from 'firebase/auth';
// ROUTES
import { ROUTES } from "../Constants/navigation.constants";
// CONTEXT
import { AuthContext } from "../Wrappers/AuthContext";
// MESSAGES ERROR
import { ERROR_MESSAGES } from "../Constants/errors.constants";

const baseState = () => ({
  email: '',
  password: '',
});

export default function Login({ navigation }) {

  const { user } = useContext(AuthContext);
  const [form, setForm] = useState(baseState());
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = ({ value, key }) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, form.email, form.password);

      const user = FIREBASE_AUTH.currentUser;

      if (user) {
        setForm(baseState());
        navigation.navigate(ROUTES.flashcards);
        setError(null);
      } else {
        setError("SignIn failed: User not authenticated"); // Pending
      }
    } catch (err) {
      setError(ERROR_MESSAGES[err.message])
    }
  };

  useEffect(() => {
    const { email, password } = form;

    setValid(() => {
      if (!email.length || !password.length) {
        return false;
      }

      if (password.length < 6) return false;

      return true;
    });
  }, [form]);

  useEffect(() => {
    if (user) navigation.navigate(ROUTES.flashcards);
  }, [navigation, user]);

  useEffect(() => {
    setForm(baseState());
    setError(null);
  }, []);

  const { email, password } = form;

  return (
    <View style={styles.container}>
      <View style={styles.login}>

        <Text style={{
          fontSize: 30,
          width: '90%',
          marginBottom: 50,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Login</Text>

        <View style={{ width: '100%' }}>
          <Text style={{ fontSize: 17, fontWeight: '400', color: '#000', paddingBottom: 21 }}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder='s@gmail.com'
            value={email}
            onChangeText={(value) => handleChange({ key: 'email', value })}
          />

          <Text style={{ fontSize: 17, fontWeight: '400', color: '#000', paddingBottom: 21 }}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => handleChange({ key: 'password', value })}
          />
        </View>

        {error && <Text style={{ color: 'red' }}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button_login, { backgroundColor: '#D9D9D9' }]}
          onPress={signIn}
          disabled={!valid}
        >
          <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{bottom: 0, position: 'absolute'}}
          onPress={() => navigation.navigate(ROUTES.signup)}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: '90%',
    height: 700,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: 59,
    backgroundColor: '#ffffff90',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    marginBottom: 45
  },
  button_login: {
    width: 226,
    height: 53,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7
  },
})