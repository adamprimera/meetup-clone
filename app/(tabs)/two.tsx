import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Button } from '~/components/Button'

import { ScreenContent } from '~/components/ScreenContent'
import { supabase } from '~/utils/supabase'

export default function Home() {
    return (
        <>
            <Stack.Screen options={{ title: 'Tab Two' }} />
            <View style={styles.container}>
                <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
                <Button
                    title="Sign out"
                    onPress={() => supabase.auth.signOut()}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
})
