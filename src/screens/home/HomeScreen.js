//HomeScreen module

// import packages
import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { categoriesGetList } from '../../api/categories/categories.api';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, themes } from '../../styles'

//function return
function HomeScreen(props) {
  const theme = themes.light;
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    categoriesGetList(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ3YzY4NDkwZTc4MjAwMDdmZjg2ZTEiLCJpYXQiOjE2MTUzMTY2Mjh9.AOe0KoE5MRZN1xw2hMEI3Tq28QPeASkc8BAugpHEChc',
    )
      .then(setCategories)
      .catch(console.log);
  }, []);

  //card to display upcoming events
  const EventCard = (props) => {
    return (
      <View style={styles.eventCard}>
        <Image style={styles.image} source={require('../../testImages/demoPic.png')} />
        <Text style={styles.cardTitle}>{props.name}</Text>
        <Text style={styles.cardSubTitle}>{props.date}</Text>
        <Text style={styles.cardDetail}>{props.status}</Text>
      </View>
    );
  }

  //card to display Latest Update (e.g. COVID-19)
  const UpdateCard = (props) => {
    return (
      <View style={styles.updateCard}>
        <Text style={styles.updateTitle}>{props.title}</Text>
        <Text style={styles.updateDescription}>{props.description}</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //card to display category button
  const CategoryButton = (props) => {
    return (
      <View>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryIcon}>{props.icon}</Text>
        </TouchableOpacity>
        <Text style={styles.categoryName}>{props.name}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <ScrollView
        horizontal={false}>
        <FocusedStatusBar barStyle="light-content" />
        {/* <Text>{JSON.stringify(categories)}</Text> */}

        <View style={styles.container}>
          <Text style={styles.heading}>
            Upcoming Events
          </Text>
          <View style={styles.upcomingEvent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <EventCard name="Event 1" date="Event Date" status="Event status"></EventCard>
            </ScrollView>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>
            Latest Update
          </Text>
          <View style={styles.latestUpdate}>
            <UpdateCard title="Title of Update" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"></UpdateCard>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>
            Popular Service Category
          </Text>
          <View style={styles.popularServices}>
            <CategoryButton icon="A" name="A category"></CategoryButton>
            <CategoryButton icon="B" name="B category"></CategoryButton>
            <CategoryButton icon="C" name="C category"></CategoryButton>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

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

  //styling for upcoming event
  upcomingEvent: {
    flexDirection: "row",
  },
  eventCard: {
    margin: 10,
    shadowOffset: { width: 3, height: 6 },
    shadowColor: colors.gray900,
    backgroundColor: colors.white,
    height: "90%",
    shadowOpacity: 0.2,
  },
  cardTitle: {
    fontWeight: "700",
    paddingBottom: 8
  },
  cardSubTitle: {
    fontWeight: "500",
    paddingBottom: 8
  },
  cardDetail: {
    fontWeight: "300",
    paddingBottom: 8
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 200,
    height: 100,
    marginBottom: 10
  },

  //styling for latest update
  latestUpdate: {
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 0.1,
    shadowOffset: { width: 3, height: 6 },
    shadowColor: colors.gray900,
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
  },
  updateCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "red",
    textTransform: "uppercase",
    paddingTop: 10,
  },
  updateDescription: {
    fontSize: 16,
    lineHeight: 25,
    padding: 10,
  },
  //button styling
  buttonContainer: {
    marginBottom: 10,
    backgroundColor: colors.primary400,
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

  //styling for popular service categories
  popularServices: {
    width: "100%",
    justifyContent: 'space-around',
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: colors.white
  },
  categoryButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 3, height: 6 },
    shadowColor: colors.gray900,
    shadowOpacity: 0.2,
    borderRadius: 100,
    backgroundColor: colors.primary50,
  },
  categoryIcon: {
    color: colors.primary900,
    fontSize: 40,
  },
  categoryName: {
    color: colors.primary900,
    fontWeight: "600",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 14
  }
})