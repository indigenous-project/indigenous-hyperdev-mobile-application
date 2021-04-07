// import statements

import React, { useLayoutEffect } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'native-base';
import { decodeHTML } from '../../modules/decode.text';
import { WebView } from 'react-native-webview';
import { colors, spacing, themes, typography } from '../../styles';
import JobShareHeader from '../../components/JobsShareHeader'

// function and return

function JobDetailScreen({ navigate, route, navigation }) {

  const token = route.params.token;
  const job = route.params.job;

  //useLayoutEffect to get title and share button
  useLayoutEffect(() => {
    job
      ? navigation.setOptions({
        // headerTitle: job.title,
        headerRight: () => <JobShareHeader shareData={job} />,
      })
      : null;
  }, [navigation, job]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['right', 'left']}>
      <View style={styles.headerStyle}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.subHeading}>{job.subTitle}</Text>
        <Text style={styles.subHeading}>{job.type}</Text>
      </View>
      {/* <View style={styles.jobView}> */}
      <WebView
        style={styles.description}
        originWhitelist={['*']}
        source={{
          html: `<section style="font-size:40">${decodeHTML(
            job.description,
          )}</section>`,
        }}
      />
      {/* </View> */}
      <View style={styles.buttonsGroup}>
        <Button
          title="Send Email"
          onPress={() => {
            Linking.openURL(`mailto:${job.email}`);
          }}
          style={styles.emailButton}>
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
    marginVertical: spacing.smallest,
    minHeight: '15%',
  },
  title: {
    color: colors.primary900,
    marginTop: spacing.base,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    alignSelf: 'center',
  },
  subHeading: {
    marginTop: spacing.smaller,
    alignSelf: 'center',
  },

  jobView: {
    backgroundColor: 'white',
    marginTop: spacing.base,
    padding: spacing.base,
  },
  description: {
    padding: spacing.base,
    width: "95%",
    alignSelf: 'center'
  },

  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },

  emailButton: {
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  emailText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default JobDetailScreen;
