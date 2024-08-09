import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SettingsIcon, CircleXIcon } from "lucide-react-native";
import { signOut } from "../../lib/appwrite";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import CustomButton from "../../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { token } from "../../lib/appwrite";

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [triggerModal, setTriggerModal] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  let username = user?.username;
  if (!username) {
    username = "Guest";
  }

  const toggleModal = () => {
    setTriggerModal(!triggerModal);
  };

  const handleAiLink = () => {
    router.push("/healthai");
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [currentTime, setCurrentTime] = useState("");

  const confirmDelete = () => {
    Alert.alert(
      "Function wasnt add until yet",
      "Return later, to delete your account!"
    );
  };

  const confirmNewEmail = () => {
    Alert.alert(
      "Function wasnt add until yet",
      "Return later, to recover your email!"
    );
  };

  const confirmNewPassword = () => {
    Alert.alert(
      "Function wasnt add until yet",
      "Return later, to recover your password!"
    );
  };

  return (
    <SafeAreaView className="h-full bg-background-100">
      <View className="flex my-6 px-4 space-y-6">
        <View className="flex justify-between items-center flex-row mb-6">
          <View>
            <Text className="font-pmedium text-xl text-base-100">
              Welcome Back
            </Text>
            <Text className="text-3xl font-psemibold text-primary">
              {user?.username}
            </Text>
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.6} onPress={toggleModal}>
              <View>
                <SettingsIcon size={40} color="#06AB78" />
              </View>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={triggerModal}
              onRequestClose={toggleModal}
            >
              <View className="flex-1 justify-center items-center bg-white/10 bg-opacity-50">
                <View className="w-[40vh] p-6 bg-background-200 h-[60vh] rounded-2xl shadow-lg">
                  <View className="w-full justify-center items-center mt-6 mb-12">
                    <TouchableOpacity
                      onPress={logout}
                      className="flex w-full items-end mb-10"
                    >
                      <Image
                        source={icons.logout}
                        resizeMode="contain"
                        className="w-6 h-6 mr-2"
                      />
                      <Text className="text-red-400">Logout</Text>
                    </TouchableOpacity>

                    <View className="w-16 h-16 border-2 border-primary rounded-lg justify-center items-center">
                      <Image
                        source={{ uri: user?.avatar }}
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
                    <CustomButton
                      content="Reset password"
                      handlePress={confirmNewPassword}
                      containerStyles="mt-6 bg-gray-700 min-h-[45px] w-11/12 rounded-3xl"
                      textStyles="text-white"
                    />
                    <CustomButton
                      content="Reset email"
                      handlePress={confirmNewEmail}
                      containerStyles="mt-4 bg-gray-700 min-h-[45px] w-11/12 rounded-3xl"
                      textStyles="text-white"
                    />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={confirmDelete}
                    >
                      <Text className="text-red-500 text-xl font-pmedium mt-4">
                        Delete your Account
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleModal}
                      activeOpacity={0.7}
                      className="flex-row"
                    >
                      <View className="mt-[40px] mr-[3px]">
                        <CircleXIcon size={20} color="#FFFFFF" />
                      </View>
                      <Text className="text-content font-psemibold text-lg mt-9">
                        Close profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View className="flex-row">
          <CustomButton
            content="Continue with Email"
            handlePress={() => token}
            containerStyles={"mt-2 bg-primary"}
          />
        </View>
      </View>
      <StatusBar backgroundColor="#06AB78" style="light" />
    </SafeAreaView>
  );
};

export default Home;
