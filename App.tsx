import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  EventDetails: { eventId: number };
  ConfirmBooking: { eventId: number; tickets: number; selectedTimes?: string[] };
  About: undefined;
};

const Stack = createNativeStackNavigator();

const events = [
  {
    id: 1,
    image: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/sites/92/2025/02/24100634/ZITP2024_0906_191508-0168_JAE-scaled.jpg',
    name: 'Lost in Dreams',
    location: 'Los Angeles • 4pm',
    price: 80,
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,f_auto,h_1200,q_auto,w_1200/v1715007144/p3in7ffjqolwmrmf6iag.jpg',
    name: 'Cherry Blossom Tour',
    location: 'New York City • multiple times',
    price: 30,
    showtimes: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
  },
  {
    id: 3,
    image: 'https://houseofdezign.com/wp-content/uploads/2024/07/Painting-on-Canvas-for-Adults.jpg',
    name: 'Paint and Wine',
    location: 'Huntington Beach • 7pm',
    price: 25,
  },
  {
    id: 4,
    image: 'https://images.squarespace-cdn.com/content/v1/57c46e6737c581f0c4d501ce/312addfd-933d-4330-8d6c-d921883d7c9e/MyCheekyDate+LA+Dating',
    name: 'Speed Dating',
    location: 'Los Angeles • multiple times',
    price: 15,
    showtimes: ['5:00 PM', '6:30 PM', '8:00 PM'],
  },
  {
    id: 5,
    image: 'https://www.sftravel.com/sites/default/files/styles/scale_lg/public/2022-10/hardly-strictly-bluegrass.jpg.webp?itok=277EpxMy',
    name: 'Jazz in the Park',
    location: 'San Francisco • 6pm',
    price: 20,
  },
  {
    id: 6,
    image: 'https://sites.bu.edu/gastronomyblog/files/2017/07/raohe-night-market-taiwan.jpg',
    name: 'Night Market Food Tour',
    location: 'Seattle • multiple times',
    price: 40,
    showtimes: ['5:00 PM', '6:00 PM', '7:30 PM'],
  },
  {
    id: 7,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSsg394jCHcx03C9QTN3Dn6LrjbWa_2cjTvg&s',
    name: 'Outdoor Movie Night',
    location: 'San Diego • 8pm',
    price: 10,
  },
  {
    id: 8,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlXl38wo2AMkOjCuDzSuO9d5fKvPhaQL8QQEEaRxs_DyvX8iUrvPXQYhOtztn26aJieA&usqp=CAU',
    name: 'Sunset Yoga',
    location: 'Santa Monica • 6:30pm',
    price: 18,
  },
  {
    id: 9,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm6mF-DUZP7mXbh89yP4oEA4Ty4d3YsxLi_w&s',
    name: 'Museum After Dark',
    location: 'Chicago • multiple times',
    price: 22,
    showtimes: ['6:00 PM', '7:00 PM', '8:30 PM'],
  },
  {
    id: 10,
    image: 'data:image/jpeg;base64,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',
    name: 'Trivia Night',
    location: 'Austin • 7pm',
    price: 12,
  },
];



type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <View testID='events-screen' style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`event-container-${item.id}`}
            // for flatlist we need to add a unique identfier
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
          >
            <Image
             testID={`event-container-image-${item.id}`}
              source={{ uri: item.image }}
              style={{ width: 330, height: 170, borderRadius: 10, marginBottom: 10 }}
              resizeMode="cover"
            />
            <Text  testID={`event-container-name-${item.id}`} style={styles.eventName}>{item.name}</Text>
            <Text  testID={`event-container-location-${item.id}`}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
      <Button testID='about-button' title="About the App" onPress={() => navigation.navigate('About')} />
    </View>
  );
};

type EventDetailsProps = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;
const EventDetailsScreen = ({ route, navigation }: EventDetailsProps) => {
  const { eventId } = route.params;
  const event = events.find((e) => e.id === eventId);
  const [tickets, setTickets] = useState(1);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  if (!event) return <Text>Event not found</Text>;

  const toggleShowtime = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  return (
    <View testID={`event-${event.id}-screen`}style={styles.container}>
      <Text testID={`event-title-${event.id}`}style={styles.title}>{event.name}</Text>
      <Image source={{ uri: event.image }} style={{ width: 350, height: 150 }} resizeMode="cover" />
      <Text>Location: {event.location}</Text>
      <Text>Price: ${event.price} per ticket</Text>

      {event.showtimes && (
        <>
          <Text style={{ marginTop: 20 }}>Select Showtimes:</Text>
          <View style={styles.showtimesContainer}>
            {event.showtimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.showtimeButton,
                  selectedTimes.includes(time) && styles.showtimeButtonSelected,
                ]}
                onPress={() => toggleShowtime(time)}
              >
                <Text style={{ color: selectedTimes.includes(time) ? '#fff' : '#000' }}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={{ marginTop: 20 }}>Select Tickets:</Text>
      <View style={styles.buttonRow}>
        <Button title="-" onPress={() => setTickets(Math.max(1, tickets - 1))} />
        <Text style={styles.tickets}>{tickets}</Text>
        <Button title="+" onPress={() => setTickets(tickets + 1)} />
      </View>

      <Button
        title="Book Tickets"
        onPress={() =>
          navigation.navigate('ConfirmBooking', {
            eventId: event.id,
            tickets,
            selectedTimes: event.showtimes ? selectedTimes : undefined,
          } as any) // temporary cast to allow extra param
        }
      />
    </View>
  );
};

type ConfirmBookingProps = NativeStackScreenProps<RootStackParamList, 'ConfirmBooking'>;
const ConfirmBookingScreen = ({ route, navigation }: ConfirmBookingProps) => {
  const { eventId, tickets, selectedTimes } = route.params;
  const event = events.find((e) => e.id === eventId);

  if (!event) return <Text>Event not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Image source={{ uri: event.image }} style={{ width: 350, height: 150 }} resizeMode="cover" />
      <Text>{tickets} ticket(s) for:</Text>
      <Text>{event.name}</Text>
      <Text>Total: ${event.price * tickets}</Text>
      {selectedTimes && selectedTimes.length > 0 && (
        <>
          <Text>Selected Time(s):</Text>
          {selectedTimes.map((time) => (
            <Text key={time}>• {time}</Text>
          ))}
        </>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};


const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About This App</Text>
    <Text>Simple booking app for test/demo purposes.</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  tickets: {
    fontSize: 18,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  showtimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  showtimeButton: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
  },
  showtimeButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  
});
