import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Modal from "react-native-modal";
import ClassicTextInput from "./ClassicTextInput";
import DayHourPick from "./DayHourPick";
import AsyncStoarge from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";
const colors = require("../../colors.json");

function SettingsOnDate(props) {
  const [data, setData] = useState({
    name: props.item.name,
    phone: props.item.phone,
    tor: props.item.tor,
    colorNumber: props.item.colorNumber,
    colorCompany: props.item.colorCompany,
    oxPrecentage: props.item.oxPrecentage,
    day: props.item.day,
    hour: props.item.hour,
    id: props.item.id,
  });

  async function deleteTor() {
    try {
      await AsyncStoarge.removeItem(props.item.id);
      props.onPress();
      props.onRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTor() {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStoarge.setItem(data.id, jsonValue);
      props.onPress();
      props.onRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal isVisible={props.isVisible.modal} onBackButtonPress={props.onPress}>
      <LinearGradient
        colors={[colors.lightGrey, colors.grey]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text onPress={props.onPress} style={styles.x}>
          X
        </Text>
        <ScrollView>
          <View style={styles.container}>
            <ClassicTextInput
              inputName={"שם"}
              onChangeText={(text) => setData({ ...data, name: text })}
              value={data.name}
            />
            <ClassicTextInput
              inputName={"טלפון"}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              onChangeText={(text) => setData({ ...data, phone: text })}
              value={data.phone}
            />
            <ClassicTextInput
              inputName={"תור"}
              onChangeText={(text) => setData({ ...data, tor: text })}
              value={data.tor}
            />
            <ClassicTextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              inputName={"מספר צבע"}
              onChangeText={(text) => setData({ ...data, colorNumber: text })}
              value={data.colorNumber}
            />
            <ClassicTextInput
              inputName={"אחוז חמצן"}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              onChangeText={(text) => setData({ ...data, oxPrecentage: text })}
              value={data.oxPrecentage}
            />
            <ClassicTextInput
              inputName={"חברת צבעים"}
              onChangeText={(text) => setData({ ...data, colorCompany: text })}
              value={data.colorCompany}
            />

            <DayHourPick
              alreadyPickedDate={new Date(data.day + "T" + data.hour)}
              dateValue={data.day}
              timeValue={data.hour}
              onSubmit={(value) => {
                setData({ ...data, hour: value[1], day: value[0] });
              }}
            />

            <View style={styles.buttonContainer}>
              <Text style={styles.cancel} onPress={props.onPress}>
                ביטול
              </Text>
              <Text style={styles.save} onPress={updateTor}>
                שמור וצא
              </Text>
            </View>
            <Text onPress={deleteTor} style={styles.delete}>
              מחק תור
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
}

export default SettingsOnDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 60,
    flexDirection: "row",
    marginBottom: 60,
  },
  cancel: {
    color: colors.lighterRed,
    marginRight: 80,
    fontSize: 17,
  },

  save: {
    fontSize: 17,
    color: "aliceblue",
  },
  delete: {
    marginBottom: 8,

    padding: 17,
    backgroundColor: colors.lighterRed,
    color: "aliceblue",
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 16,
  },
  x: {
    fontSize: 25,
    color: "aliceblue",
    textAlign: "center",
  },
});
