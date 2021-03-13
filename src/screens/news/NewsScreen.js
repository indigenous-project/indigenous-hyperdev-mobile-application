//NewsScreen module

// import packages
import React from 'react';

import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from 'react-native-reanimated';
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

  //card to display New Survey Available
  const SurveyCard = (props) => {
    return (
      <View style={styles.newSurvey}>
        <Image style={styles.image} source={require('../../testImages/demoPic.png')} />
        <View style={styles.surveyTitle}>
          <Text style={styles.surveyText}>{props.surveyText}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Start Survey</Text>
          </TouchableOpacity>
        </View>
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
          <View style={styles.containerHeading}>
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

        <View style={styles.container}>
          <View style={styles.containerHeading}>
            <Text style={styles.heading}>New Survey</Text>
            <Text>See All</Text>
          </View>
          <SurveyCard surveyText="Aboriginal Peoples Survey Concepts and Methods"></SurveyCard>
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
  containerHeading: {
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
    shadowColor: colors.gray900,
    backgroundColor: colors.white,
    minWidth: "60%",
    shadowOpacity: 0.2,
  },
  cardTitle: {
    fontWeight: "700",
    paddingBottom: 10,
    color: colors.primary900,
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

  //survey card style
  newSurvey: {
    flexDirection: 'row',
    borderRadius: 10,
    margin: 10,
    maxWidth: "95%",
    borderWidth: 0.1,
    shadowOffset: { width: 3, height: 6 },
    shadowColor: colors.gray900,
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
  },
  image: {
    borderRadius: 10,
    width: 110,
    height: 110,
    marginVertical: 10,
    marginLeft: 10
  },
  surveyTitle: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    alignItems: "center"
  },
  surveyText: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "500",
    paddingBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    backgroundColor: colors.primary500,
    minWidth: "50%",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
    alignSelf: "center",
  },
})