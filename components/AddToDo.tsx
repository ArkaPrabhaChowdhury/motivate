import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Sheet, Input, Button } from "tamagui";
import { useState, useRef, useEffect } from "react";

const AddToDo = ({ addTodo }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (sheetOpen) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [sheetOpen]);

  const handleAdd = async () => {
    addTodo(newTask);
    setNewTask("");
    setSheetOpen(false);
  };
  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setSheetOpen(true)}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[35]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame className="bg-black">
          <Sheet.Handle />

          <View className="mt-4">
            <Input
              ref={inputRef}
              value={newTask}
              onChangeText={setNewTask}
              onSubmitEditing={handleAdd}
              placeholder="Enter a new task"
            />
          </View>
          <View className="mt-8 px-24">
            <Button onPress={handleAdd}>Add Task</Button>
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "red",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});

export default AddToDo;
