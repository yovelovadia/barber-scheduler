import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  NativeModules,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import LocalPushNotification from "../LocalPushNotification";

const colors = require("../colors.json");

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

function HomeScreen() {
  return (
    <LinearGradient
      colors={[colors.grey, colors.lightBlack]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <LocalPushNotification />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/completeLogo.png")}
        />
      </View>
      <View style={styles.settingsIcon}>
        <Icon name={"ios-settings"} color={"aliceblue"} size={45} />
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    height: 370,
    width: 200,
  },
  logoContainer: {
    alignSelf: deviceLanguage === "iw_IL" ? "flex-end" : "flex-start",

    flex: 1,
    justifyContent: "flex-end",
  },
  settingsIcon: {
    position: "absolute",
    alignSelf: deviceLanguage === "iw_IL" ? "flex-start" : "flex-end",
    bottom: 0,
  },
});
