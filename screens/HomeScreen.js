import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
const colors = require("../colors.json")

function HomeScreen() {
  return (
    <LinearGradient
    colors={[colors.grey,colors.lightBlack]}
    style={{flex: 1}}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}>
    <View>
      <Text>HomeScreen</Text>
    </View>
    </LinearGradient> 
  );
}

export default HomeScreen;
