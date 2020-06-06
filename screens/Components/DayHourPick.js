import React, { useState } from "react";
import { View, Button, Platform, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DayHourPick = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [timePicked, setTimePicked] = useState(
    JSON.stringify(new Date()).slice(12, 17)
  );
  const [datePicked, setDatePicked] = useState(
    JSON.stringify(new Date()).slice(1, 11)
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
        <Text>{datePicked}</Text>

        <Text style={styles.buttons} onPress={showDatepicker}>
          בחר תאריך
        </Text>
      </View>
      <View style={styles.buttonTextContainer}>
        <Text>{timePicked}</Text>
        <Text style={styles.buttons} onPress={showTimepicker}>
          בחר שעה
        </Text>
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
    paddingTop: 35,
    display: "flex",
    alignItems: "flex-end",
  },
  buttonTextContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },

  buttons: {
    backgroundColor: "#52aee3",
    color: "aliceblue",
    fontSize: 15,
    width: 110,
    padding: 10,
    textAlign: "center",
    marginLeft: 25,
  },
});

export default DayHourPick;
