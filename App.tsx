import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

type RootStackParamList = {
  Home: undefined;
  EventDetails: {eventId: number};
  ConfirmBooking: {eventId: number; tickets: number; selectedTimes?: string[]};
  About: undefined;
};

const Stack = createNativeStackNavigator();

const events = [
  {
    id: 1,
    image:
      'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/sites/92/2025/02/24100634/ZITP2024_0906_191508-0168_JAE-scaled.jpg',
    name: 'Lost in Dreams',
    location: 'Los Angeles • 4pm',
    price: 80,
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,f_auto,h_1200,q_auto,w_1200/v1715007144/p3in7ffjqolwmrmf6iag.jpg',
    name: 'Cherry Blossom Tour',
    location: 'New York City • multiple times',
    price: 30,
    showtimes: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
  },
  {
    id: 3,
    image:
      'https://houseofdezign.com/wp-content/uploads/2024/07/Painting-on-Canvas-for-Adults.jpg',
    name: 'Paint and Wine',
    location: 'Huntington Beach • 7pm',
    price: 25,
  },
  {
    id: 4,
    image:
      'https://images.squarespace-cdn.com/content/v1/57c46e6737c581f0c4d501ce/312addfd-933d-4330-8d6c-d921883d7c9e/MyCheekyDate+LA+Dating',
    name: 'Speed Dating',
    location: 'Los Angeles • multiple times',
    price: 15,
    showtimes: ['5:00 PM', '6:30 PM', '8:00 PM'],
  },
  {
    id: 5,
    image:
      'https://www.sftravel.com/sites/default/files/styles/scale_lg/public/2022-10/hardly-strictly-bluegrass.jpg.webp?itok=277EpxMy',
    name: 'Jazz in the Park',
    location: 'San Francisco • 6pm',
    price: 20,
  },
  {
    id: 6,
    image:
      'https://sites.bu.edu/gastronomyblog/files/2017/07/raohe-night-market-taiwan.jpg',
    name: 'Night Market Food Tour',
    location: 'Seattle • multiple times',
    price: 40,
    showtimes: ['5:00 PM', '6:00 PM', '7:30 PM'],
  },
  {
    id: 7,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSsg394jCHcx03C9QTN3Dn6LrjbWa_2cjTvg&s',
    name: 'Outdoor Movie Night',
    location: 'San Diego • 8pm',
    price: 10,
  },
  {
    id: 8,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlXl38wo2AMkOjCuDzSuO9d5fKvPhaQL8QQEEaRxs_DyvX8iUrvPXQYhOtztn26aJieA&usqp=CAU',
    name: 'Sunset Yoga',
    location: 'Santa Monica • 6:30pm',
    price: 18,
  },
  {
    id: 9,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm6mF-DUZP7mXbh89yP4oEA4Ty4d3YsxLi_w&s',
    name: 'Museum After Dark',
    location: 'Chicago • multiple times',
    price: 22,
    showtimes: ['6:00 PM', '7:00 PM', '8:30 PM'],
  },
];

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = ({navigation}: HomeProps) => {
  return (
    <View
      testID={'events-screen'}
      accessibilityLabel={'events-screen'}
      style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            testID={`event-container-${item.id}`}
            accessibilityLabel={`event-container-${item.id}`}
            // for flatlist we need to add a unique identfier
            style={styles.card}
            onPress={() =>
              navigation.navigate('EventDetails', {eventId: item.id})
            }>
            <Image
              testID={'event-image'}
              accessibilityLabel={'event-image'}
              source={{uri: item.image}}
              style={{
                width: 330,
                height: 170,
                borderRadius: 10,
                marginBottom: 10,
              }}
              resizeMode="cover"
            />
            <Text
              testID={'event-title'}
              accessibilityLabel={'event-title'}
              style={styles.eventName}>
              {item.name}
            </Text>
            <Text
              testID={'event-location-time'}
              accessibilityLabel={'event-location-time'}
            >
              {item.location}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        testID="about-button"
        accessibilityLabel="about-button"
        accessible={true}
        onPress={() => navigation.navigate('About')}
        style={styles.button}>
        <Text style={styles.buttonText}>About the App</Text>
      </TouchableOpacity>
    </View>
  );
};

type EventDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'EventDetails'
>;
const EventDetailsScreen = ({route, navigation}: EventDetailsProps) => {
  const {eventId} = route.params;
  const event = events.find(e => e.id === eventId);
  const [tickets, setTickets] = useState(1);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  if (!event) return <Text>Event not found</Text>;

  const toggleShowtime = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  return (
    <View testID={`event-${event.id}-screen`} style={styles.container}>
      <Text testID={`event-title-${event.id}`} style={styles.title}>
        {event.name}
      </Text>
      <Image
        source={{uri: event.image}}
        style={{width: 350, height: 150}}
        resizeMode="cover"
      />
      <Text>Location: {event.location}</Text>
      <Text>Price: ${event.price} per ticket</Text>

      {event.showtimes && (
        <>
          <Text style={{marginTop: 20}}>Select Showtimes:</Text>
          <View style={styles.showtimesContainer}>
            {event.showtimes.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.showtimeButton,
                  selectedTimes.includes(time) && styles.showtimeButtonSelected,
                ]}
                onPress={() => toggleShowtime(time)}>
                <Text
                  style={{
                    color: selectedTimes.includes(time) ? '#fff' : '#000',
                  }}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={{marginTop: 20}}>Select Tickets:</Text>
      <View style={styles.buttonRow}>
        <Button
          title="-"
          onPress={() => setTickets(Math.max(1, tickets - 1))}
        />
        <Text style={styles.tickets}>{tickets}</Text>
        <Button title="+" onPress={() => setTickets(tickets + 1)} />
      </View>

      <Button
        title="Book Tickets"
        onPress={
          () =>
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

type ConfirmBookingProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmBooking'
>;
const ConfirmBookingScreen = ({route, navigation}: ConfirmBookingProps) => {
  const {eventId, tickets, selectedTimes} = route.params;
  const event = events.find(e => e.id === eventId);

  if (!event) return <Text>Event not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Image
        source={{uri: event.image}}
        style={{width: 350, height: 150}}
        resizeMode="cover"
      />
      <Text>{tickets} ticket(s) for:</Text>
      <Text>{event.name}</Text>
      <Text>Total: ${event.price * tickets}</Text>
      {selectedTimes && selectedTimes.length > 0 && (
        <>
          <Text>Selected Time(s):</Text>
          {selectedTimes.map(time => (
            <Text key={time}>• {time}</Text>
          ))}
        </>
      )}
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const AboutScreen = () => (
  <View
    testID={'about-screen'}
    accessibilityLabel={'about-screen'}
    style={styles.container}>
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
  buttonText: {
    alignSelf: 'center',
    fontSize: 18, 
    color: 'white',
  }, 
  button: {
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    borderRadius: 10,
  }
});
