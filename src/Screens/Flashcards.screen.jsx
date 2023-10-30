import React from "react";
import { View, Text, StyleSheet } from "react-native";

// COMPONENTS
import AddFlashcard from "../Components/AddFlashcard";
import { useFlashcards } from "../hooks/data";
import FlascardCard from "../Components/FlashcardCard";

export default function Flashcards() {

  const flashcards = useFlashcards();

  return (
    <View>
      <Text
        style={styles.texto}
      >Flashcards</Text>
      
      <AddFlashcard />

      <View>
        {flashcards.length ? (
          flashcards.map((flashcard, index) => (
            <FlascardCard
              key={flashcard.id}
              flashcard={flashcard}
            />
          )
          )) : (
          <Text>Try adding a new category</Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "20%"
  }
})