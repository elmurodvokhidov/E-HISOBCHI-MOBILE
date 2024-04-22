import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { authLogout, authStart } from '../../redux/slices/authSlice';
import { router } from 'expo-router';

const Profile = () => {
    const { auth, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const logoutHandler = () => {
        dispatch(authStart());
        dispatch(authLogout());
        router.replace("/");
    };

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView>
                <View className="border border-gray-200 my-8 mx-4 py-6 px-4 rounded-md shadow-sm bg-white">
                    <View className="flex-row items-center gap-8">
                        <View className="w-20 h-20 items-center justify-center border-2 rounded-full border-secondary">
                            <MaterialIcons name="person" size={70} color="#0891B2" />
                        </View>
                        <Text className="text-2xl font-nunitoregular">{auth?.first_name} {auth?.last_name}</Text>
                    </View>

                    <View className="pt-6 gap-4">
                        <View className="flex-row items-center justify-between">
                            <Text className="font-nunitoregular text-gray-500 text-base">Phone number:</Text>
                            <Text className="font-nunitosemibold text-blue-500 text-base">+998 {auth?.contactNumber}</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="font-nunitoregular text-gray-500 text-base">Date of birthday:</Text>
                            <Text className="font-nunitosemibold text-base">{auth?.dob}</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="font-nunitoregular text-gray-500 text-base">Email address:</Text>
                            <Text className="font-nunitosemibold text-base">{auth?.email}</Text>
                        </View>

                        <View className="w-16 items-center rounded bg-gray-200">
                            <Text className="font-nunitoregular text-base">{auth?.gender}</Text>
                        </View>
                    </View>

                    {/* More */}
                    <View className="mt-2 flex-row justify-end">
                        <TouchableOpacity
                            onPress={() => setModal(!modal)}
                            className="w-20 flex-row items-center justify-center">
                            <MaterialIcons
                                name={modal ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                size={20}
                                color="black"
                            />
                            <Text className="text-base font-nunitomedium">More</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        modal ? <>
                            <View className="pt-6 gap-4">
                                <View className="flex-row items-center justify-between">
                                    <Text className="font-nunitoregular text-gray-500 text-base">Father's name:</Text>
                                    <Text className="font-nunitosemibold text-base">{auth?.father_name !== "" ? auth.father_name : "-"}</Text>
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <Text className="font-nunitoregular text-gray-500 text-base">Phone number:</Text>
                                    <Text className="font-nunitosemibold text-blue-300 text-base">{auth?.fatherContactNumber ? "+998 " + auth.fatherContactNumber : "-"}</Text>
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <Text className="font-nunitoregular text-gray-500 text-base">Mother's name:</Text>
                                    <Text className="font-nunitosemibold text-base">{auth?.mother_name !== "" ? auth.mother_name : "-"}</Text>
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <Text className="font-nunitoregular text-gray-500 text-base">Phone number:</Text>
                                    <Text className="font-nunitosemibold text-blue-300 text-base">{auth?.motherContactNumber ? "+998 " + auth.motherContactNumber : "-"}</Text>
                                </View>
                            </View>
                        </> : <></>
                    }

                    <CustomButton
                        title="Log out"
                        handlePress={logoutHandler}
                        containerStyles="mt-10"
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile