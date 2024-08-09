import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
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
    <SafeAreaView className="bg-background-100 h-full">
      <View className="w-full flex justify-center h-full px-4 my-6">
        <Text className="text-3xl font-semibold text-white mt-10 font-psemibold">
          Sign Up to <Text className="text-primary">HealthAi!</Text>
        </Text>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-4"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-4"
        />

        <CustomButton
          content="Sign Up"
          handlePress={submit}
          containerStyles="mt-10 bg-primary"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-1">
          <Text className="text-lg text-gray-100 font-pregular">
            Already have an account?
          </Text>
          <Link href="/sign-in" className="text-lg font-psemibold text-primary">
            Sign in!
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
