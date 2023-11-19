import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, TextInput } from 'react-native';
import { Overlay } from '@rneui/base';
import { Icon, Button } from '@rneui/themed';

// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';
// HOOKS
import { useCards } from '../hooks/data';
import { useModal } from '../hooks/modal';
// UTILS
import { pluralize } from '../utils/text';
// FIREBASE
import { FLASHCARDS } from '../api/db';

export default function FlascardCard({ flashcard, isLongPressed, onLongPress }) {
  const navigation = useNavigation();
  const { nameFlashcard, id } = flashcard;
  const cards = useCards(id);
  const { visible, show, hide } = useModal();
  const [newName, setNewName] = useState(nameFlashcard);


  const editFlashcard = async (flashcardId, newName) => {
    const flashcardRef = FLASHCARDS.doc(flashcardId);

    try {
      await flashcardRef.update({
        nameFlashcard: newName,
      });
      console.log("Flashcard successfully updated.");
      hide();
    } catch (error) {
      console.error("Error updating flashcard: ", error);
    }
  };

  const deleteFlashcard = async (flashcardId) => {
    const flashcardRef = FLASHCARDS.doc(flashcardId);

    try {
      await flashcardRef.delete();
      console.log("Flashcard successfully deleted.");
    } catch (error) {
      console.error("Error deleting flashcard: ", error);
    }
  };

  return (
    <View style={{ flexDirection: 'row', }}>

      <Overlay
        overlayStyle={{ backgroundColor: "#4C73F5" }}
        isVisible={visible}
        onBackdropPress={hide}
      >
        <View>
          <Text style={{ color: "white" }}>New Name</Text>

          <TextInput
            style={{ color: "black" }}
            onChangeText={(text) => setNewName(text)}
            value={newName}
          />
        </View>

        <Button
          title="Edit"
          onPress={() => editFlashcard(id, newName)}
        />
      </Overlay>

      <View style={{
        padding: 24,
        marginBottom: 24,
        borderRadius: 12,
        width: '75%'
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.cards.name, { flashcard })}
          onLongPress={onLongPress}
          activeOpacity={0.5}
        >
          <View>
            <Text style={{ color: 'black' }}>{nameFlashcard}</Text>

            {!!cards.length && (
              <View>
                <Text>
                  {pluralize({ noun: 'Card', number: cards.length })}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {isLongPressed && (
        <View style={{
          padding: 24,
          marginBottom: 24,
          borderRadius: 12,
        }}>
          <Button
            type='clear'
            icon={
              <Icon
                name="edit"
                type="material"
                color="blue"
              />
            }
            onPress={show}
          />

          <Button
            type='clear'
            icon={
              <Icon
                name="delete"
                type="material"
                color="red"
              />
            }
            onPress={() => deleteFlashcard(id)}
          />
        </View>
      )}
    </View>
  );
}