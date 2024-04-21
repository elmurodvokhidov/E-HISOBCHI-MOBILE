import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
    return (
        <View className="h-screen items-center justify-center">
            <Text className="text-base font-nunitoregular">Hello world!</Text>
            <StatusBar style="auto" />
        </View>
    );
};