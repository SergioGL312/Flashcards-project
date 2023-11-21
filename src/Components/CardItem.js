import { useEffect, useState, useCallback } from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useModal } from '../hooks/modal';

//Diseño
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function CardItem({ card }) {
  const { visible, toggle, show } = useModal(true);
  const { term, definition } = card;

  useEffect(() => {
    show();
  }, [card.term, show]);
  //Things about the LOADFONTS
  const [fontsLoaded] = useFonts({
    Bebas: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  //SplashScreen for Loading Fonts

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      onPress={toggle}
    >
      {visible ? (
        <Text style={styles.texto}>{term}</Text>
      ) : (
        <>
          <Text style = {styles.des}>{definition}</Text>
        </>
      )}
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical:220,
    fontFamily: "Bebas",
    fontSize: 30,
    color: 'white'
  }, 
  des: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical:200,
    marginHorizontal:10,
    fontFamily: "Bebas",
    fontSize: 20,
    color: 'white'
  }, 

});