import { Link, Redirect, Tabs } from 'expo-router'

import { useAuth } from '~/context/AuthProvider'
import { HeaderButton } from '../../components/HeaderButton'
import { TabBarIcon } from '../../components/TabBarIcon'

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
                    title: 'Tab One',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <HeaderButton />
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Tab Two',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
