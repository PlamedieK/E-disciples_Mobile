import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
 type InputProps  = {
     textLabel?: string
     value: string
     placeholder?: string
     placeholderColor?: string
     secureTextEntry?: boolean
     keyboardType: KeyboardTypeOptions
     onChangeText: (text: string) => void
}
const InputTextLabel = ({ textLabel, value, onChangeText, secureTextEntry = false, placeholder, placeholderColor ='#333', keyboardType, ...rest}: InputProps) => {
  return (
    <View className='items-start justify-start'>
        <Text className="text-base text-white py-1.5">
                {textLabel}
            </Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                //inputMode="numeric"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                className="w-full py-2 px-4 border border-white text-white rounded-md text-left"
                {...rest}
            />
    </View>
)
}

export default InputTextLabel