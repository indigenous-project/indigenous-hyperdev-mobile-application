import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Alert, Keyboard} from 'react-native';
import {themes, colors, spacing, typography} from '../../styles';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Header,
  Card,
  CardItem,
  Body,
} from 'native-base';

function NotificationScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <Card style={styles.cardsContainer}>
        <CardItem style={styles.cardBorder}>
          <Body>
            <Text style={styles.cardText}>New Message from Admin</Text>
            <Text style={styles.cardText}>Time|Date</Text>
          </Body>
        </CardItem>
      </Card>
      <Card style={styles.cardsContainer}>
        <CardItem style={styles.cardBorder}>
          <Body>
            <Text style={styles.cardText}>New Message from Admin</Text>
            <Text style={styles.cardText}>Time|Date</Text>
          </Body>
        </CardItem>
      </Card>
      <Card style={styles.cardsContainer}>
        <CardItem style={styles.cardBorder}>
          <Body>
            <Text style={styles.cardText}>New Message from Admin</Text>
            <Text style={styles.cardText}>Time|Date</Text>
          </Body>
        </CardItem>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  cardBorder: {
    borderRadius: spacing.larger,
  },
  cardsContainer: {
    borderRadius: spacing.smaller,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: spacing.large,
    marginRight: spacing.large,
    marginTop: spacing.smallest,
  },
  cardText: {marginTop: spacing.smaller, marginLeft: spacing.smallest},
});

export default NotificationScreen;
