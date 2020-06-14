import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ClassicTextInput from "./Components/ClassicTextInput";
import DayHourPick from "./Components/DayHourPick";
import AsyncStoarge from "@react-native-community/async-storage";
import { Notifications } from "expo";
import moment from "moment";
const colors = require("../colors.json");

function NewClientScreen(navigation) {
  let momentDay = moment(new Date()).format();
  const day = momentDay.slice(0, 10);
  const hour = momentDay.slice(11, 16);
  const [data, setData] = useState({
    day,
    hour,
  });
  useEffect(() => {
    // incase coming from dates screen and pressing plus
    if (navigation.route.params) {
      setData({ hour: data.hour, day: navigation.route.params.data });
    }
  }, [navigation.route.params]);

  useEffect(() => {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: true,
    });
  }, []);

  let id = idMaker(16);

  async function saveNewClient() {
    try {
      if (new Date(`${data.day}T${data.hour}`) < new Date()) {
        alert("נסה שנית... תאריך זה כבר עבר");
      } else {
        const notification = await sendScheduledNotification();
        let dataWithId = data;
        dataWithId["id"] = id;
        dataWithId["notificationId"] = notification;
        const jsonValue = JSON.stringify(dataWithId);
        await AsyncStoarge.setItem(id, jsonValue);
        setData({ day: data.day, hour: data.hour });
        Alert.alert("", "לקוח חדש נוצר");
      }
    } catch (err) {
      alert("קרתה בעיה נא נסה שנית");
    }

    async function sendScheduledNotification() {
      const notificationDate = moment(`${data.day}T${data.hour}`)
        .utc()
        .subtract("1", "hour")
        .toDate();

      let notificationId = await Notifications.scheduleLocalNotificationAsync(
        {
          title: "תור",
          body: `תור בשעה ${data.hour}`,
          android: { channelId: "default" },
        },
        { time: notificationDate }
      );
      return notificationId;
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
    <LinearGradient
      colors={[colors.grey, colors.lightBlack]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <ClassicTextInput
              ref={nameRef}
              inputName={"שם"}
              value={data.name}
              onChangeText={(text) => setData({ ...data, name: text })}
              onSubmit={() => {
                phoneRef.current.focus();
              }}
            />
            <ClassicTextInput
              ref={phoneRef}
              inputName={"טלפון"}
              value={data.phone}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              onChangeText={(text) => setData({ ...data, phone: text })}
              onSubmit={() => {
                torRef.current.focus();
              }}
            />
            <ClassicTextInput
              ref={torRef}
              inputName={"תור"}
              value={data.tor}
              onChangeText={(text) => setData({ ...data, tor: text })}
              onSubmit={() => {
                colorNumberRef.current.focus();
              }}
            />
            <ClassicTextInput
              ref={colorNumberRef}
              inputName={"מספר צבע"}
              value={data.colorNumber}
              onChangeText={(text) => setData({ ...data, colorNumber: text })}
              onSubmit={() => {
                oxPrecentageRef.current.focus();
              }}
            />
            <ClassicTextInput
              ref={oxPrecentageRef}
              inputName={"אחוז חמצן"}
              value={data.oxPrecentage}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              onChangeText={(text) => setData({ ...data, oxPrecentage: text })}
              onSubmit={() => {
                colorCompanyRef.current.focus();
              }}
            />
            <ClassicTextInput
              ref={colorCompanyRef}
              inputName={"חברת צבעים"}
              value={data.colorCompany}
              onChangeText={(text) => setData({ ...data, colorCompany: text })}
            />

            <DayHourPick
              navigation={navigation.route.params}
              dateToday={momentDay}
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
    </LinearGradient>
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
    backgroundColor: colors.darkWhite,
    padding: 18,
  },

  submitText: {
    fontSize: 20,
  },
});

export default NewClientScreen;
