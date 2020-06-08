import React, { useState } from "react";
import { View,  Platform, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const colors = require("../../colors.json")

const DayHourPick = (props) => {
  const [date, setDate] = useState(props.alreadyPickedDate || new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [timePicked, setTimePicked] = useState(
    props.timeValue || JSON.stringify(new Date()).slice(12, 17)
  );
  const [datePicked, setDatePicked] = useState(
    props.dateValue || JSON.stringify(new Date()).slice(1, 11)
  );
  const onChange = (event, selectedDate) => {
    console.log(selectedDate)
    console.log(new Date(event.nativeEvent.timestamp))
    const currentDate = selectedDate || date;
    console.log(selectedDate)
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (selectedDate) {
      const json = JSON.stringify(selectedDate);
      setTimePicked(json.slice(12, 17));
      setDatePicked(json.slice(1, 11));
      props.onSubmit([json.slice(1, 11), json.slice(12, 17)]);
    }
  };
  

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttons} onPress={showDatepicker}>
          בחר תאריך
        </Text>
        <Text style={styles.timeText}>{datePicked}</Text>
      </View>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttons} onPress={showTimepicker}>
          בחר שעה
        </Text>
        <Text style={styles.timeText}>{timePicked}</Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    display: "flex",
  },
  buttonTextContainer: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  buttons: {
    backgroundColor: colors.red,
    color: "aliceblue",
    fontSize: 18,
    width: 110,
    padding: 5,
    textAlign: "center",
    marginRight: 25,
  },

  timeText: {
    fontSize: 17,
    color:"aliceblue"

  },
});

export default DayHourPick;
