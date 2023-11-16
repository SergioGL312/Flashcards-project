import { useRoute } from '@react-navigation/native';
import { FAB, Overlay, Button } from '@rneui/base';
import { useEffect, useContext } from 'react';
import { Text, TextInput, View } from 'react-native';

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

  return (
    <View>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        onPress={show}
        size="small"
      />

      <Overlay
        overlayStyle={{ backgroundColor: '#4C73F5' }}
        isVisible={visible}
        onBackdropPress={hide}
      >
        <View>
          <Text style={{ color: 'white' }}>New Card</Text>

          <TextInput
            style={{ color: 'white' }}
            placeholder="Term"
            onChangeText={(value) => setForm({ value, key: 'term' })}
            value={term}
          />

          <TextInput
            style={{ color: 'white' }}
            placeholder="definition"
            onChangeText={(value) => setForm({ value, key: 'definition' })}
            value={definition}
          />

          <Button
            title="Add"
            onPress={createCard}
          />

          <Button
            title="Generate"
            onPress={generateCard}
          />
        </View>
      </Overlay>
    </View>
  );
}
