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

type RootStackParamList = {
  Home: undefined;
  EventDetails: { eventId: number };
  ConfirmBooking: { eventId: number; tickets: number };
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const events = [
  { id: 1, image:'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/sites/92/2025/02/24100634/ZITP2024_0906_191508-0168_JAE-scaled.jpg', name: 'Lost in Dreams', location: 'LA', price: 80 },
  { id: 2, image:'https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,f_auto,h_1200,q_auto,w_1200/v1715007144/p3in7ffjqolwmrmf6iag.jpg' , name: 'Cherry Blossom Tour', location: 'NYC', price: 30 },
  { id: 3, image:'https://houseofdezign.com/wp-content/uploads/2024/07/Painting-on-Canvas-for-Adults.jpg' , name: 'Paint and Wine', location: 'Orange County', price: 25 },
  { id: 4, image:'https://images.squarespace-cdn.com/content/v1/57c46e6737c581f0c4d501ce/312addfd-933d-4330-8d6c-d921883d7c9e/MyCheekyDate+LA+Dating' , name: 'Speed Dating', location: 'LA', price: 15 },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
          >
            <Image   
              source={{ uri: item.image }}
              style={{ width: 330, height: 170, borderRadius: 10, marginBottom: 10 }}
              resizeMode="cover" />
            <Text style={styles.eventName}>{item.name}</Text>
            <Text>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
      <Button 
        title="About the App" onPress={() => navigation.navigate('About')} />
    </View>
  );
};

const EventDetailsScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params;
  const event = events.find((e) => e.id === eventId);
  const [tickets, setTickets] = useState(1);

  if (!event) return <Text>Event not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Image   
              source={{ uri: event.image }}
              style={{ width: 350, height: 150 }}
              resizeMode="cover" />
      <Text>Location: {event.location}</Text>
      <Text>Price: ${event.price} per ticket</Text>
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
          })
        }
      />
    </View>
  );
};

const ConfirmBookingScreen = ({ route, navigation }: any) => {
  const { eventId, tickets } = route.params;
  const event = events.find((e) => e.id === eventId);

  if (!event) return <Text>Event not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Image   
              source={{ uri: event.image }}
              style={{ width: 350, height: 150 }}
              resizeMode="cover" />
      <Text>{tickets} ticket(s) for:</Text>
      <Text>{event.name}</Text>
      <Text>Total: ${event.price * tickets}</Text>
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
        <Stack.Screen name="Event Details" component={EventDetailsScreen} />
        <Stack.Screen name="Confirm Booking" component={ConfirmBookingScreen} />
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
});
