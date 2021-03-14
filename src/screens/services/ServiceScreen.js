//ServiceScreen module

// import packages
import {Container, Card, CardItem, Body, View} from 'native-base';
import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import {themes, spacing, colors, typography} from '../../styles';

//function return
function ServiceScreen(props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <ScrollView>
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <Container style={styles.serviceCategoryContainer}>
          <Text style={styles.serviceByCategory}>Services by Category</Text>
          <Text style={styles.seeAll}>See All(12)</Text>
        </Container>

        <Container style={styles.groupOfCatergories}>
          <Container style={styles.circleTextContainer}>
            <View style={styles.circle} />
            <Text style={styles.text}>Category1</Text>
          </Container>
          <Container style={styles.circleTextContainer}>
            <View style={styles.circle} />
            <Text style={styles.text}>Category1</Text>
          </Container>
          <Container style={styles.circleTextContainer}>
            <View style={styles.circle} />
            <Text style={styles.text}>Category1</Text>
          </Container>
        </Container>

        <Container style={styles.groupOfCatergories}>
          <Container style={styles.circleTextContainer}>
            <View style={styles.circle} />
            <Text style={styles.text}>Category1</Text>
          </Container>
          <Container style={styles.circleTextContainer}>
            <View style={styles.circle} />
            <Text style={styles.text}>Category1</Text>
          </Container>
          <Container style={styles.circleTextContainer}>
            <View style={styles.circle} />
            <Text style={styles.text}>Category1</Text>
          </Container>
        </Container>

        {/* last opened template */}
        <Container style={styles.textCardContainer}>
          <Text style={styles.lastOpened}>Last Opened</Text>
          <Card style={styles.cardsContainer}>
            <CardItem style={styles.cardBorder}>
              <Body>
                <Text style={styles.cardText}>Title</Text>
                <Text style={styles.cardText}>Name</Text>
                <Text style={styles.cardText}>Description</Text>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.cardsContainer}>
            <CardItem style={styles.cardBorder}>
              <Body>
                <Text style={styles.cardText}>Title</Text>
                <Text style={styles.cardText}>Name</Text>
                <Text style={styles.cardText}>Description</Text>
              </Body>
            </CardItem>
          </Card>
        </Container>

        {/* saved Services template */}
        <Container>
          <Text style={styles.lastOpened}>Saved Services</Text>
          <Card style={styles.cardsContainer}>
            <CardItem style={styles.cardBorder}>
              <Body>
                <Text style={styles.cardText}>Title</Text>
                <Text style={styles.cardText}>Name</Text>
                <Text style={styles.cardText}>Description</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.cardsContainer}>
            <CardItem style={styles.cardBorder}>
              <Body>
                <Text style={styles.cardText}>Title</Text>
                <Text style={styles.cardText}>Name</Text>
                <Text style={styles.cardText}>Description</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.cardsContainer}>
            <CardItem style={styles.cardBorder}>
              <Body>
                <Text style={styles.cardText}>Title</Text>
                <Text style={styles.cardText}>Name</Text>
                <Text style={styles.cardText}>Description</Text>
              </Body>
            </CardItem>
          </Card>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {flex: 1},

  // Services by category styles
  serviceCategoryContainer: {
    flex: spacing.hairline,
    flexDirection: 'row',
    height: 50,
  },
  serviceByCategory: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwBold,
    marginTop: spacing.largest,
    marginLeft: spacing.large,
  },
  seeAll: {
    marginTop: spacing.largest,
    marginLeft: 150,
    color: themes.light.subduedTextColor,
  },
  groupOfCatergories: {flexDirection: 'row', paddingLeft: '5%', height: 160},
  circleTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 160,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    backgroundColor: colors.gray100,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    padding: '7%',
    marginBottom: spacing.base,
  },
  text: {paddingLeft: spacing.smaller},

  //last opened style
  textCardContainer: {height: 300},
  lastOpened: {
    color: themes.light.primaryColor,
    fontWeight: typography.fwBold,
    marginTop: spacing.largest,
    marginLeft: spacing.large,
  },
  cardsContainer: {
    borderRadius: spacing.small,
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
    marginTop: spacing.base,
  },
  cardBorder: {
    borderRadius: spacing.small,
  },
  cardText: {marginTop: spacing.smaller, marginLeft: spacing.smallest},
});
export default ServiceScreen;
