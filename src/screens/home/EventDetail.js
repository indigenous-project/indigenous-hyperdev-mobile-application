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
import {
  eventGetDetail,
  eventGoing,
  eventGoingRemove,
  eventInterested,
  eventInterestedRemove,
} from '../../api/events/events.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {decodeHTML} from '../../modules/decode.text';
import {WebView} from 'react-native-webview';
import Loader from '../../components/Loader';
import ShareHeader from '../../components/ShareHeader';
import {useIsFocused} from '@react-navigation/core';

//function return
function EventDetail({navigation, route}) {
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

  // //function handle asking to confirm user want to going or interested to an event
  // const handleAskTapButton = (typeButton) => {
  //   Alert.alert(
  //     `Event ${typeButton}`,
  //     `Are your ${typeButton} ${event.title}?`,
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           typeButton === 'interested in'
  //             ? handleInterestedButton()
  //             : handleGoingButton();
  //         },
  //       },
  //     ],
  //   );
  // };

  // Function handle when user want to tap interested button
  const handleInterestedButton = () => {
    eventInterested(token, event._id)
      .then((response) => {
        if (response) {
          setIsInterested(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // Function handle when user dont want to be interested to an event
  const handleInterestedRemove = () => {
    eventInterestedRemove(token, event._id)
      .then((response) => {
        if (response) {
          setIsInterested(false);
        }
      })
      .catch((err) => console.log(err));
  };

  // Function handle when user want to tap going button
  const handleGoingButton = () => {
    eventGoing(token, event._id)
      .then((response) => {
        if (response) {
          setIsGoing(true);
        }
      })
      .catch((err) => console.log(err));
  };
  // Function handle when user dont want to go to an event
  const handleGoingButtonRemove = () => {
    eventGoingRemove(token, event._id)
      .then((response) => {
        if (response) {
          setIsGoing(false);
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
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <Loader loading={loading} />
      {event ? (
        <ScrollView>
          <Image style={styles.image} source={{uri: event.medias[0].path}} />
          <EventInfo event={event} />
          <View style={styles.container}>
            <View style={{minHeight: 250}}>
              <WebView
                scrollEnabled={true}
                originWhitelist={['*']}
                source={{
                  html: `<section style="font-size:30">${decodeHTML(
                    event.description,
                  )}</section>`,
                }}
              />
            </View>
          </View>
          {event.hosts.length > 0 ? (
            <View style={styles.container}>
              <Text style={styles.heading}>Hosts</Text>
              {event.hosts.map((host) => (
                <EventHost
                  key={host._id}
                  name={host.name}
                  type={host.category.name}
                  logo={host.icon}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>
      ) : null}
      <View style={styles.buttonsGroup}>
        <TouchableOpacity
          // disabled={isInterested}
          style={
            isInterested
              ? styles.buttonContainer
              : styles.buttonContainerDisable
          }
          onPress={() => {
            isInterested ? handleInterestedRemove() : handleInterestedButton();
          }}>
          <Text
            style={isInterested ? styles.buttonTextSelect : styles.buttonText}>
            Interested
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={isGoing}
          style={
            isGoing ? styles.buttonContainer : styles.buttonContainerDisable
          }
          onPress={() => {
            isGoing ? handleGoingButtonRemove() : handleGoingButton();
          }}>
          <Text style={isGoing ? styles.buttonTextSelect : styles.buttonText}>
            Going
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    flexDirection: 'column',
    padding: spacing.small,
    backgroundColor: colors.white,
    marginTop: spacing.hairline,
    marginBottom: spacing.base,
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

  webViewContainer: {
    // minHeight: 100,
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
    // backgroundColor: colors.primary400,
    backgroundColor: colors.primary100,

    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonContainerDisable: {
    width: '40%',
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.gray100,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.primary900,
    fontWeight: typography.fwBold,
  },
  buttonTextSelect: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default EventDetail;
