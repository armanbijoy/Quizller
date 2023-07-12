import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { englishData } from "./src/Questions";
import { useRef, useState } from "react";
import QuestionItem from "./QuestionItem";
const { height, width } = Dimensions.get("window");

const App = () => {
  const [currentState, setCurrentState] = useState(1);
  const [questions, setQuestions] = useState(englishData);
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef();

  const OnSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      if (index === ind) {
        item.marked = x;
        
      }
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };

  const getaTextScore = () => {
    let marks = 0;
    questions.map((item, ind) => {
      if (item.marked != -1) {
        
        marks = marks + 5;
      }
    });
    return marks;
  };

  const reset = ()=>{

    const tempData = questions;
    tempData.map((item, ind) => {
   
        item.marked = -1;
       
      
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);

  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",

            marginLeft: 20,
            color: "black",
          }}
        >
          Questions:{" " + currentState + "/" + englishData.length}
        </Text>
        <Text style={{ marginRight:20, fontSize:20, fontWeight:'600', color:'black'}} onPress={()=>{

            reset()
            listRef.current.scrollToIndex({animated: true, index:0})


        }}>Reset</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <FlatList
          ref={listRef}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentState(x.toFixed(0));
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
            backgroundColor: currentState > 1  ? "purple" : 'gray',
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (currentState > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentState) - 1 - 1,
              });
            }
          }}
        >
          <Text style={{ color: "#fff" }}>Previous</Text>
        </TouchableOpacity>
        {currentState == 8 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "purple",
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if(questions[currentState-1].marked != -1)
              {
                if (currentState < questions.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentState,
                  });
                }
              }
              
            }}
          >
            <Text style={{ color: "#fff" }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",

              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              Score:
            </Text>

            <Text
              style={{
                fontSize: 40,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
                color: "green",
              }}
            >
              {getaTextScore()}
            </Text>

            <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
