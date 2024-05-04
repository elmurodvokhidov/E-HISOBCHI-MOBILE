import {
    View,
    Text,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import coursebg from "../../assets/images/sticker.webp";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AuthService from '../../config/authService';
import {
    courseFailure,
    courseStart,
    getCourseSuccess
} from '../../redux/slices/courseSlice';
import Skeleton from '../../components/Skeleton';

const Courses = () => {
    const { auth } = useSelector(state => state.auth);
    const { course } = useSelector(state => state.course);
    const dispatch = useDispatch();
    const id = auth?.group.course._id;

    useEffect(() => {
        const getCourse = async () => {
            try {
                dispatch(courseStart());
                const { data } = await AuthService.getCourse(id);
                dispatch(getCourseSuccess(data));
            } catch (error) {
                dispatch(courseFailure(error.response?.data.message));
                Alert.alert("Error", error.response?.data.message || error.message);
            }
        };

        getCourse();
    }, [id]);

    return (
        <SafeAreaView>
            <ScrollView className="h-full pt-6 px-4">
                {
                    course ? <>
                        <View className="w-full shadow-sm overflow-hidden rounded bg-white">
                            <View className={`items-center justify-center gap-8 relative pt-14`} style={{ backgroundColor: course?.color }}>
                                <Text className="text-base font-bold text-white">{course?.title}</Text>
                                <View className="w-48">
                                    <Image
                                        className="w-full h-20"
                                        source={coursebg}
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>
                            <View className="gap-4 p-8">
                                <View>
                                    <Text className="text-xs text-gray-500">Description</Text>
                                    <Text className="text-base text-black">{course?.description}</Text>
                                </View>
                                <View>
                                    <Text className="text-xs text-gray-500">Price</Text>
                                    <Text className="text-sm text-black">{course?.price} UZS</Text>
                                </View>
                                <View>
                                    <Text className="text-xs text-gray-500">Course duration</Text>
                                    <Text className="text-sm text-black">{course?.course_duration} oy</Text>
                                </View>
                                <View>
                                    <Text className="text-xs text-gray-500">Lesson duration</Text>
                                    <Text className="text-sm text-black">{course?.lesson_duration} daqiqa</Text>
                                </View>
                            </View>
                        </View>
                    </> : <>
                        <Skeleton
                            parentWidth={100}
                            firstChildWidth={85}
                            secondChildWidth={50}
                            thirdChildWidth={65}
                        />
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Courses