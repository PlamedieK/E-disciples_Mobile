import { View, Text, TextInput, KeyboardTypeOptions, ViewStyle, useColorScheme, ViewProps, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@react-native-vector-icons/ionicons'
import { useTheme } from '@/Context/ThemeContext'
 type InputProps  = ViewProps & {
     textLabel?: string
     value: string
     placeholder?: string
     placeholderColor?: string
     secureTextEntry?: boolean
     keyboardType: KeyboardTypeOptions
     onChangeText: (text: string) => void
     isPassword?: boolean
}
const InputTextLabel = ({ textLabel, value, onChangeText, secureTextEntry = false, placeholder, placeholderColor = '#333', keyboardType, style, isPassword = false, ...rest }: InputProps) => {
    //const colorScheme = useColorScheme()
    const [isHidePassword, setIsHidePassword] = useState(secureTextEntry)
    const { theme } = useTheme()
  return (
    <View className='items-start justify-start'>
        {
            textLabel && (
                <Text
                    style={{ color: theme.textPrimary }}
                    className="text-base text-white py-1.5">
            {textLabel}
        </Text>
            )
        }   
        <View className={`w-full flex-col items-start relative`}>
            <TextInput
            style={[
                { 
                backgroundColor: theme.background,
                color: theme.textPrimary,
                borderColor: theme.border
            }
            ]}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor || theme.placeholder}
              //inputMode="numeric"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize="none"
                secureTextEntry={isPassword ? isHidePassword : secureTextEntry}
                autoCorrect={false}
                className={`w-full py-2 px-4 ${isPassword ? 'pr-12' : ''} border rounded-xl text-left`}
                // {...rest}
        />
        {
            isPassword && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsHidePassword(!isHidePassword)}
                    className="right-4 p-1 "
                    >
                        <Text style={{color: theme.textPrimary, textDecorationLine: 'underline'}} className={`text-sm underline mx-3`}>
                            {isHidePassword ? 'Voir le mot de password' : 'Cacher le mot de password'}
                        </Text>
                    {/* <Ionicons
                        name={isHidePassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={theme.textSecondary}
                    /> */}
                </TouchableOpacity>
            )
        }
        </View>

    </View>
)
}
{/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setHideText(!hideText)}
            className="absolute right-4 p-1"
          >
            <Ionicons
              name={hideText ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.textSecondary ?? '#94A3B8'}
            /> */}
         // </TouchableOpacity>


export default InputTextLabel