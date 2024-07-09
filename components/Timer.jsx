import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import useTimer from '../iOS/useTimer';
import { images } from '../constants'

const Timer = () => {
    const { hours, minutes, seconds, milliseconds, isActive, toggleTimer, resetTimer } = useTimer();

    const formatTime = (time) => {
      return `${time < 10 ? '0' + time : time}`;
    };

  return (
    <View className="items-center mt-3">
      <View className="flex items-center text-base-100 w-full flex-col py-[20px] px-[30px] rounded-lg backdrop-blur-xl bg-primary/70 shadow-lg max-h-[80vh] max-w-[200px]">
        <Image  
          source={images.placeholder} // Passe den Pfad entsprechend deiner Ordnerstruktur an
          className="w-[13vh] h-[12.5vh]"// Beachte, dass `className` durch `style` ersetzt wurde
        />
        <View className="flex-row">
          <Text className="text-base-100 font-psemibold text-xl mt-2 text-center">Timer: <Text className="font-pmedium">{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:{formatTime(milliseconds)}</Text></Text>
        </View>
        <View className="flex-row mt-2">
          <TouchableOpacity onPress={toggleTimer} activeOpacity={0.65} className="bg-blue-500 px-3 py-2 rounded-md mr-2">
            <Text className="text-base-100 font-medium"> {isActive ? 'Stop' : 'Start'} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetTimer} activeOpacity={0.65} className="bg-red-500 px-3 py-2 rounded-md">
            <Text className="text-base-100 font-medium">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Timer;
