import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  CheckBox,
} from "react-native";
import { SearchBar } from "react-native-elements";
import AsyncStoarge from "@react-native-community/async-storage";
import Day from "./Components/Day";
import { FlatList } from "react-native-gesture-handler";

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
            days: daysAndAllDays.days || Object.keys(res).sort().reverse(),
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

  return (
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
            backgroundColor:
              daysAndAllDays.timePicked === "all" ? "#1c1c1c" : "#4a4a4a",
          }}
          onPress={() =>
            setDaysAndAllDays({
              allDays: [...daysAndAllDays.allDays],
              days: [...daysAndAllDays.allDays],
              timePicked: "all",
            })
          }
        >
          <Text style={styles.time_to_show_text}>הכל</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor:
              daysAndAllDays.timePicked === "week" ? "#1c1c1c" : "#4a4a4a",
          }}
          onPress={() =>
            setDaysAndAllDays({
              allDays: [...daysAndAllDays.allDays],
              days: dateWeek.reverse(),
              timePicked: "week",
            })
          }
        >
          <Text style={styles.time_to_show_text}>השבוע</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor:
              daysAndAllDays.timePicked === "day" ? "#1c1c1c" : "#4a4a4a",
          }}
          onPress={() =>
            setDaysAndAllDays({
              allDays: [...daysAndAllDays.allDays],
              days: [dateToday],
              timePicked: "day",
            })
          }
        >
          <Text style={styles.time_to_show_text}>היום</Text>
        </TouchableOpacity>
      </View>

      {filteredData ? (
        Object.keys(filteredData).length === 0 ? (
          <Text style={styles.notFound}>לא נמצא תור בשם זה</Text>
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
  );
}
const styles = StyleSheet.create({
  scroller: {},
  time_to_show: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 30,
  },
  time_to_show_text: {
    borderWidth: 2,
    fontSize: 30,
    padding: 10,
    borderColor: "aliceblue",
    color: "aliceblue",
    textAlign: "center",
  },
  notFound: { fontSize: 37, textAlign: "center", marginTop: 60 },
});

export default ShowDatesScreen;
