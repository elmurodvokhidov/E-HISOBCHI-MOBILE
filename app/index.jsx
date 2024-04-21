import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uitclogo from "../assets/images/uitc_logo.png";
import CustomButton from '../components/CustomButton';

export default function App() {
    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full justify-center items-center px-4">
                    <Image
                        source={uitclogo}
                        className="w-[400px] h-[350px]"
                        resizeMode='contain'
                    />

                    <CustomButton
                        title="Let's sign in"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor='#f8f8f8' style='dark' />
        </SafeAreaView>
    );
};