import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Pressable, Text, TextInput, View } from 'react-native'
import { useAuth } from '~/context/AuthProvider'

import { supabase } from '~/utils/supabase'

export default function Profile() {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [fullName, setFullName] = useState('')

    const { session } = useAuth()

    useEffect(() => {
        if (session) getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, full_name, avatar_url`)
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setFullName(data.full_name)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
        full_name,
    }: {
        username: string
        website: string
        avatar_url: string
        full_name: string
    }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                full_name,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="flex-1 bg-white p-5 gap-4">
            <Stack.Screen options={{ title: 'Profile' }} />

            <TextInput
                editable={false}
                value={session.user.email}
                placeholder="Username"
                autoCapitalize={'none'}
                className="rounded-md border border-gray-200 p-3 text-gray-300"
            />
            <TextInput
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Username"
                autoCapitalize={'none'}
                className="rounded-md border border-gray-200 p-3"
            />
            <TextInput
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                placeholder="Full Name"
                autoCapitalize={'none'}
                className="rounded-md border border-gray-200 p-3"
            />
            <TextInput
                onChangeText={(text) => setWebsite(text)}
                value={website}
                placeholder="Website"
                autoCapitalize={'none'}
                className="rounded-md border border-gray-200 p-3"
            />
            <Pressable
                className="rounded-md bg-rose-500 py-3"
                disabled={loading}
                onPress={() =>
                    updateProfile({
                        username,
                        website,
                        full_name: fullName,
                        avatar_url: avatarUrl,
                    })
                }
            >
                <Text className="text-lg font-bold text-white text-center">
                    Save
                </Text>
            </Pressable>
            <Pressable
                className="rounded-md bg-rose-500 py-3"
                disabled={loading}
                onPress={() => supabase.auth.signOut()}
            >
                <Text className="text-lg font-bold text-white text-center">
                    Sign out
                </Text>
            </Pressable>
        </View>
    )
}
