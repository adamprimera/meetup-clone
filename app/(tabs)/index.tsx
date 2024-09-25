import { Stack } from 'expo-router';
import EventListItem from '~/components/EventListItem';

import events from '~/assets/events.json';

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      {events.map((event) => (
        <EventListItem
          key={event.id}
          title={event.title}
          description={event.description}
          datetime={event.datetime}
          location={event.location}
          image={event.image}
        />
      ))}
    </>
  );
}
