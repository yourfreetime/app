import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import style from "./FormPost.style";

const FormPostScreen = () => {
  const [text, setText] = useState("");
  return (
    <View style={style.container}>
      <Text>Form Post Screen</Text>
      <TextInput
        style={style.input}
        placeholder="Type something"
        multiline
        numberOfLines={4}
        onChangeText={newText => setText(newText)}
        value={text}
      />
    </View>
  );
};

export default FormPostScreen;
