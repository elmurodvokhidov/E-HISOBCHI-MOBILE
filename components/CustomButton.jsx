import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-3xl justify-center items-center px-10 py-3.5 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        >
            <Text className={`font-nunitosemibold text-base text-primary ${textStyles}`}>
                {isLoading ? "Loading..." : title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton