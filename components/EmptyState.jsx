import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ content, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4 h-[75vh]">
      <Image
        source={images.placeholder}
        resizeMode="contain"
        className="w-[270px] h-[216px] mb-5"
      />

      <Text className="text-sm font-pmedium text-base-100">{subtitle}</Text>
      <Text className="text-xl text-center font-psemibold text-base-100 mt-2">
        {content}
      </Text>

      <CustomButton
        content="Let Ai help you to eat more healthy"
        handlePress={() => router.replace("/home")}
        containerStyles="mt-5 bg-primary"
        textStyles="text-white"
      />
    </View>
  );
};

export default EmptyState;