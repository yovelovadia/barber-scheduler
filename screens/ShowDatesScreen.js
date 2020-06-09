import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SearchBar } from "react-native-elements";
import AsyncStoarge from "@react-native-community/async-storage";
import Day from "./Components/Day";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
const colors = require("../colors");

const dateToday = new Date().toJSON().split("T")[0];
let dateWeek = [];

for (let i = 0; i < 7; i++) {
  const date = new Date();
  const day = new Date(date.setDate(date.getDate() + i));
  dateWeek.push(day.toJSON().split("T")[0]);
}

function ShowDatesScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState(null);
  const [dataInDb, setDataInDB] = useState(null);
  const [daysAndAllDays, setDaysAndAllDays] = useState({ timePicked: "all" });
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    let unmounted = false;

    async function getKeys() {
      const takingDbData = [];
      try {
        const keys = await AsyncStoarge.getAllKeys();
        const result = await AsyncStoarge.multiGet(keys);
        result.forEach((data) => {
          takingDbData.push(JSON.parse(data[1]));
        });
      } catch (err) {
        console.log(err);
      }
      return takingDbData;
    }

    function sortEverything(takingDbData) {
      const splittingInDays = {};
      if (takingDbData) {
        takingDbData.forEach((event) => {
          if (splittingInDays[event.day]) {
            splittingInDays[event.day] = [...splittingInDays[event.day], event];
          } else {
            splittingInDays[event.day] = [event];
          }
        });
        return splittingInDays;
      }
    }

    if (!unmounted) {
      getKeys()
        .then((res) => sortEverything(res))
        .then((res) => {
          setDataInDB(res);
          setFilteredData(res);
          setDaysAndAllDays({
            days:
              daysAndAllDays.timePicked === "all"
                ? Object.keys(res).sort().reverse()
                : daysAndAllDays.days || Object.keys(res).sort().reverse(),
            allDays: Object.keys(res).sort().reverse(),
            timePicked: daysAndAllDays.timePicked,
          });
        })
        .then(() => setRefreshing(false))

        .catch((err) => console.log(err));
    }
    return () => {
      unmounted = true;
    };
  }, [refreshing]);

  function searchInDB(search) {
    let completed_filtered_list = {};
    setSearch(search);
    if (daysAndAllDays.allDays.length !== 0) {
      const filterToSearch = daysAndAllDays.days.map((data) =>
        dataInDb[data].filter((res) => {
          return Object.keys(res).find((item) => {
            return res[item].indexOf(search) !== -1;
          });
        })
      );
      filterToSearch.forEach((item) => {
        if (item !== "undefined" && item.length > 0) {
          completed_filtered_list[item[0].day] = item;
        }
      });
      setFilteredData(completed_filtered_list);
    }
  }
  return (
    <LinearGradient
      colors={[colors.grey, colors.lightBlack]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder={"חיפוש"}
          onChangeText={searchInDB}
          value={search}
        />
        <View style={styles.time_to_show}>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() =>
              setDaysAndAllDays({
                allDays: [...daysAndAllDays.allDays],
                days: [...daysAndAllDays.allDays],
                timePicked: "all",
              })
            }
          >
            <Text
              style={[
                styles.time_to_show_text,
                {
                  backgroundColor:
                    daysAndAllDays.timePicked === "all"
                      ? colors.red
                      : colors.grey,
                },
              ]}
            >
              הכל
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() =>
              setDaysAndAllDays({
                allDays: [...daysAndAllDays.allDays],
                days: dateWeek.reverse(),
                timePicked: "week",
              })
            }
          >
            <Text
              style={[
                styles.time_to_show_text,
                {
                  backgroundColor:
                    daysAndAllDays.timePicked === "week"
                      ? colors.red
                      : colors.grey,
                },
              ]}
            >
              השבוע
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() =>
              setDaysAndAllDays({
                allDays: [...daysAndAllDays.allDays],
                days: [dateToday],
                timePicked: "day",
              })
            }
          >
            <Text
              style={[
                styles.time_to_show_text,
                {
                  backgroundColor:
                    daysAndAllDays.timePicked === "day"
                      ? colors.red
                      : colors.grey,
                },
              ]}
            >
              היום
            </Text>
          </TouchableOpacity>
        </View>

        {filteredData ? (
          Object.keys(filteredData).length === 0 ? (
            <Text style={styles.notFound}>לא נמצאו תורים</Text>
          ) : null
        ) : null}

        {daysAndAllDays ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            style={styles.scroller}
            data={daysAndAllDays.days}
            keyExtractor={(event) => event}
            renderItem={(event) => (
              <Day
                dateToday={dateToday}
                dates={filteredData[event.item]}
                name={event.item}
                onRefresh={() => setRefreshing(true)}
              />
            )}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroller: {},
  time_to_show: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 30,
    borderBottomWidth: 1,
    backgroundColor: colors.lightBlack,
  },
  time_to_show_text: {
    borderWidth: 2,
    fontSize: 29,
    margin: 8,
    borderRadius: 20,
    borderColor: colors.grey,
    color: "aliceblue",
    textAlign: "center",
  },
  notFound: {
    color: "aliceblue",
    fontSize: 37,
    textAlign: "center",
    marginTop: 60,
  },
});

export default ShowDatesScreen;
