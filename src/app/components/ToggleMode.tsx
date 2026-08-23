import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useTheme } from '@/Context/ThemeContext'

const ToggleMode = () => {
  const { isDark, toggleTheme, theme } = useTheme()

  return (
    <View 
    //   style={{ 
    //     backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
    //   }} 
    className="flex-row items-center px-3 py-1.5 "
>
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={toggleTheme}
    className="flex-row items-center gap-2"
    >
    <Text 
        style={{ color: theme.textPrimary }} 
        className="text-xs font-semibold tracking-wide uppercase"
    >
        {isDark ? 'Sombre' : 'Clair' }
    </Text>
    
    <Switch
        trackColor={{ false: '#CBD5E1', true: '#1E3A8A' }}
        thumbColor={isDark ? '#16A34A' : '#FFFFFF'}
        ios_backgroundColor="#CBD5E1"
        onValueChange={toggleTheme}
        value={isDark}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], width: 50, height: 50 }}
        
    />
    </TouchableOpacity>
</View>
)
}

export default ToggleMode