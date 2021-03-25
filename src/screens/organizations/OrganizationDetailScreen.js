//OrganizationDetail Screen

//import packages
import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Button, Header, Text, View} from 'native-base';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import OrganizationDetailCard from '../../components/OrganizationDetailCard';
import OrganizationDetailsTimeCard from '../../components/OrganizationDetailsTimeCard';
import OrganizationDetailsContactCard from '../../components/OrganizationDetailsContactCard';
import {colors, spacing, typography} from '../../styles';

const OrganizationDetailScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      {/* need to add header */}
      <Header />
      <ScrollView>
        <View>
          {/* Detail card */}
          <OrganizationDetailCard
            title="North Bay Medical Care (Walk In Clinic)"
            rating="5.0"
            decs="Walk-InClinic In North Bay, Ontario"
            address="524 Lakshore Dr, North Bay, ON P1A 2E4"
            image="https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80"
          />

          {/* timings */}
          <OrganizationDetailsTimeCard timearray="" />

          {/* contact details */}
          <OrganizationDetailsContactCard
            phone=""
            website=""
            email=""
            facebook=""
          />
        </View>
        {/* buttons */}
        <View style={styles.buttonsView}>
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
            style={styles.getDirButton}
            onPress={() => {
              console.log('getDirection button pressed');
            }}>
            <Text style={styles.getDirButtonText}>Get Direction</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrganizationDetailScreen;

const styles = StyleSheet.create({
  //styling on call and get direction button
  buttonsView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginVertical: '25%',
    minHeight: '10%',
    marginTop: spacing.none,
  },
  callButton: {
    backgroundColor: colors.primary400,
    width: '36%',
    height: 35,
    paddingLeft: spacing.largest,
    marginLeft: 20,
    alignSelf: 'center',
  },
  getDirButton: {
    backgroundColor: colors.primary400,
    marginLeft: '15%',
    height: 35,
    alignSelf: 'center',
  },
  callButtonText: {fontWeight: typography.fwSemiBold},
  getDirButtonText: {fontWeight: typography.fwSemiBold},
});
