import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { englishData } from "./src/Questions";
import { useRef, useState } from "react";
import QuestionItem from "./QuestionItem";
const { height, width } = Dimensions.get('window')



const App = () => {
  const [currentState, setCurrentState] = useState(1);
  const [questions, setQuestions] = useState(englishData);
  const listRef = useRef(new An)

  const OnSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      if (index === ind) {
        item.marked = x;
        setCurrentState(x)
      }
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginTop: 50,
          marginLeft: 20,
          color: "black",
        }}
      >
        Questions:{" " + currentState + "/" + englishData.length}
      </Text>

      <View style={{ marginTop: 30 }}>
        <FlatList 
          onScroll={e=> {
            const x = e.nativeEvent.contentOffset.x/width
            setCurrentState(x.toFixed(0))
          }}
          horizontal
          data={questions}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                data={item}
                selectedOption={(x) => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: 50,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft:20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            height: 50,
            width: 100,
            borderRadius: 10,
            marginRight:20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
