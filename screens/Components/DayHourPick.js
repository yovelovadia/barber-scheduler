import React, { useState } from "react";
import { View, Platform, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const moment = require("moment");
const colors = require("../../colors.json");

const DayHourPick = (props) => {
  const momentToday = moment(new Date()).format();
  const [date, setDate] = useState(
    props.alreadyPickedDate || new Date(momentToday)
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [timePicked, setTimePicked] = useState(
    props.timeValue || JSON.stringify(momentToday).slice(12, 17)
  );
  const [datePicked, setDatePicked] = useState(
    props.dateValue || JSON.stringify(momentToday).slice(1, 11)
  );
  const onChange = (event, selectedDate) => {
    const currentDate = moment(selectedDate).format() || date;
    setShow(Platform.OS === "ios");
    setDate(new Date(currentDate));
    if (selectedDate) {
      setTimePicked(currentDate.slice(11, 16));
      setDatePicked(currentDate.slice(0, 10));
      props.onSubmit([currentDate.slice(0, 10), currentDate.slice(11, 16)]);
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
    color: "aliceblue",
  },
});

export default DayHourPick;
