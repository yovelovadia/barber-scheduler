import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  Platform,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import SettingsOnDate from "./SettingsOnDate";
const colors = require("../../colors.json");

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
  const [modalVisible, setModalVisible] = useState(false);
  const [whatDayInWeek, setWhatDayInWeek] = useState(
    new Date(props.name).getDay()
  );
  const [whatMonth, setWhatMonth] = useState(new Date(props.name).getMonth());
  const [whatDayInMonth, setWhatDayMonth] = useState(
    new Date(props.name).getDate()
  );
  const [whatYear, setWhatYear] = useState(new Date(props.name).getFullYear());
  const [toggleShow, setToggleShow] = useState(
    props.dateToday === props.name ? true : false
  );
  return (
    <View>
      {props.dates ? (
        <TouchableHighlight onPress={() => setToggleShow(!toggleShow)}>
          <View
            style={[
              styles.header,
              {
                backgroundColor:
                  props.dateToday === props.name ? colors.red : colors.grey,
              },
            ]}
          >
            <Text style={styles.year}>{whatYear}</Text>

            <Text style={styles.date}>
              יום {day_names[whatDayInWeek]} {whatDayInMonth} ב
              {months_names[whatMonth]}{" "}
            </Text>
          </View>
        </TouchableHighlight>
      ) : null}

      {props.dates && toggleShow
        ? props.dates
            .sort(
              (a, b) =>
                new Date("1000-10-10T" + b.hour) -
                new Date("1000-10-10T" + a.hour)
            )

            .map((item) => (
              <TouchableWithoutFeedback
                key={item.id}
                onPress={() =>
                  setModalVisible({ modal: !modalVisible, id: item.id })
                }
              >
                <View style={styles.customersContainer}>
                  <Text style={styles.textHour}>{item.hour}</Text>
                  <Text style={styles.customersText}>
                    {item.name} {item.phone} {item.tor} {item.colorNumber}{" "}
                    {item.oxPrecentage}
                    {item.oxPrecentage ? "%" : null} {item.colorCompany}
                  </Text>
                  {modalVisible && modalVisible.id === item.id ? (
                    <SettingsOnDate
                      onRefresh={props.onRefresh}
                      isVisible={modalVisible}
                      onPress={() => setModalVisible(!modalVisible)}
                      item={item}
                    ></SettingsOnDate>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 14,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    borderRadius: 10,
  },

  year: {
    fontSize: 14,
    textAlign: deviceLanguage === "iw_IL" ? "right" : "left",
  },

  date: {
    fontSize: 30,
    textAlign: deviceLanguage === "iw_IL" ? "left" : "right",
    color: colors.darkWhite,
  },
  customersContainer: {
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "aliceblue",
  },

  customersText: {
    fontSize: 20,
    color: colors.darkWhite,
    textAlign: deviceLanguage == "iw_IL" ? "left" : "right",
  },

  textHour: {
    color: "aliceblue",
    fontSize: 30,
    textAlign: deviceLanguage == "iw_IL" ? "right" : "left",
  },
});

export default Day;
