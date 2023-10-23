import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Flashcards() {
    return (
        <View>
            <Text
            style={styles.texto}
            >Flashcards</Text>
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