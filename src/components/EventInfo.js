import React from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {diffTime, formatDate, formatDateByTime} from '../modules/date.format';
import {colors, typography, spacing} from '../styles';

//card to display host for events
export default function EventInfo(props) {
  const event = props.event;
  //function handle when user tap on link that navigate to google map with keyword search location near my location
  const handleGoLink = () => {
    Linking.openURL(`https://maps.google.com/?q=${event.location}`);
  };
  if (!event) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
      <Text
        style={
          styles.eventStatus
        }>{`${event.interestedUsers.length} Interested | ${event.goingUsers.length} Going`}</Text>
      <View style={styles.eventInfo}>
        <Image
          style={styles.infoIcon}
          source={require('../asserts/locationIcon.png')}
        />
        <View>
          <Text style={styles.location} onPress={handleGoLink}>
            {event.location}
          </Text>
        </View>
      </View>
      <View style={styles.eventInfo}>
        <Image
          style={styles.infoIcon}
          source={require('../asserts/timeIcon.png')}
        />
        <View>
          <Text style={styles.time}>{`Start: ${formatDateByTime(
            event.startTime,
          )}`}</Text>
          <Text style={styles.duration}>
            {`Duration: ${diffTime(event.startTime, event.endTime)}`}
          </Text>
        </View>
      </View>
      <View style={styles.eventInfo}>
        <Image
          style={styles.infoIcon}
          source={require('../asserts/priceIcon.png')}
        />
        <View>
          <Text style={styles.price}>
            {parseInt(event.price, 10) > 0
              ? `$ ${(event.price / 100).toFixed(2)}`
              : 'Free'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.small,
    marginTop: spacing.hairline,
    marginBottom: spacing.smaller,
  },

  //Event Info styles
  eventDate: {
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    textTransform: 'uppercase',
    marginVertical: spacing.smallest,
  },
  eventStatus: {
    fontSize: typography.fs3,
    marginVertical: spacing.smallest,
  },
  infoIcon: {
    marginTop: spacing.hairline,
    width: 30,
    height: 30,
  },

  eventInfo: {
    marginTop: spacing.smallest,
    flexDirection: 'row',
  },
  location: {
    marginTop: spacing.smallest,
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: typography.fs3,
    marginLeft: spacing.smaller,
  },
  time: {
    marginTop: spacing.smallest,
    fontSize: typography.fs3,
    marginLeft: spacing.smaller,
  },
  duration: {
    fontSize: typography.fs3,
    marginLeft: spacing.smaller,
    fontWeight: typography.fwLight,
    color: colors.gray500,
  },
  price: {
    marginTop: spacing.smallest,
    fontSize: typography.fs3,
    marginLeft: spacing.smaller,
  },
});
