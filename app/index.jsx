import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { router, Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  let currentDate = new Date();

  let currentYear = currentDate.getFullYear();

  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-background-100 h-full">
      <View className="w-full justify-center items-center px-4">
        <Image
          source={images.placeholder}
          className="w-4/6 h-[430px]"
          resizeMode="contain"
        />

        <View className="flex items-start">
          <Text className="text-gray-100 text-3xl font-bold mb-15">
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
            className="w-[136px] h-[15px] absolute -bottom-[9px] ml-[210px]"
            resizeMode="contain"
          />
        </View>
        <Text className="text-sm font-pmedium text-gray-400 mt-5 text-center mb-20">
          Your personal AI for health offering tailored care, proactive health
          monitoring and more to enhance your overall well-being.
        </Text>
        <TouchableOpacity className="ml-2 mb-1 w-full">
          <Link href="/sign-in">
            <Text className="flex flex-row font-pmedium text-sm font-s text-gray-200">
              Already have an Account?{" "}
              <Text className="text-primary">Sign in!</Text>
            </Text>
          </Link>
        </TouchableOpacity>

        <CustomButton
          content="Continue with Email"
          handlePress={() => router.push("/sign-up")}
          containerStyles={"mt-2 bg-primary"}
        />

        <View className="flex justify-start items-start">
          <Text className="-bottom-6 text-content">&copy; {currentYear} </Text>
        </View>
      </View>

      <StatusBar backgroundColor="#06AB78" style="light" />
    </SafeAreaView>
  );
}
