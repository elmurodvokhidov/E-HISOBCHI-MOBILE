import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import herobg from "../../assets/images/hero-background.png";
import { days } from '../../config/days';
import { useSelector } from 'react-redux';

const Home = () => {
    const { auth, } = useSelector(state => state.auth);
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const date = (new Intl.DateTimeFormat("en-US", { dateStyle: "full" })).format(now);

    return (
        <SafeAreaView>
            <ScrollView className="h-full pt-6 px-4">
                <View className="w-full h-32 relative rounded-md overflow-hidden">
                    <Image
                        source={herobg}
                        className="w-full h-full"
                        resizeMode='cover'
                    />
                    <View className="absolute top-8 left-4">
                        <Text className='text-4xl font-nunitoextrabold text-primary'>{time}</Text>
                        <Text className='text-lg font-nunitomedium text-primary'>{date}</Text>
                    </View>
                </View>

                <View className="w-full items-start p-4 mt-6 rounded-md cursor-pointer bg-white shadow-sm">
                    <View className="text-xs font-nunitomedium rounded px-2 py-1 bg-gray-200">
                        <Text>{auth?.group?.name}</Text>
                    </View>
                    <View className="flex-row items-start justify-between gap-6">
                        <Text className="text-sm font-semibold transition-all duration-300">
                            {auth?.group?.teacher.first_name} {auth?.group?.teacher.last_name}
                        </Text>
                        <View className="items-start">
                            <Text className="text-sm text-gray-500">{auth?.group?.start_date}-</Text>
                            <Text className="text-sm text-gray-500">{auth?.group?.end_date}</Text>
                        </View>
                        <View>
                            <Text className="font-nunitomedium text-sm text-gray-500">{days.find(day => day.value === auth.group?.day)?.title}</Text>
                            <Text className="font-nunitomedium text-sm text-gray-500">{auth?.group?.start_time}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home