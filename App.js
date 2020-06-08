import React from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./screens/HomeScreen.js";
import NewClientScreen from "./screens/NewClientScreen.js";
import ShowDatesScreen from "./screens/ShowDatesScreen.js";
import { LinearGradient } from "expo-linear-gradient"
const colors = require("./colors.json")

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (

    <NavigationContainer >
      <SafeAreaView style={styles.container} />
      <Tab.Navigator  initialRouteName={HomeScreen}>
        <Tab.Screen name="בית" component={HomeScreen} />
        <Tab.Screen name="תאריכים" component={ShowDatesScreen} />
        <Tab.Screen name="לקוח חדש" component={NewClientScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
});
