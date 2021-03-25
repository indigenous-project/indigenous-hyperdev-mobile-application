import React from 'react';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, spacing, themes, typography} from '../styles';

const ServiceDetail = (props) => {
  return (
    <View>
      <Card style={styles.contactCard}>
        <CardItem>
          <Left>
            <Thumbnail source={require('../testImages/userIcon.png')} />
            <Body>
              <Text style={styles.title}>{props.name}</Text>
              <Text style={styles.subtitle}>- {props.subtitle}</Text>
            </Body>
          </Left>
          <Right>
            <MaterialCommunityIcons
              name="heart"
              size={typography.fs7}
              color={themes.light.bodyBackgroundColor}
              style={styles.icon}
            />
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={styles.email}>Email: {props.email}</Text>
            <Text style={styles.phone}>Phone: {props.phone}</Text>
          </Body>
        </CardItem>
      </Card>

      <ScrollView style={styles.scrollViewHeight}>
        <View>
          <Card style={styles.decriptionView}>
            <CardItem style={styles.descriptionCard}>
              <Body>
                <Text style={styles.description}>{props.description}</Text>
              </Body>
            </CardItem>
            <View style={styles.buttonView}>
              <TouchableOpacity>
                <Text style={styles.BtnText}>See Brochure</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* buttons */}
      <View style={styles.btnGrpView}>
        {/* call button */}
        <Button
          style={styles.callButton}
          onPress={() => {
            console.log('call button pressed');
          }}>
          <Text style={styles.callButtonText}>Call</Text>
        </Button>
        {/* get direction button */}
        <Button
          style={styles.emailButton}
          onPress={() => {
            console.log('getDirection button pressed');
          }}>
          <Text style={styles.emailButtonText}>Email</Text>
        </Button>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  //styling on contact card
  contactCard: {marginTop: 0, marginBottom: 0},
  title: {color: themes.light.primaryColor, fontWeight: typography.fwBold},
  subtitle: {fontSize: typography.fs2},
  icon: {marginRight: 10, marginBottom: 15},
  email: {fontSize: typography.fs2},
  phone: {fontSize: typography.fs2},

  //styling on description card
  scrollViewHeight: {height: 520},
  decriptionView: {marginTop: 0, marginBottom: 0.5},
  descriptionCard: {
    backgroundColor: themes.light.inverseTextColor,
  },
  description: {fontSize: typography.fs2, lineHeight: typography.lh2},
  buttonView: {
    width: '40%',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: spacing.small,
    backgroundColor: colors.primary200,
    marginTop: 10,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  BtnText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },

  //styling on call and get direction button
  btnGrpView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    minHeight: '10%',
    marginTop: spacing.none,
  },
  callButton: {
    backgroundColor: colors.primary400,
    width: '36%',
    height: 30,
    paddingLeft: spacing.largest,
    marginLeft: 20,
    alignSelf: 'center',
  },
  emailButton: {
    width: '36%',
    paddingLeft: spacing.largest,
    backgroundColor: colors.primary400,
    marginLeft: '15%',
    height: 30,
    alignSelf: 'center',
  },
  callButtonText: {fontWeight: typography.fwSemiBold},
  emailButtonText: {fontWeight: typography.fwSemiBold},
});
