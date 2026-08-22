import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
type ButtonLoadingProps = {
    //fonction: ({ ...rest }: any) => void
    fonction: () => void | Promise<void>; 
    disabled: true

}
const ButtonLoading = ({disabled, fonction}: ButtonLoadingProps) => {
  return (
        <View className="py-3">
            <TouchableOpacity
            onPress={ () => fonction} // 9CA3AF
            disabled={disabled}
            className={`flex justify-center items-center py-4 rounded-md ${disabled ? 'bg-[#9CA3AF]' : 'bg-blue-400'} `} >
            {
                disabled ? (
                <ActivityIndicator size={"small"} color={'fff'}/>
                )
                :
                (
                    <Text className="text-white text-xl">Tester</Text>
                )
            }
            </TouchableOpacity>
        </View>
  )
}

export default ButtonLoading