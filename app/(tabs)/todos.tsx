import AddToDo from "@/components/AddToDo";
import TodoList from "@/components/TodoList";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

interface Todo {
  id: number;
  created_at: string;
  task: string;
  user_id: string;
  done: boolean;
}

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (session?.user.id) {
      fetchTodos();
    }
  }, [session?.user.id]);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data as Todo[]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (task: string) => {
    try {
      if (task.trim()) {
        const { data, error } = await supabase.from("todos").insert([
          {
            task,
            done: false,
            user_id: session?.user.id,
          },
        ]);

        if (error) {
          console.error("Error adding todo:", error);
        } else {
          fetchTodos();
        }
      }
    } catch (error) {
      console.error("Caught Error adding todo:", error);
    }
  };

  const toggleDone = async (id: number, done: boolean) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ done: !done })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error);
    } else {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo))
      );
    }
  };

  return (
    <View className="flex-1">
      <TodoList todos={todos} toggleDone={toggleDone} loading={loading} />
      <AddToDo addTodo={addTodo} />
    </View>
  );
};

export default TodoComponent;
