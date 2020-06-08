import { View, Text, StyleSheet, NativeModules, Platform,TouchableHighlight } from "react-native";
import React, { useState } from "react";
import SettingsOnDate from "./SettingsOnDate";
const colors = require("../../colors.json")

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
        <View style={[styles.header,{backgroundColor: props.dateToday === props.name?colors.red:colors.grey,
}]}>
          <Text style={styles.year}>{whatYear}</Text>

          <Text
            style={styles.date}
          >
            יום {day_names[whatDayInWeek]} {whatDayInMonth} ב
            {months_names[whatMonth]}{" "}
          </Text>

        </View>
        </TouchableHighlight>
      ) : null}

      {props.dates && toggleShow
        ? props.dates.map((item) => (
            <View style={styles.customersContainer} key={item.id}>
              <Text style={styles.textHour}>{item.hour}</Text>
              <Text
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.customersText}
              >
                {item.name},{item.phone},{item.tor},{item.colorNumber},
                {item.oxPrecentage},{item.colorCompany}
              </Text>
              {modalVisible ? (
                <SettingsOnDate
                  onRefresh={props.onRefresh}
                  isVisible={modalVisible}
                  onPress={() => setModalVisible(!modalVisible)}
                  item={item}
                ></SettingsOnDate>
              ) : null}
            </View>
          ))
        : null}
    </View>
  );
}

console.log(deviceLanguage)
const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding:14,
    borderBottomWidth:2,
    borderBottomColor:"black"
    
  },


  year: {
    fontSize: 14,
    textAlign:deviceLanguage === 'iw_IL'?"right": "left"
  },

  date:{
    fontSize:30,
    textAlign:deviceLanguage === 'iw_IL'?"left": "right",
    color:colors.darkWhite,
  }
  ,
  customersContainer:{flexDirection:"row"},

  customersText: {
    textAlign: deviceLanguage == "iw_IL" ? "left" : "right",
    fontSize: 15,
    color:"aliceblue",
  },

textHour:{
  color:"aliceblue",
  position:"absolute",
  right:0
}

});

export default Day;
