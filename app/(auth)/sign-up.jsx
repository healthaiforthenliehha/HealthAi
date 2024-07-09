import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from "../../lib/appwrite"
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
     <SafeAreaView className="bg-primary h-full">
          <ScrollView>
            <View className="w-full justify-center min-h-[70vh] px-4 my-6 h-full">
               <Image source={images.placeholder}
               resizeMode='contain'
               className="w-[115px] h-[35px]"
               />

               <Text className="text-white text-2xl mt-10 font-psemibold text-semibold">Sign up to HealthAi</Text>

               <FormField 
               title="Username"
               value={form.username}
               handleChangeText={(e) => setForm({...form, username: e})}
               otherStyles="mt-10"
               />
               <FormField 
               title="Email"
               value={form.email}
               handleChangeText={(e) => setForm({...form, email: e})}
               otherStyles="mt-4"
               keyboardType="email-address"
               />
                <FormField 
               title="Password"
               value={form.password}
               handleChangeText={(e) => setForm({...form, password: e})}
               otherStyles="mt-4"
               />

               <CustomButton 
               content="Sign Up"
               handlePress={submit}
               containerStyles="mt-14"
               isLoading={isSubmitting}
               />

              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100 font-pregular">
                  Have an account already?
                </Text>
                <Link href='/sign-in' className='text-lg font-psemibold text-base-100'>Sign in!</Link>
              </View>
            </View>
          </ScrollView>
     </SafeAreaView>
  )
}

export default SignUp