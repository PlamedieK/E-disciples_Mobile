import { View, Text, TextInput, KeyboardTypeOptions, ViewStyle, useColorScheme, ViewProps } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/Context/ThemeContext'
 type InputProps  = ViewProps & {
     textLabel?: string
     value: string
     placeholder?: string
     placeholderColor?: string
     secureTextEntry?: boolean
     keyboardType: KeyboardTypeOptions
     onChangeText: (text: string) => void
}
const InputTextLabel = ({ textLabel, value, onChangeText, secureTextEntry = false, placeholder, placeholderColor = '#333', keyboardType, style, ...rest }: InputProps) => {
    const colorScheme = useColorScheme()
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
          <TextInput
              style={{ 
                  backgroundColor: theme.background,
                  color: theme.textPrimary,
                  borderColor: theme.border
              }}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor || theme.placeholder}
              //inputMode="numeric"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                className="w-full py-2 px-4 border border-white text-white rounded-md text-left"
                // {...rest}
            />
    </View>
)
}

export default InputTextLabel