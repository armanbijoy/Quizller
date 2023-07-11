import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { englishData } from "./src/Questions";
import { useState } from "react";
import QuestionItem from "./QuestionItem";

const App = () => {
  const [currentState, setCurrentState] = useState(1);
  const [questions, setQuestions] = useState(englishData)


  const OnSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item,ind)=>{
      if(index===ind){
        item.marked = x
      }
    })
    let temp = [];
    tempData.map((item)=>{
      temp.push(item)
    })
    setQuestions(temp)

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
    </View>
  );
};

export default App;
