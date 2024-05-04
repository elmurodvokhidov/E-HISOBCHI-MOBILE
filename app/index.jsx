import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import uitclogo from "../assets/images/uitc_logo.png";
import bgimage from "../assets/images/bg.jpg";
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../config/authService';
import {
    authFailure,
    authStart,
    authSuccess
} from '../redux/slices/authSlice';
import { router } from 'expo-router';

export default function App() {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState(null);
    const [authCred, setAuthCred] = useState({
        phoneNumber: "",
        password: "",
        huru: "student",
    });

    useEffect(() => {
        AsyncStorage.getItem("x-token")
            .then(token => setToken(token))
            .catch(error => console.error("Error retrieving token:", error));

        async function getUser() {
            try {
                const id = await AsyncStorage.getItem("x-id");
                const { data } = await AuthService.getStudent(id);
                dispatch(authSuccess(data));
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            getUser();
        }
    }, [dispatch, token]);

    // Sign in handler function
    const signHandler = async () => {
        dispatch(authStart());
        try {
            if (authCred.huru !== "" && authCred.phoneNumber !== "" && authCred.password !== "") {
                const { data } = await AuthService.studentLogin(authCred);
                AsyncStorage.setItem("x-token", data.token);
                dispatch(authSuccess(data));
            }
            else {
                dispatch(authFailure());
                Alert.alert("Error", "Iltimos, barcha bo'sh joylarni to'ldiring!");
            }
        } catch (error) {
            dispatch(authFailure(error.response?.data.message));
            Alert.alert("Error", error.response?.data.message || error.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/home");
        }
    }, [isLoggedIn]);

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                <View className="w-full h-full px-4 my-6 gap-y-4">
                    <Image
                        source={bgimage}
                        className="w-full h-32 rounded-lg"
                        resizeMode='cover'
                    />

                    <View className="px-6 py-12 rounded shadow-xl bg-white">
                        <Image
                            source={uitclogo}
                            className="w-40 h-40 rounded-lg m-auto"
                            resizeMode='cover'
                        />

                        {/* Phone Number Field */}
                        <View className="space-y-2 relative mt-10">
                            <Text className="absolute text-sm -top-0.5 font-medium left-3 z-10 text-gray-500 bg-white">
                                <Text>Telefon</Text>
                                <Text className="text-cyan-600 ml-1">*</Text>
                            </Text>
                            <View className="flex-row">
                                <TextInput
                                    className="w-1/4 h-12 items-center text-base border border-r-0 border-gray-300 rounded-l px-3 pb-2"
                                    value="+998"
                                    editable={false}
                                />
                                <TextInput
                                    className="w-3/4 h-12 px-2 rounded rounded-l-none border text-base font-nunitoregular border-gray-300 focus:border-cyan-600"
                                    value={authCred.phoneNumber}
                                    onChangeText={(e) => setAuthCred({ ...authCred, phoneNumber: e })}
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>

                        {/* Password Field */}
                        <View className="space-y-2 relative mt-5">
                            <Text className="absolute z-10 text-sm -top-0.5 font-medium left-3 text-gray-500 bg-white">
                                <Text>Password</Text>
                                <Text className="text-sm text-cyan-600 ml-1">*</Text>
                            </Text>
                            <TextInput
                                className="w-full h-12 px-2 rounded border text-base font-nunitoregular border-gray-300 focus:border-cyan-600"
                                value={authCred.password}
                                onChangeText={(e) => setAuthCred({ ...authCred, password: e })}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                className="absolute top-3 right-2 z-10"
                            >
                                <Ionicons
                                    name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={22}
                                    color="silver"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Sign in button */}
                        <CustomButton
                            title="Sign In"
                            handlePress={signHandler}
                            containerStyles="mt-10"
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};