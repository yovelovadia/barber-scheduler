import React, { useState } from "react";
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
import AppSettings from "./Components/AppSettings";

const colors = require("../colors.json");

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

function HomeScreen({ navigation }) {
  const [toggleSettings, setToggleSettings] = useState(false);
  return (
    <LinearGradient
      colors={[colors.grey, colors.lightBlack]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text
        style={styles.createNew}
        onPress={() => navigation.jumpTo("לקוח חדש")}
      >
        יצירת לקוח חדש
      </Text>
      <AppSettings
        toggleSettings={toggleSettings}
        onPress={() => setToggleSettings(!toggleSettings)}
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/completeLogo.png")}
        />
      </View>
      <View style={styles.settingsIcon}>
        <Icon
          onPress={() => setToggleSettings(!toggleSettings)}
          name={"ios-book"}
          color={"aliceblue"}
          size={45}
        />
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
  createNew: {
    backgroundColor: colors.darkWhite,
    color: colors.lightBlack,
    fontFamily: "sans-serif-condensed",
    fontSize: 15,
    textAlign: "center",
    width: 140,
    padding: 10,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    alignSelf: deviceLanguage === "iw_IL" ? "flex-start" : "flex-end",
    position: "relative",
    top: 200,
  },

  settingsIcon: {
    position: "absolute",
    alignSelf: deviceLanguage === "iw_IL" ? "flex-start" : "flex-end",
    bottom: 0,
  },
});
