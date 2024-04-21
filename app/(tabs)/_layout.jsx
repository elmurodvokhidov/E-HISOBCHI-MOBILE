import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const TabsIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center pt-2">
      <MaterialIcons name={icon} size={28} color={color} />
      <Text
        className={`${focused ? "font-nunitosemibold" : "font-nunitoregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#0891B2",
          tabBarInactiveTintColor: "#CDCDE0"
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={"home"}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="courses"
          options={{
            title: "Courses",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={"library-books"}
                color={color}
                name="Courses"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={"chat"}
                color={color}
                name="Chats"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                icon={"person"}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout