import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mt-2">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && !isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#06AB78",
          tabBarInactiveTintColor: "#30313D",
          tabBarStyle: {
            backgroundColor: "#e5e7eb",
            borderTopWidth: 1,
            borderTopColor: "#d1d5db",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
