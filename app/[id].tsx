import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Calendar, ChevronRight, MapPin } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import events from '~/assets/events.json';

const EventPage = () => {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);
  if (!event) {
    return <Text>Event not found</Text>;
  }
  return (
    <View className="h-full space-y-4 bg-white p-4">
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <Image source={{ uri: event.image }} className="mb-2 h-64 w-full rounded-lg" />
      <Text className="mb-4 text-3xl font-bold">{event.title}</Text>
      <View className="mb-4 flex-row items-center gap-4 border-b-2 border-gray-100">
        <Calendar size={24} color="black" />
        <View className="mr-auto gap-1">
          <Text className="text-lg font-bold">
            {dayjs(event.datetime).format('dddd, D MMMM YYYY')}
          </Text>
          <Text>{dayjs(event.datetime).format('h:mm A')}</Text>
        </View>
        <ChevronRight size={24} color="lightgrey" />
      </View>
      <View className="mb-4 flex-row items-center gap-4 border-b-2 border-gray-100">
        <MapPin size={24} color="black" />
        <View className="mr-auto gap-1">
          <Text className="text-lg font-bold">{event.location}</Text>
          <Text>{event.location}</Text>
        </View>
        <ChevronRight size={24} color="lightgrey" />
      </View>
      <Text className="text-lg">{event.description}</Text>
    </View>
  );
};

export default EventPage;
