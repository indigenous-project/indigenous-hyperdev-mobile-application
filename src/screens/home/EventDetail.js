//Event Detail module

// import packages
import React, { useState, useEffect, useLayoutEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
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
import { colors, themes, typography, spacing } from '../../styles';
import {
  eventGetDetail,
  eventGoing,
  eventInterested,
} from '../../api/events/events.api';
import { useCurrentUser } from '../../contexts/currentUserContext';
import { decodeHTML } from '../../modules/decode.text';
import { WebView } from 'react-native-webview';
import Loader from '../../components/Loader';
import ShareHeader from '../../components/ShareHeader';
import { useIsFocused } from '@react-navigation/core';

//function return
function EventDetail({ navigation, route }) {
  const theme = themes.light;
  const isFocused = useIsFocused();
  const [event, setEvent] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [isGoing, setIsGoing] = useState(false);

  //function handle interested button

  useEffect(() => {
    if (event) {
      event.interestedUsers.forEach((user) => {
        if (user._id === currentUser._id) {
          setIsInterested(true);
          return;
        }
      });

      event.goingUsers.forEach((user) => {
        if (user._id === currentUser._id) {
          setIsGoing(true);
          return;
        }
      });
    }
  }, [event, currentUser, isFocused]);

  const handleAskTapButton = (typeButton) => {
    Alert.alert(
      `Event ${typeButton}`,
      `Are your ${typeButton} ${event.title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            typeButton === 'interested in'
              ? handleInterestedButton()
              : handleGoingButton();
          },
        },
      ],
    );
  };

  const handleInterestedButton = () => {
    eventInterested(token, event._id)
      .then((response) => {
        if (response) {
          setIsInterested(true);
          Alert.alert('Interested the event');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGoingButton = () => {
    eventGoing(token, event._id)
      .then((response) => {
        if (response) {
          setIsGoing(true);
          Alert.alert('Going the event');
        }
      })
      .catch((err) => console.log(err));
  };

  //ussEffect fetching data
  useEffect(() => {
    if (route.params.eventId) {
      setLoading(true);
      eventGetDetail(token, route.params.eventId)
        .then((response) => {
          setEvent(response);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert(err.errors[0].title, err.errors[0].description);
        });
    }
  }, [token, route.params, isInterested, isGoing]);

  //useLayoutEffect to get title and share button
  useLayoutEffect(() => {
    event
      ? navigation.setOptions({
        headerTitle: event.title,
        headerRight: () => <ShareHeader shareData={event} />,
      })
      : null;
  }, [navigation, event]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <Loader loading={loading} />
      {event ? (
        <ScrollView>
          <Image style={styles.image} source={{ uri: event.medias[0].path }} />
          <EventInfo event={event} />
          <View style={styles.container}>
            <WebView
              style={styles.description}
              originWhitelist={['*']}
              source={{
                html: `<section style="font-size:30">${decodeHTML(
                  event.description,
                )}</section>`,
              }}
            />
          </View>
          {event.hosts.length > 0
            ? event.hosts.map((host) => (
              <View style={styles.container}>
                <Text style={styles.heading}>Hosts</Text>

                <EventHost
                  key={host._id}
                  name={host.name}
                  type={host.category.name}
                  logo={host.icon}
                />


              </View>
            )) : null}
        </ScrollView>
      ) : null}
      <View style={styles.buttonsGroup}>
        <TouchableOpacity
          disabled={isInterested}
          style={
            !isInterested
              ? styles.buttonContainer
              : styles.buttonContainerDisable
          }
          onPress={() => handleAskTapButton('interested in')}>
          <Text style={styles.buttonText}>Interested</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isGoing}
          style={
            !isGoing ? styles.buttonContainer : styles.buttonContainerDisable
          }
          onPress={() => handleAskTapButton('going to')}>
          <Text style={styles.buttonText}>Going</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    flex: 1,
    flexDirection: 'column',
    //  alignItems: 'flex-start',
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
    minWidth: 600,
    minHeight: 70,
    marginTop: spacing.base,
    lineHeight: typography.lh3,
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
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonContainerDisable: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.gray200,
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
