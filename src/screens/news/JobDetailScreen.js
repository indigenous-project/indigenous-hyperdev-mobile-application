import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Unorderedlist from 'react-native-unordered-list';
import {Text, Button} from 'native-base';

import {colors, spacing, themes, typography} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';

function JobDetailScreen(navigate) {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <View style={styles.headerStyle}>
        <View style={styles.heading}>
          <Text style={styles.title}>Job Posting - 1 Full Time</Text>
          <Text style={{marginTop: '2%', marginLeft: '8%'}}>
            Internal/External
          </Text>
          <Text style={{marginTop: '2%', marginLeft: '8%', marginBottom: '2%'}}>
            Full Time 35/week
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.headerStyle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subHeading}>Status:</Text>
            <Text style={{marginTop: spacing.small}}>
              {' '}
              Life Long Care Worker
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subHeading}>Accountability:</Text>
            <Text style={{marginTop: spacing.small}}>
              {' '}
              Life Long Care Worker
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subHeading}>Purpose:</Text>
            <Text style={{marginTop: spacing.small}}>
              {' '}
              Life Long Care Worker
            </Text>
          </View>

          <Text style={styles.subHeading}>Job Duties:</Text>
          <Unorderedlist>
            <Text>Security Check/Home visits to ensure client wellbeing</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>Security Check/Home visits to ensure client wellbeing</Text>
          </Unorderedlist>
          <Text style={styles.subHeading}>Qualifications:</Text>
          <Unorderedlist>
            <Text>Security Check/Home visits to ensure client wellbeing</Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>Security Check/Home visits to ensure client wellbeing</Text>
          </Unorderedlist>
          <Text style={styles.resumeInfo}>
            Please include resume and cover letter
          </Text>

          <Text style={styles.emailInfo}>You may apply by Email/Mail To: </Text>
          <Text style={styles.emailInfo}>Executive director</Text>
          <Text style={styles.emailInfo}>Email To: Director@Nbifc.oorg</Text>

          <Text style={styles.conclusion}>
            "We would like To thank all interested individuals; However, Only
            Selected for an interview"
          </Text>
        </View>
      </ScrollView>
      <View style={{backgroundColor: colors.white}}>
        <Button title="Send Email" style={styles.emailButton} block>
          <Text style={styles.emailText}>Send Email</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.base,
    marginTop: spacing.smaller,
  },

  heading: {
    alignSelf: 'center',
  },

  title: {
    color: colors.primary900,
    marginTop: spacing.base,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },

  subHeading: {
    color: colors.primary900,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    marginTop: spacing.small,
  },

  resumeInfo: {
    color: colors.primary900,
    fontSize: typography.fs3,
    marginTop: '2%',
  },

  emailInfo: {
    alignSelf: 'center',
    lineHeight: 16,
    marginTop: '5%',
    fontWeight: typography.fwSemiBold,
    fontSize: typography.fs3,
  },

  conclusion: {
    marginTop: '5%',
  },

  emailButton: {
    width: '65%',
    marginTop: '5%',
    marginLeft: '15%',
    marginBottom: '2%',
    backgroundColor: colors.primary500,
    borderRadius: spacing.smaller,
  },
  emailText: {
    color: colors.white,
    fontWeight: typography.fwSemiBold,
  },
});

export default JobDetailScreen;
