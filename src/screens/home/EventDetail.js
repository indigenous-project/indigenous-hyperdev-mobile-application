//Event Detail module

// import packages
import React, {useState, useEffect, useLayoutEffect} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EventHost from '../../components/EventHost';
import EventInfo from '../../components/EventInfo';
import {colors, themes, typography, spacing} from '../../styles';
import {eventGetDetail} from '../../api/events/events.api';
import {useCurrentUser} from '../../contexts/currentUserContext';

//function return
function EventDetail({navigation, route}) {
  const theme = themes.light;
  const [event, setEvent] = useState(null);
  const [currentUser, token] = useCurrentUser();

  const eventId = route.params.eventId;

  useEffect(() => {
    eventGetDetail(token, eventId)
      .then(setEvent)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token, eventId]);

  useLayoutEffect(() => {
    event ? navigation.setOptions({headerTitle: event.title}) : null;
  }, [navigation, event]);

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      {event ? (
        <ScrollView>
          <Image style={styles.image} source={{uri: event.medias[0].path}} />
          <EventInfo event={event} />
          <View style={styles.container}>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.heading}>Hosts</Text>
            {event.hosts.length > 0
              ? event.hosts.map((host) => (
                  <EventHost
                    key={host._id}
                    name={host.name}
                    type={host.category.name}
                    logo={host.icon}
                  />
                ))
              : null}
          </View>
        </ScrollView>
      ) : null}
      <View style={styles.buttonsGroup}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Interested</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Going</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    padding: spacing.small,
    backgroundColor: colors.white,
    marginTop: spacing.hairline,
    marginBottom: spacing.smaller,
  },

  //styling for upcoming event
  image: {
    height: 160,
    width: '100%',
  },
  heading: {
    color: colors.primary900,
    paddingLeft: spacing.small,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },

  description: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    paddingHorizontal: spacing.small,
  },

  //styling for bottom buttons group
  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  buttonContainer: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary500,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default EventDetail;
