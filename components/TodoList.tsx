import React from "react";
import { View, Text } from "react-native";
import { Checkbox, ScrollView, Spinner } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import "../global.css";

interface Todo {
  id: number;
  done: boolean;
  task: string;
}

interface TodoListProps {
  todos: Todo[];
  toggleDone: (id: number, done: boolean) => void;
  loading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleDone, loading }) => {
  return (
    <ScrollView className="my-10">
      {loading ? (
        <View className="flex items-center justify-center h-full">
          <Spinner color="white" size="large" />
        </View>
      ) : todos.length === 0 ? (
        <Text className="text-white text-center text-2xl">No tasks left!</Text>
      ) : (
        <>
          {todos.map((todo, index) => (
            <View key={index} className="flex-row items-start px-3 py-4">
              <Checkbox
                checked={todo.done}
                onCheckedChange={() => toggleDone(todo.id, todo.done)}
                size="$5"
                className="mt-1 mr-1"
              >
                <Checkbox.Indicator>
                  <FontAwesome name="check" />
                </Checkbox.Indicator>
              </Checkbox>
              <Text
                style={{
                  textDecorationLine: todo.done ? "line-through" : "none",
                  color: todo.done ? "gray" : "white",
                  marginLeft: 8,
                }}
                className="text-xl flex-wrap max-w-[85%]"
              >
                {todo.task}
              </Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default TodoList;
