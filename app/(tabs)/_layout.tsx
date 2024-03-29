import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function LogoutIcon({ color }: { color: string }) {
  return <FontAwesome name="sign-out" color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    // Add your logout logic here
    console.log("Logging out...");

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }
    router.replace("/sign-in");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <TabBarIcon name="sign-out" color="white" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <TabBarIcon name="sign-out" color="white" />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
