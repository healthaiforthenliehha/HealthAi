import { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Touchable } from 'react-native';
import { images } from '../constants';
import { icons } from '../constants';
import { initTracking, getUsageTime, resetTracking } from '../iOS/AppUsage';
import useStepTracker from '../iOS/useStepTracker';
import { useGlobalContext } from '../context/GlobalProvider';
import InfoBox from './InfoBox';
import { AppState } from 'react-native';
import useTimer from '../iOS/useTimer';

const StatisticModal = () => {
  const { stopTimerSound } = useTimer();
  const [usageTime, setUsageTime] = useState({ minutes: 0, seconds: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const { stepCount, isPedometerAvailable } = useStepTracker();
  const { user, setUser } = useGlobalContext();
  const { hours, minutes, seconds, milliseconds, isActive, toggleTimer, resetTimer } = useTimer();
  const [modalVisibleSecond, setModalVisibleSecond] = useState(false);
  const { dailyMinutes } = useTimer();

const formatTime = (time) => {
  return `${time < 10 ? '0' + time : time}`;
};

const handleModalClose = () => {
  closeModal(setModalVisibleSecond);
};

const toggleSecondModal = () => {
  setModalVisibleSecond(!modalVisibleSecond);
}

  const [count, setCount] = useState(0);
  const startHour = 7;  // 7 Uhr
  const endHour = 22;   // 22 Uhr

  // useEffect for count
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    // Initialen Count basierend auf der aktuellen Stunde berechnen
    if (currentHour >= startHour && currentHour <= endHour) {
      const initialCount = (currentHour - startHour) * 200;
      setCount(initialCount);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      if (currentHour >= startHour && currentHour <= endHour) {
        setCount((prevCount) => prevCount + 200);
      }
    }, 3600000); // 3600000 ms = 1 Stunde

    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    setCount(prevCounter => Math.max(prevCounter - 200, 0)); // Decrease by 200, but not below 0
  };

// username update
const username = user?.username;
if (!username) {
  username = 'Guest';
} 

// usagetime
const updateUsageTime = async () => {
  const time = await getUsageTime();
  const minutes = Math.floor(time);
  const seconds = ((time % 1) * 60).toFixed(0);
  setUsageTime({ minutes, seconds });
};

useEffect(() => {
  initTracking();
  updateUsageTime(); // Initiale Aktualisierung

  const subscription = AppState.addEventListener('change', updateUsageTime);
  return () => {
    subscription.remove();
  };
}, []);

const toggleModal = () => {
  setModalVisible(!modalVisible);
  if (!modalVisible) {
    updateUsageTime(); // Aktualisiere die Nutzungszeit, wenn das Modal geöffnet wird
  }
};

  return (
    <> 
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={toggleModal} activeOpacity={0.65}>
          <View className="items-center text-base-100 w-full pb-2 rounded-lg backdrop-blur-xl bg-primary/70 shadow-md mt-5 flex-col min-w-[42.58vh] max-h-[15vh]">
            <View className="flex-row justify-between w-full px-4 py-3 mt-1 mb-1">
            <View className="flex-col items-center">
               <Text className="text-3xl ml-1">📱</Text>
               <Text className="text-xl text-white ml-[0.7vh]">{usageTime.minutes}min</Text>
               </View>
               <View className="flex-col items-center">
               <Text className="text-3xl">👟</Text>
               <Text className="text-xl text-white">{stepCount}</Text>
               </View>
               <View className="flex-col items-center">
               <Text className="text-3xl">🍶</Text>
               <Text className="text-xl text-white mr-2">{count}ml</Text>
               </View>
               <View className="flex-col items-center">
               <Text className="text-3xl mr-1">🧘</Text>
               <Text className="text-xl text-white mr-2">{Math.floor(dailyMinutes)}min</Text>
               </View>
               
               
            </View>
          <Text className="mt-3 text-sm text-base-100 font-pmedium">Statistics</Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        

        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="h-[450px] w-2/3 rounded-xl bg-white/95 justify-start items-center">
          <View className="w-16 h-16 border-2 border-primary rounded-lg justify-center items-center mt-8">
              <Image 
                source={ { uri: user?.avatar } }
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>



            <View className="mt-2 flex-col">
            <InfoBox 
               content={username}
               titleStyles="text-2xl text-base-100 text-xl mb-3"
               />
            </View>

            <Text className="text-lg text-base-100">📱Screen-Time: {usageTime.minutes} minutes</Text>
            <Text className="text-lg text-base-100 mr-12">👟Today's Steps: {stepCount}</Text>
            <Text className="text-lg text-base-100 ml-5">🍶Need to drink: {count}ml today</Text>
            <Text className="text-lg text-base-100 mr-3">🧘You have meditated for {Math.floor(dailyMinutes)} minutes today</Text>
            
            {/* <Text className="text-lg text-base-100">Pedometer Available: {isPedometerAvailable}</Text> */}
          <View className="justify-end items-center mt-8"> 

            <TouchableOpacity activeOpacity={0.65} onPress={toggleModal} className="flex-row">
               <Image 
                source={icons.ai}
                className="w-5 h-5 mt-[1vh] mr-1"
                resizeMode='contain'
                />
              <Text className="mt-2 text-green-500 text-base font-pregular">Use HealthAi</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.65} onPress={toggleModal} className="flex-row">
               <Image 
                source={icons.download}
                className="w-5 h-5 mt-[1vh] mr-1"
                resizeMode='contain'
                />
              <Text className="mt-2 text-blue-500 text-base font-pregular">Download file</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.65} onPress={toggleModal} className="flex-row">
                <Image 
                source={icons.logout}
                className="w-4 h-4 mt-5 mr-1"
                resizeMode='contain'
                />
              <Text className="mt-4 text-base text-red-500 font-pregular">Exit Modal</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
      </Modal>
    </View>

    <View className="justify-between flex-row mt-3">
            <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.65}
            >
            <View className="items-center mt-3">
              <View
              className="flex items-center text-base-100 w-full flex-col py-[20px] px-[20px] rounded-lg backdrop-blur-xl bg-primary/70 shadow-lg max-w-[180px]"
              >
                
                <Image  
                  source={images.placeholder}
                  className="w-[13vh] h-[12.5vh]"
                  />
                  <View className="flex-row">
                  <Text className="text-base-100 font-medium mt-2 text-center">Click everytime you drink!</Text>
                  </View>
                  
              </View>
            </View>
            </TouchableOpacity>
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
        <Text className="text-sm mt-1 text-red-500 text-center font-pregular">'Warning, put your headphones out!'</Text>
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
            </View>

    </>
  );
};

export default StatisticModal;
