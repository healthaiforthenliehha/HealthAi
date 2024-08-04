import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { router, Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect } from "react";

export default function App() {
  let currentDate = new Date();

  let currentYear = currentDate.getFullYear();

  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <View className="w-full justify-center items-center px-4">
        <Image
          source={images.homeCover}
          className="w-[780px] h-[430px] ml-2"
          resizeMode="contain"
        />

        <View className="flex items-start">
          <Text className="text-base-100 text-3xl font-bold mb-15">
            {`Enhance the future of your\n`}
            <Text className="mt-15">
              health with{" "}
              <Text className="text-primary text-[37rem] tracking-wide mt-5">
                HealthAi.{" "}
              </Text>
            </Text>
          </Text>
          <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 ml-[210px]"
            resizeMode="contain"
          />
        </View>
        <Text className="text-sm font-pregular text-base-100 mt-4 text-center mb-20">
          Your personal AI for health offering tailored care, proactive health
          monitoring and more to enhance your overall well-being.
        </Text>
        <TouchableOpacity className=" ml-2 mb-1 w-full">
          <Link href="/sign-in">
            <Text className="flex flex-row font-pmedium text-sm">
              Already have an Account?{" "}
              <Text className="text-secondary-200">Sign in!</Text>
            </Text>
          </Link>
        </TouchableOpacity>

        <CustomButton
          content="Continue with Email"
          handlePress={() => router.push("/sign-up")}
          containerStyles={"mt-2 bg-primary"}
        />

        <View className="flex justify-start items-start">
          <Text className="-bottom-6">&copy; {currentYear} </Text>
        </View>
      </View>

      <StatusBar backgroundColor="#06AB78" style="dark" />
    </SafeAreaView>
  );
}
