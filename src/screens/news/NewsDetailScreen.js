import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';

import {colors, spacing, themes, typography} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';

function NewsDetailScreen(navigate) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.headerStyle}>
          <View>
            <Text style={styles.title}>
              North Bay expands its Education Opportunities for school kids
            </Text>
            <Text style={styles.date}>Posted Feb 10, 2021</Text>

            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
              }}
              style={styles.image}
            />
          </View>
          <Text style={styles.description}>
            There will be two rounds of judging. The purpose of the first round
            will be to select finalists who will be presenting live to a panel
            of industry and senior Algonquin College judges. All submitted
            virtual posters will be judged by a team of internal judges.
            Feedback will be available to all teams if requested. You’ll also
            find a blank copy of the judging form attached to this email. After
            the first round, finalists will be contacted in advance of the
            showcase to ensure their availability. If a team does not respond
            within the allocated time or is unavailable to present in the live
            showcase on Friday, December 11th, an alternate team will be
            selected. ind a blank copy of the judging form attached to this
            email. After the first round, finalists will be contacted in advance
            of the showcase to ensure their availability. If a team does not
            respond within the allocated time or is unavailable to present in
            the live showcase on Friday, December 11th, an alternate team will
            be selected.
          </Text>
        </View>
      </ScrollView>
      <View style={{backgroundColor: colors.white}}>
        <Button title="Ask Question" style={styles.loginButton} block>
          <Text style={styles.loginText}>Ask Question</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    marginTop: spacing.small,
  },
  title: {
    color: colors.primary900,
    marginTop: spacing.base,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },
  date: {
    fontSize: typography.fs3,
    marginBottom: spacing.small,
    fontWeight: typography.fwLight,
    color: colors.gray900,
  },
  description: {
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
    paddingVertical: spacing.small,
  },
  image: {
    height: 150,
    width: 340,
    flex: 1,
  },
  loginButton: {
    width: '65%',
    marginTop: '5%',
    marginLeft: '15%',
    backgroundColor: colors.primary500,
    color: '#000',
    borderRadius: spacing.smaller,
  },
  loginText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },
});

export default NewsDetailScreen;
