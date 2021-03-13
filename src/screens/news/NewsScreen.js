//NewsScreen module

// import packages
import React from 'react';

import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { colors, themes } from '../../styles';

//function return
function NewsScreen(props) {
  const theme = themes.light;

  //card to display Job News
  const JobCard = (props) => {
    return (
      <View style={styles.JobCard}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <Text style={styles.cardSubTitle}>{props.posting}</Text>
        <Text style={styles.cardDetail}>{props.type}</Text>
        <Text style={styles.cardSubTitle}>{props.salary}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <ScrollView
        horizontal={false}>
        <FocusedStatusBar barStyle="light-content" />
        {/* <Text>{JSON.stringify(categories)}</Text> */}

        <View style={styles.container}>
          <View style={styles.jobHeading}>
            <Text style={styles.heading}>Job News</Text>
            <Text>See All</Text>
          </View>
          <View style={styles.jobNews}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <JobCard
                title="Job Title"
                posting="Job Posting"
                type="Job Type"
                salary="Job Salary"
              ></JobCard>
            </ScrollView>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

export default NewsScreen;

const styles = StyleSheet.create({
  //container style
  container: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    marginTop: 10
  },
  heading: {
    color: colors.primary900,
    paddingLeft: 10,
    fontWeight: "700",
    fontSize: 16
  },

  //job container styles
  jobHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "95%",
    marginRight: 10
  },
  jobNews: {
    flexDirection: "row",
  },
  //job card styles
  JobCard: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 3, height: 6 },
    shadowColor: 'black',
    backgroundColor: 'white',
    minWidth: "60%",
    shadowOpacity: 0.2,
  },
  cardTitle: {
    fontWeight: "700",
    paddingBottom: 10,
    color: "#6F1818",
    fontSize: 18
  },
  cardSubTitle: {
    fontWeight: "500",
    paddingBottom: 10,
    fontSize: 16
  },
  cardDetail: {
    fontWeight: "300",
    paddingBottom: 10,
    fontSize: 16
  },
})