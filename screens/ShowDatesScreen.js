import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import AsyncStoarge from "@react-native-community/async-storage";
import Day from "./Components/Day";
import { FlatList } from "react-native-gesture-handler";

function ShowDatesScreen() {
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState(null);
  const [dataInDb, setDataInDB] = useState(null);
  const [days, setDays] = useState(null);
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
          setDays(Object.keys(res).sort().reverse());
        })
        .catch((err) => console.log(err));
    }

    return () => {
      unmounted = true;
    };
  }, [refresh]);

  function searchInDB(search) {
    let completed_filtered_list = {};
    setSearch(search);
    const filterToSearch = days.map((data) =>
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
    <View>
      <SearchBar
        placeholder={"חיפוש"}
        onChangeText={searchInDB}
        value={search}
      />
      <Text
        onPress={() => {
          setRefresh(refresh + 1);
          setSearch(null);
        }}
      >
        refresh
      </Text>
      {days ? (
        <FlatList
          style={styles.scroller}
          data={days}
          keyExtractor={(event) => event}
          renderItem={(event) => (
            <Day dates={filteredData[event.item]} name={event.item} />
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroller: {
    marginBottom: 90,
  },
});

export default ShowDatesScreen;
