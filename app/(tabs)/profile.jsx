import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants"
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";
import { signOut } from "../../lib/appwrite";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/index");
  };


  let username = user?.username;
  if (!username) {
    username = 'Guest';
  }


  return (
    <SafeAreaView className="bg-gray-200 h-full text-base-100">
        <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border-2 border-primary rounded-lg justify-center items-center">
              <Image 
                source={ { uri: user?.avatar } }
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>



            <View className="mt-4 flex-col">
            <InfoBox 
               content={username}
               containerStyles="mt-1"
               titleStyles="text-2xl text-base-100"
               />
            </View>

        </View>

    </SafeAreaView>
  )
}


export default Profile
