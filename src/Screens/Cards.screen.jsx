import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Cards() {
    return (
        <View>
            <Text
            style={styles.texto}
            >Cards</Text>
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