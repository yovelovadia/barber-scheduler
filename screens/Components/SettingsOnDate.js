import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import ClassicTextInput from "./ClassicTextInput";
import DayHourPick from "./DayHourPick";
import AsyncStoarge from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Notifications } from "expo";
import moment from "moment";
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
    notificationId: props.item.notificationId,
  });
  const dayPassed =
    new Date(`${data.day}T${data.hour}`) > new Date() ? false : true;

  async function deleteTor() {
    try {
      if (!dayPassed) {
        await Notifications.cancelScheduledNotificationAsync(
          props.item.notificationId
        );
      }
      await AsyncStoarge.removeItem(props.item.id);
      props.onPress();
      props.onRefresh();
    } catch (err) {
      alert("קרתה בעיה נסה שנית");
    }
  }

  async function updateTor() {
    if (dayPassed) {
      alert("נסה שנית... תאריך זה כבר עבר");
    } else {
      try {
        if (props.item.day + props.item.hour !== data.day + data.hour) {
          await Notifications.cancelScheduledNotificationAsync(
            props.item.notificationId
          );

          const notificationDate = moment(`${data.day}T${data.hour}`)
            .utc()
            .subtract("1", "hour")
            .toDate();

          let notificationId = await Notifications.scheduleLocalNotificationAsync(
            {
              title: "Swisa",
              body: `תור בשעה ${data.hour} על שם ${data.name}`,
              android: { channelId: "default" },
            },
            { time: notificationDate }
          );

          const dataWithId = data;
          data["notificationId"] = notificationId;
          const jsonValue = JSON.stringify(dataWithId);
          await AsyncStoarge.setItem(data.id, jsonValue);
          props.onPress();
          props.onRefresh();
        } else {
          const jsonValue = JSON.stringify(data);
          await AsyncStoarge.setItem(data.id, jsonValue);
          props.onPress();
          props.onRefresh();
        }
      } catch (err) {
        alert("קרתה בעיה נא נסה שנית");
      }
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
            <Icon
              name={"ios-phone-portrait"}
              size={40}
              color={"aliceblue"}
              style={styles.phoneIcon}
              onPress={() => Linking.openURL(`tel:${data.phone}`)}
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
              dateToday={moment(data.day + "T" + data.hour).format()}
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
  phoneIcon: {
    position: "absolute",
    alignSelf: "flex-start",
    top: 165,
    left: 40,
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
