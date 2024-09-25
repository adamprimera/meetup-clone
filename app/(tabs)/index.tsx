import { Stack } from 'expo-router';
import EventListItem from '~/components/EventListItem';

import { FlatList } from 'react-native';
import events from '~/assets/events.json';

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem {...item} />}
        keyExtractor={(item) => item.id}
        className="bg-white"
      />
    </>
  );
}
