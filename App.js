import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./screens/HomeScreen.js";
import NewClientScreen from "./screens/NewClientScreen.js";
import ShowDatesScreen from "./screens/ShowDatesScreen.js";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <NavigationContainer>
        <SafeAreaView style={styles.container} />
        <Tab.Navigator initialRouteName={HomeScreen}>
          <Tab.Screen name="בית" component={HomeScreen} />
          <Tab.Screen name="תאריכים" component={ShowDatesScreen} />
          <Tab.Screen name="לקוח חדש" component={NewClientScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
});
