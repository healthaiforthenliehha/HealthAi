import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const CustomButton = ({
  content,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-content w-full rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-content font-psemibold text-lg ${textStyles}`}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
