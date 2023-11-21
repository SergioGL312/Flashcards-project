import { useRoute } from '@react-navigation/native';
import { FAB, Overlay, Button } from '@rneui/base';
import { useEffect, useContext } from 'react';
import { Text, TextInput, View } from 'react-native';

//Diseño
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";

// HOOKS
import { useForm } from '../hooks/form';
import { useModal } from '../hooks/modal';
// CONTEXT
import { AuthContext } from "../Wrappers/AuthContext";
// FIREBASE
import { CARDS } from '../api/db';
// OPENAI
import { executeMessage } from '../api/openai';

const baseState = () => ({
  term: '',
  definition: '',
});

export default function AddCard() {
  const [form, setForm] = useForm(baseState());
  const route = useRoute();
  const { user } = useContext(AuthContext);
  const { id: flashcardId } = route.params.flashcard;
  const { visible, show, hide } = useModal();

  const { term, definition } = form;

  const createCard = () => {
    CARDS.add({
      ...form,
      flashcardId: flashcardId,
      userId: user.uid,
    });

    hide();
  };

  const generateCard = async () => {
    const message =
      `Devuelve un JSON con los siguientes campos:

      * term
      * definition

      La definición deberá ser generada acorde al término proporcionado.
      El término será el siguiente:

      ${term}

      La definición deberá contener máximo 30 palabras y ser del mismo idioma que del término proporcionado.

      Si el término no contiene nada, genera un término aleatorio y su definición. 
    `
    let data = await executeMessage(message);
    data = await JSON.parse(data);

    setForm(data);
  }

  useEffect(() => {
    if (!visible) {
      setForm(baseState());
    }
  }, [visible, setForm]);


  //Things about the LOADFONTS
  const [fontsLoaded] = useFonts({
    Bebas: require("../assets/fonts/BebasNeue-Regular.ttf")
  });

  //SplashScreen for Loading Fonts

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])


  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();

    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  //

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
      }}>
      <FAB
        color="#539CFE"
        icon={{ name: 'add', color: 'white' }}
        onPress={show}
        size="small"
      />

      <Overlay
        overlayStyle={{ backgroundColor: '#A1E0F2', width: '60%' }}
        isVisible={visible}
        onBackdropPress={hide}
      >
        <View>
          <Text style={{ color: 'white', fontFamily: "Bebas", textAlign: 'center', fontSize: 40 }}>New Card</Text>

          <TextInput
            style={{ color: 'white', fontFamily: "Bebas", textAlign: 'center', fontSize: 23, margin: "8%" }}
            placeholder="Term"
            onChangeText={(value) => setForm({ value, key: 'term' })}
            value={term}
          />

          <TextInput
            style={{ color: 'white', fontFamily: "Bebas", textAlign: 'center', fontSize: 23, margin: "8%" }}
            placeholder="definition"
            onChangeText={(value) => setForm({ value, key: 'definition' })}
            value={definition}
          />
          <View style={{ alignContent: 'center', margin: "2%", fontFamily: "Bebas", alignItems: 'center' }}>
            <View style={{ width: 70, right: 70 }}>

              <Button
                color="#ECADAD"
                title="Add"
                onPress={createCard}
              />
            </View>
            <View style={{ position: 'absolute', fontFamily: "Bebas", alignItems: 'center', right: 25 }}>
              <Button
                color="#ECADAD"
                title="Generate"
                onPress={generateCard}
              />
            </View>
          </View>

        </View>
      </Overlay>
    </View>
  );
}
