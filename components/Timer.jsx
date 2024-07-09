import {useState} from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import useTimer from '../iOS/useTimer';
import { images } from '../constants'
import {icons} from '../constants'

const Timer = () => {
    const { hours, minutes, seconds, milliseconds, isActive, toggleTimer, resetTimer } = useTimer();
    const [modalVisibleSecond, setModalVisibleSecond] = useState(false);

  const formatTime = (time) => {
    return `${time < 10 ? '0' + time : time}`;
  };

  const handleModalClose = () => {
    closeModal(setModalVisibleSecond);
  };

  const toggleSecondModal = () => {
    setModalVisibleSecond(!modalVisibleSecond);
  }

  return (
    <>
                <TouchableOpacity
            onPress={toggleSecondModal}
            activeOpacity={0.65}
            >
            <View className="items-center mt-3">
              <View
              className="flex items-center text-base-100 w-full flex-col py-[20px] px-[27px] rounded-lg backdrop-blur-xl bg-primary/70 shadow-lg max-w-[180px]"
              >
                
                <Image  
                  source={images.placeholder}
                  className="w-[13vh] h-[12.5vh]"
                  />
                  <View className="flex-row">
                  <Text className="text-base-100 font-medium mt-2 text-center">Start your Meditation</Text>
                  </View>
                  
              </View>
            </View>
            </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisibleSecond}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
        <View className="h-[450px] w-2/3 rounded-xl bg-white/90 justify-center items-center">

        <View className="items-center mt-3">
         <View className="flex items-center text-base-100 w-full flex-col py-[20px] px-[30px] rounded-lg backdrop-blur-xl bg-primary/70 shadow-lg max-h-[80vh] max-w-[200px]">
        <Image  
          source={images.placeholder}
          className="w-[13vh] h-[12.5vh]"
        />
        <View className="flex-row">
          <Text className="text-base-100 font-psemibold text-xl mt-2 text-center">Timer: <Text className="font-pmedium">{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:{formatTime(milliseconds)}</Text></Text>
        </View>
        <View className="flex-row mt-2">
          <TouchableOpacity onPress={toggleTimer} activeOpacity={0.65} className="bg-base-100 px-3 py-2 rounded-md mr-2">
            <Text className="text-white font-medium"> {isActive ? 'Stop' : 'Start'} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetTimer} activeOpacity={0.65} className="bg-gray-100 px-3 py-2 rounded-md">
            <Text className="text-base-100 font-medium">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <View className="flex-row">
          <Text className="text-lg mt-2 text-center font-pmedium">
            <Text className="text-primary text-2xl font-psemibold">"</Text>
            Close your eyes and relax<Text className="text-primary text-2xl font-psemibold">"</Text>
          </Text>
        </View>
        <TouchableOpacity
         onPress={() => { resetTimer(); toggleSecondModal()} }
 
        activeOpacity={0.65}
        className="mt-4"
        > 
        <View className="flex-row"> 
        <Image 
                source={icons.logout}
                className="w-4 h-4 mt-5 mr-1"
                resizeMode='contain'
                />
              <Text className="mt-4 text-base text-red-500 font-pregular">Exit Modal</Text>
        </View>

        </TouchableOpacity>
       </View>
     </View>
    </Modal>

    
        
     </>
  );
};

export default Timer;
