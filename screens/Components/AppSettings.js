import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
const colors = require("../../colors.json");

function AppSettings(props) {
  useEffect(() => {
    async function askPermission() {
      // asks permissions for notifications
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
        alert("יש להפעיל התראות בהגדרות של הטלפון בכדי לקבל עדכונים על תורים");
        return false;
      }
      return true;
    }
    askPermission();
    if (Platform.OS === "android") {
      // creating channel for notifications
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: true,
      });
    }
  }, []);
  useEffect(() => {
    async function deleteOldData() {
      const dateToday = moment(new Date()).subtract("30", "days").toDate();
      const allTheEvents = [];
      const allTheKeysToRemove = [];
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      result.forEach((data) => {
        allTheEvents.push(JSON.parse(data[1]));
      });
      allTheEvents.forEach((item) => {
        if (moment(dateToday).isAfter(`${item.day}T${item.hour}`)) {
          allTheKeysToRemove.push(item.id);
        }
      });
      if (allTheKeysToRemove.length !== 0) {
        AsyncStorage.multiRemove(allTheKeysToRemove);
      }
    }
    deleteOldData();
  }, []);

  // const [notifications, setNotifications] = useState(true);

  // useEffect(() => {
  //   async function checkSettings() {
  //     let settings = await AsyncStoarge.getItem("settings");
  //     if (!settings) {
  //       await AsyncStoarge.setItem(
  //         "settings",
  //         JSON.stringify({
  //           approveNotifications: true,
  //         })
  //       );
  //     }
  //     setNotifications(settings.approveNotifications);
  //   }
  //   checkSettings();
  // }, []);

  // async function changeSettings() {
  //   let settings = await AsyncStoarge.getItem("settings");
  //   await AsyncStoarge.setItem(
  //     "settings",
  //     JSON.stringify({
  //       approveNotifications: notifications,
  //     })
  //   );
  //   setNotifications(!notifications);
  // }

  return (
    <Modal isVisible={props.toggleSettings} onBackButtonPress={props.onPress}>
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
            <View style={styles.switchTextContainer}>
              <Text style={styles.text}>
                אזהרה! {"\n"} במידה והטלפון נכבה\עשה ריסטרט כל ההתראות על
                התאריכים שקבעת יבוטלו אנסה לטפל בבעיה זאת בהמשך אך אנא אל תכבה
                את הטלפון.
                {"\n\n"}שלום{"\n"}תהנה מהאפליקציה מקווה שהיא תעזור לך אם יש
                תקלות או מקומות לשיפור תאמר :){"\n\n"} במידה ותרצה לחפש תאריכים
                מסוימים בחיפוש תוכל לעשות זאת כך: 2020-07-05 {"\n"} נא הקפד על
                האפסים והסדר הזה כך תוכל למצוא כל תאריך {"\n\n"} התראות ישלחו
                שעה לפני כל תור ואם תרצה לבטל אותם תוכל לבטל דרך ההגדרות
                בטלפון(שאל את מאי אם צריך) {"\n\n"} תורים מלפני חודש ומעלה ימחקו
                אוטומטית
              </Text>
              {/* <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: colors.darkWhite }}
                thumbColor={notifications ? colors.lighterRed : null}
                onValueChange={changeSettings}
                value={notifications}
              /> */}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
}

export default AppSettings;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },

  x: {
    fontSize: 25,
    color: "aliceblue",
    textAlign: "center",
  },

  switch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
  text: {
    fontSize: 27,
    color: "aliceblue",
    textAlign: "center",
  },

  switchTextContainer: {
    alignItems: "center",
    marginTop: 30,
  },
});
