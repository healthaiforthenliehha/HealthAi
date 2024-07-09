import { View, Text, Image } from 'react-native';
import { Tabs, Redirect} from 'expo-router';
import { icons } from "../../constants";


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mt-2">
      <Image
        source={icon}
        resizeMode='contain'
        className="w-6 h-6"
        tintColor={color}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
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
          tabBarActiveTintColor: '#06AB78',
          tabBarInactiveTintColor: '#30313D',
          tabBarStyle: {
            backgroundColor: '#e5e7eb',
            borderTopWidth: 1,
            borderTopColor: '#d1d5db',
            height: 84,
          }
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
            )
          }}
        />
      <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Workout"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="healthai"
          options={{
            title: "HealthAi",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="HealthAi"
                focused={focused}
              />
            )
          }}
        />

        
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
};


export default TabsLayout;
