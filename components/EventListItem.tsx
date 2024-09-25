import { Bookmark, Share } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface EventListItemProps {
  title: string;
  description: string;
  datetime: string;
  location: string;
  image: string;
}

const EventListItem = (event: EventListItemProps) => {
  return (
    <View className="gap-3 p-3">
      <View className="flex-row ">
        <View className="flex-1 gap-2">
          <Text className="text-lg font-semibold uppercase text-amber-800">
            Wed 13, Sep · 19:30 CET
          </Text>
          <Text className="mr-4 truncate text-ellipsis text-xl font-bold" numberOfLines={1}>
            {event.title}
          </Text>
          <Text className="text-gray-700">{event.location}</Text>
        </View>

        <Image source={{ uri: event.image }} className="aspect-video w-2/5 rounded-xl" />
      </View>

      {/* Footer */}
      <View className="flex-row items-center justify-between gap-3">
        <Text className="mr-auto text-gray-700">16 going</Text>
        <Share size={20} color="gray" />
        <Bookmark size={20} color="gray" />
      </View>
    </View>
  );
};

export default EventListItem;
