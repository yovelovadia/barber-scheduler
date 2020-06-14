import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./screens/HomeScreen.js";
import NewClientScreen from "./screens/NewClientScreen.js";
import ShowDatesScreen from "./screens/ShowDatesScreen.js";
import Icon from "react-native-vector-icons/Ionicons";

const colors = require("./colors.json");

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="aliceblue" backgroundColor={colors.lightBlack} />
      <SafeAreaView style={styles.container} />
      <Tab.Navigator
        initialRouteName={HomeScreen}
        tabBarOptions={{
          style: styles.tabStyle,
          activeTintColor: "aliceblue",
          inactiveTintColor: "black",
          indicatorStyle: { height: 0 },
          showIcon: true,
          showLabel: false,
          lazy: true,
        }}
      >
        <Tab.Screen
          name={"home"}
          component={HomeScreen}
          options={{
            tabBarIcon: (tintColor) => (
              <Icon name={"ios-home"} color={tintColor.color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="תאריכים"
          component={ShowDatesScreen}
          options={{
            tabBarIcon: (tintColor) => (
              <Icon name={"ios-calendar"} color={tintColor.color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="לקוח חדש"
          component={NewClientScreen}
          options={{
            tabBarIcon: (tintColor) => (
              <Icon name={"ios-person-add"} color={tintColor.color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 45 : 0,
    backgroundColor: colors.lightBlack,
  },
  tabStyle: {
    backgroundColor: colors.lightBlack,
  },
});
