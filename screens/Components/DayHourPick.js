import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const moment = require("moment");
const colors = require("../../colors.json");

const DayHourPick = (props) => {
  const timePicked = props.dateToday;
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(timePicked));

  const [showTime, setShowTime] = useState({
    hour: JSON.stringify(timePicked).slice(12, 17),
    day: JSON.stringify(timePicked).slice(1, 11),
  });
  useEffect(() => {
    // incase coming from dates screen and pressing plus
    if (props.navigation) {
      setShowTime({ hour: showTime.hour, day: props.navigation.data });
      setDate(
        new Date(
          `${props.navigation.data}T${JSON.stringify(timePicked).slice(12, 17)}`
        )
      );
    }
  }, [props.navigation]);

  function handleChange(event, selectedDate) {
    setShow(false);
    const currentDate = moment(selectedDate).format() || moment(date).format();
    setDate(new Date(currentDate));
    if (selectedDate) {
      setShowTime({
        day: currentDate.slice(0, 10),
        hour: currentDate.slice(11, 16),
      });
      props.onSubmit([currentDate.slice(0, 10), currentDate.slice(11, 16)]);
    }
  }

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
        <Text style={styles.timeText}>{showTime.day}</Text>
      </View>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttons} onPress={showTimepicker}>
          בחר שעה
        </Text>
        <Text style={styles.timeText}>{showTime.hour}</Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={handleChange}
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
