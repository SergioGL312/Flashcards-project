import React, {useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useCallback } from "react";
// COMPONENTS
import AddFlashcard from "../Components/AddFlashcard";
import { useFlashcards } from "../hooks/data";
import FlascardCard from "../Components/FlashcardCard";


//Diseño 
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function Flashcards() {

  const flashcards = useFlashcards();


      //Things about the LOADFONTS
      const [fontsLoaded] = useFonts({
        Bebas: require("../assets/fonts/BebasNeue-Regular.ttf")
      }); 
    
      //SplashScreen for Loading Fonts
    
      useEffect (()=> {
        async function prepare (){
          await SplashScreen.preventAutoHideAsync();
        }
        prepare (); 
      }, [])
    
    
      const onLayout = useCallback(async() => {
        if (fontsLoaded){
          await SplashScreen.hideAsync();
        
      }
      }, [fontsLoaded]);
  
      if (!fontsLoaded) return null;
  
      //

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
    fontFamily: "Bebas",
    color: '#3EB1BE',
    fontSize: 30,
    textAlign: "center",
    marginTop: "20%"
  }, 

})