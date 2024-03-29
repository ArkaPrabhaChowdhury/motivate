import { Text, View } from "@/components/Themed";
import { Keyboard, StyleSheet } from "react-native";
import { Button, TextArea } from "tamagui";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
export default function TabTwoScreen() {
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    console.log(content);
    Keyboard.dismiss();
  };

  return (
    <View className="px-4 py-1">
      <Text className="py-5 text-2xl text-center">
        How are you feeling today?
      </Text>
      <TextArea
        size="$5"
        borderWidth={1}
        borderColor="gray"
        placeholder="Describe your day"
        onChangeText={(text) => setContent(text)}
      />
      <View className="mt-12">
        <Button className="mx-24" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
}
