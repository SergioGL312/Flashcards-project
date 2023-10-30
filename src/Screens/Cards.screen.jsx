import { Button } from '@rneui/base';
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";

// COMPONENTS
import AddCard from "../Components/AddCard";
import CardItem from "../Components/CardItem";
// HOOKS
import { useCards } from "../hooks/data";
// UTILS
import { pluralize } from "../utils/text";
import { getRandom } from "../utils/number";

export default function Cards({ route }) {

  const { id, nameFlashcard } = route.params.flashcard;
  const cards = useCards(id);
  const [active, setActive] = useState(null);

  const chooseNewCard = useCallback(() => {
    if (!cards.length) return;

    if (cards.length === 1) {
      setActive(cards[0].id);
      return;
    }

    setActive((prev) => {
      let newId;

      do {
        newId = getRandom(cards).id;
      } while (newId && newId === prev);

      return newId;
    });
  }, [setActive, cards]);

  useEffect(() => {
    if (!active && cards.length) {
      chooseNewCard();
    }
  }, [cards, active, chooseNewCard]);

  const activeCard = cards.find((card) => card.id === active);

  return (
    <View style={{ marginTop: 50 }}>
      <Text>{nameFlashcard}</Text>
      <Text>{pluralize({ noun: 'Card', number: cards.length })}</Text>


      {!cards.length && (
        <Text>Try adding a card first...</Text>
      )}

      {active && <CardItem card={activeCard} />}

      <Button
        title="Next"
        disabled={cards.length < 2}
        onPress={chooseNewCard}
      />

      <AddCard />

    </View>
  );
}
