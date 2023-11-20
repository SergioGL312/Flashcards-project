import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { FAB, Overlay } from "@rneui/base";

// HOOKS
import { useModal } from "../hooks/modal";
// FIREBASE
import { FLASHCARDS } from "../api/db";
// CONTEXT
import { AuthContext } from "../Wrappers/AuthContext";

export default function AddFlashcard() {

  const [nameFlashcard, setNameFlashcard] = useState('');
  const { user } = useContext(AuthContext);
  const { visible, show, hide } = useModal();

  useEffect(() => {
    setNameFlashcard('');
  }, [visible]);

  const createFlashcard = () => {
    console.log(`Creating Flashcard`);
    FLASHCARDS.add({
      nameFlashcard,
      userId: user.uid,
    });

    hide();
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
      }}>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        onPress={show}
        size="small"
        color="#539CFE"
      />

      <Overlay
        overlayStyle={{ backgroundColor: '#4C73F5' }}
        isVisible={visible}
        onBackdropPress={hide}
      >
        <View>
          <Text style={{ color: 'white' }}>New Flashcard</Text>

          <TextInput
            style={{ color: 'white' }}
            placeholder="Flashcard name..."
            onChangeText={(value) => setNameFlashcard(value)}
            value={nameFlashcard}
          />

          <Button
            title="Add"
            onPress={createFlashcard}
            disabled={!nameFlashcard.length}
          />
        </View>
      </Overlay>
    </View>
  );
}