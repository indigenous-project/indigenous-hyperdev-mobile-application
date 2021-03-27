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
import {decodeHTML} from '../../modules/decode.text';
import {WebView} from 'react-native-webview';
import Loader from '../../components/Loader';
import ShareHeader from '../../components/ShareHeader';

//function return
function EventDetail({navigation, route}) {
  const theme = themes.light;
  const [event, setEvent] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const [loading, setLoading] = useState(false);

  //ussEffect fetching data
  useEffect(() => {
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
  }, [token, route.params]);

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
    width: 400,
    height: 300,
    marginTop: 20,
    fontSize: 50,
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
