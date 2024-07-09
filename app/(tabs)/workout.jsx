import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants"
import EmptyState from '../../components/EmptyState'




const Workout = () => {

const [modalVisible, setModalVisible] = useState(false);

const toggleModal = () => {
  setModalVisible(!modalVisible)
}

  return (
    <SafeAreaView className="h-full bg-gray-200">
      <ScrollView>
        <View className="items-end justify-end mr-4 mt-4 flex-row">
          <Text className="mb-2 mr-2 text-lg font-pmedium text-base-100">
           Share your Workout
          </Text>
          <TouchableOpacity
          onPress={toggleModal}
          activeOpacity={0.65}
          >
           <View className="w-12 h-12 rounded-3xl bg-primary shadow-md">
             <Image 
             source={icons.plus}
             className="w-12 h-12"
             />
           </View>
          </TouchableOpacity>
        </View>

           <EmptyState
           subtitle="No Workout found until yet"
           content="Show Ai what your training for!"
           customStyles='mt-[18vh]'
         />

               
       <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
         <View className="flex-1 justify-center items-center bg-black/50">
          <View className="h-[400px] w-2/3 rounded-xl bg-white/95 justify-center items-center">
        <TouchableOpacity 
        onPress={toggleModal}
        > 
       <Text className="text-blue-500">Exit Modal</Text>
       </TouchableOpacity>
       </View>
     </View>
    </Modal>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Workout