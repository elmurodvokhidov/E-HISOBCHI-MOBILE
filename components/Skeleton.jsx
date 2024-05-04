import { View } from "react-native";

export default function Skeleton({
    parentWidth,
    firstChildWidth,
    secondChildWidth,
    thirdChildWidth,
}) {
    return (
        <View className="justify-center gap-1 p-8 shadow-sm animate-pulse bg-white" style={{ width: `${parentWidth}%` }}>
            <View className="h-4 rounded bg-gray-300" style={{ width: `${firstChildWidth}%` }}></View>
            <View className="h-4 rounded bg-gray-300" style={{ width: `${secondChildWidth}%` }}></View>
            <View className="h-4 rounded bg-gray-300" style={{ width: `${thirdChildWidth}%` }}></View>
        </View>
    )
};