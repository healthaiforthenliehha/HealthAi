import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Link } from "expo-router"
import { images } from '../constants'

let currentDate = new Date();

let currentYear = currentDate.getFullYear();

const LinkSection = ({ customStyles }) => {
  return (
    <View className={`flex items-center flex-row ${customStyles}`}> {/* customStyles={'-bottom-9 gap-[190px]'} */}
      <View className="flex items-center flex-row">
        <Text>&copy;{' '}{currentYear} </Text>
        <Image 
        source={images.placeholder}
        className="w-9 h-9 ml-1"
        />
     </View>
     <TouchableOpacity> 
      <Link href='https://www.google.com'>
      <Text 
      className="text-base-100"
      >About us</Text></Link>
      </TouchableOpacity>
    </View>
  )
} 

export default LinkSection