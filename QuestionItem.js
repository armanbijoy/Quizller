import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");



const QuestionItem = ({ data, selectedOption}) => {
  return (
    <View style={{ width: width }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "550",
          color: "black",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {"Ques: " + data.question}
      </Text>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={data.Options}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 60,
                  elevation: 3,
                  backgroundColor: data.marked === index+1 ? 'red' : "#fff",
                  marginTop: 10,
                  marginBottom: 10,
                  alignSelf: "center",

                  paddingLeft: 15,
                  flexDirection: "row",
                }} onPress={()=>{
                    selectedOption(index+1)
                }}
              >
                <View
                  style={{
                    marginTop: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "cyan",
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>
                    {index === 0
                      ? "A"
                      : index === 1
                      ? "B"
                      : index === 2
                      ? "C"
                      : "D"}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 18,
                    fontWeight: "600",
                    marginLeft: 20,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default QuestionItem;