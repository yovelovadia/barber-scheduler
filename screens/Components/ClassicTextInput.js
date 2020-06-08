import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
const colors = require("../../colors.json")

function ClassicTextInput(props, ref) {
  const [value, setValue] = useState(null);

  return (
    <View style={styles.input_container}>
      <Text style={styles.name}>{props.inputName}</Text>
      <TextInput
        ref={ref}
        value={props.value}
        onSubmitEditing={props.onSubmit}
        keyboardType={props.keyboardType}
        style={styles.text_input}
        underlineColorAndroid="transparent"
        onChangeText={(text) => {
          setValue(text);
          props.onChangeText(text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input_container: {
    paddingTop: 50,
  },
  text_input: {
    borderBottomWidth: 1,
    borderBottomColor: "aliceblue",
    color:"aliceblue",
    width: 200,
    fontSize: 28,
    textAlign: "right",
    borderWidth: 0,
  },
  name: {
    color: colors.darkWhite,
    fontSize: 20,
  },
});

export default React.forwardRef(ClassicTextInput);
