import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import {images} from '../../constants'
import {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import StatisticModal from '../../components/StatisticModal'

const Home = () => {
  const { user, setUser } = useGlobalContext();
 
  const handleHospitalChange = () => {

  }
  const [currentTime, setCurrentTime] = useState('');

  const handleAiLink = () => {
    router.push('/healthai')
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    
    <SafeAreaView className="h-full bg-gray-200">
      <ScrollView> 

          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-xl text-base-100">
                  Welcome Back
                </Text>
                <Text className="text-3xl font-psemibold text-primary">
                  {user?.username}
                </Text>
                
              </View>
            <View className="mt-1.5">
                <Image
                  source={images.logoG}
                  className="w-16 h-16"
                  resizeMode="contain"
                />
              </View>
            </View>

            <TouchableOpacity
            onPress={handleAiLink}
            activeOpacity={0.65}
            >
            <View className="items-center mt-3">
              <View
              className="items-center text-base-100 w-full flex-row pt-8 rounded-custom-card-left backdrop-blur-xl bg-primary/70 shadow-lg"
              >
                <View className="relative items-start justify-start"> 
                <Image  
                  source={images.placeholder}
                  className="w-[15vh] h-[17vh] rounded-custom-bottom-left"
                  />
                  </View>
                  <View className="flex-col"> 
                  <Text className="text-3xl font-psemibold ml-9 mb-3 text-base-100">{`Try out\n`}
                    <Text className="text-base-100">{`HealthAi!\n`}</Text>
                    
                    <Text className="text-base text-base-100">{`your personal Doctor`}</Text></Text>   

                  </View>
              </View>
            </View>
            </TouchableOpacity>
            
            <StatisticModal />

            

            
            
          </View>
          </ScrollView>
          </SafeAreaView>
    
  )
}

export default Home