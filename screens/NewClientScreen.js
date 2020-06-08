import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Platform,
} from "react-native";
import ClassicTextInput from "./Components/ClassicTextInput";
import DayHourPick from "./Components/DayHourPick";
import AsyncStoarge from "@react-native-community/async-storage";

function NewClientScreen() {
  const day = JSON.stringify(new Date()).slice(1, 11);
  const hour = JSON.stringify(new Date()).slice(12, 17);
  const [data, setData] = useState({
    day,
    hour,
  });

  let id = idMaker(16);

  async function saveNewClient() {
    try {
      let dataWithId = data;
      dataWithId["id"] = id;
      const jsonValue = JSON.stringify(dataWithId);
      await AsyncStoarge.setItem(id, jsonValue);
      alert("לקוח חדש!");
    } catch (err) {
      console.log(err);
    }
  }

  const nameRef = useRef();
  const phoneRef = useRef();
  const torRef = useRef();
  const colorNumberRef = useRef();
  const oxPrecentageRef = useRef();
  const colorCompanyRef = useRef();

  function idMaker(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ClassicTextInput
            ref={nameRef}
            inputName={"שם"}
            onChangeText={(text) => setData({ ...data, name: text })}
            onSubmit={() => {
              phoneRef.current.focus();
            }}
          />
          <ClassicTextInput
            ref={phoneRef}
            inputName={"טלפון"}
            keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
            onChangeText={(text) => setData({ ...data, phone: text })}
            onSubmit={() => {
              torRef.current.focus();
            }}
          />
          <ClassicTextInput
            ref={torRef}
            inputName={"תור"}
            onChangeText={(text) => setData({ ...data, tor: text })}
            onSubmit={() => {
              colorNumberRef.current.focus();
            }}
          />
          <ClassicTextInput
            ref={colorNumberRef}
            inputName={"מספר צבע"}
            keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
            onChangeText={(text) => setData({ ...data, colorNumber: text })}
            onSubmit={() => {
              oxPrecentageRef.current.focus();
            }}
          />
          <ClassicTextInput
            ref={oxPrecentageRef}
            inputName={"אחוז חמצן"}
            keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
            onChangeText={(text) => setData({ ...data, oxPrecentage: text })}
            onSubmit={() => {
              colorCompanyRef.current.focus();
            }}
          />
          <ClassicTextInput
            ref={colorCompanyRef}
            inputName={"חברת צבעים"}
            onChangeText={(text) => setData({ ...data, colorCompany: text })}
          />

          <DayHourPick
            onSubmit={(value) => {
              setData({ ...data, hour: value[1], day: value[0] });
            }}
          />

          <TouchableHighlight
            onPress={saveNewClient}
            underlayColor={"#0299f7"}
            style={styles.submit}
          >
            <Text style={styles.submitText}> תור חדש</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
  },
  submit: {
    marginTop: 50,
    marginBottom: 30,
    backgroundColor: "#a6d8f5",
    padding: 18,
  },

  submitText: {
    fontSize: 20,
  },
});

export default NewClientScreen;
