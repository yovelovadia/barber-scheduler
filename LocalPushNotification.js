import React, { useState } from "react";
import { Text, View, Button, Vibration, Platform } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
// import { requestNotifications } from "react-native-permissions";
import moment from "moment";

function LocalPushNotification() {
  const [state, setState] = useState({ expoPushToken: "", notification: {} });
  console.log(moment(new Date()).add("3", "minute"));
  console.log(typeof moment(new Date()).add("3", "minute"));

  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("יש לאפשר התראות בכדי לקבל הודעות בנוגע לתורים ");
        return;
      }
      console.log("niggerrrr");
      token = await Notifications.getExpoPushTokenAsync();
      console.log("probaly here");

      console.log(token);
      setState({ expoPushToken: token });
    }

    if (Platform.OS === "android") {
      Notifications.scheduleLocalNotificationAsync(
        {
          name: "default",
          sound: true,
          priority: "max",
          vibrate: [0, 250, 250, 250],
        },
        moment(new Date()).add("9", "seconds")
      );
    }
  }

  return (
    <View>
      <Text
        style={{ backgroundColor: "red", fontSize: 30 }}
        onPress={registerForPushNotificationsAsync}
      >
        sdsdsdsds
      </Text>
    </View>
  );
}

export default LocalPushNotification;
