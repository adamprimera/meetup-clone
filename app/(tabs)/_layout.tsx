import { Link, Redirect, Tabs } from 'expo-router'

import { Calendar, User } from 'lucide-react-native'
import { useAuth } from '~/context/AuthProvider'
import { HeaderButton } from '../../components/HeaderButton'

export default function TabLayout() {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) return <Redirect href="/login" />

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Events',
                    tabBarIcon: ({ color }) => (
                        <Calendar size={24} color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <HeaderButton />
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}
