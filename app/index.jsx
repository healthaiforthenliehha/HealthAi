import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router, Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants"
import CustomButton from '../components/CustomButton'
import {useGlobalContext} from "../context/GlobalProvider"

export default function App() {
const {isLoading, isLoggedIn} = useGlobalContext();

if(!isLoading && isLoggedIn) return <Redirect href="/home"/>

let currentDate = new Date();

let currentYear = currentDate.getFullYear();

  return (
  
   <SafeAreaView className="bg-gray-200 h-full">
     <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center px-4 h-full">

          <Image
          source={images.placeholder}
          className="max-w-[380px] h-[300px] w-full"
          resizeMode='contain'
          />

          <View className="flex items-start mt-10">
            <Text className="text-base-100 text-3xl font-bold mb-15">{`Enhance the future of your\n`} 
              <Text className="mt-15">health with{' '}{' '}
                <Text className="text-primary text-[38rem] tracking-wide mt-5">HealthAi.</Text>
              </Text> 
              </Text>
            <Image 
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 ml-[210px]"
            resizeMode='contain'
            />
          </View>
          <Text className="text-sm font-pregular text-base-100 mb-10 mt-4 text-center">
          Your personal AI for health offering tailored care, proactive health monitoring and more to enhance your overall well-being.
          </Text> 
          <TouchableOpacity className="mt-8 ml-2 mb-1 w-full"> 
              <Link href="/sign-in"> 
              <Text className="flex flex-row font-pmedium text-sm">Already have an Account?{' '}<Text className="text-secondary-200">Sign in!</Text></Text> 
              </Link>

        </TouchableOpacity>

          <CustomButton 
          content='Continue with Email'
          handlePress={() => router.push('/sign-up')}
          containerStyles={'mt-2 bg-primary'}
          />
          <CustomButton 
          handlePress={() => router.replace('/profile')}
          content='Continue without Email'
          containerStyles={'mt-5 bg-primary'}
          />

      <View className="flex justify-start items-start">
        <Text className="-bottom-6">&copy;{' '}{currentYear} </Text>
        </View>
          </View>
     </ScrollView>

     <StatusBar backgroundColor='#06AB78' style='dark'/>
   </SafeAreaView>
  );
}
