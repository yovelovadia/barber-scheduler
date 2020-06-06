import { View, Text, StyleSheet, NativeModules, Platform } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";

const months_names = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];
const day_names = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

function Day(props) {
  const [whatDayInWeek, setWhatDayInWeek] = useState(
    new Date(props.name).getDay()
  );
  const [whatMonth, setWhatMonth] = useState(new Date(props.name).getMonth());
  const [whatDayInMonth, setWhatDayMonth] = useState(
    new Date(props.name).getDate()
  );
  const [whatYear, setWhatYear] = useState(new Date(props.name).getFullYear());

  return (
    <View>
      {props.dates ? (
        <View style={styles.header}>
          <Text style={styles.text}>{whatYear}</Text>

          <Text style={{ ...styles.date, ...styles.text }}>
            יום {day_names[whatDayInWeek]} {whatDayInMonth} ב
            {months_names[whatMonth]}{" "}
          </Text>
        </View>
      ) : null}

      {props.dates
        ? props.dates.map((item) => (
            <View style={styles.customersContainer} key={item.id}>
              <Text style={styles.customersText}>
                {item.name},{item.phone},{item.tor},{item.colorNumber},
                {item.oxPrecentage},{item.colorCompany}
              </Text>
              <Modal>
                <Text>I AM BLALALA</Text>
              </Modal>
            </View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "grey",
    flexDirection: "row",
  },
  //en_US

  date: {
    position: "absolute",
    right: 0,
  },
  //IL

  text: {
    fontSize: 20,
  },
  customersText: {
    textAlign: deviceLanguage == "iw_IL" ? "left" : "left",
    fontSize: 30,
  },
});

export default Day;
