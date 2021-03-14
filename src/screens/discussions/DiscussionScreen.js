//DiscussionScreen module

// import packages
import React from 'react';

import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import DiscussionCard from '../../components/DiscussionCard';
import SwitchSelector from 'react-native-switch-selector';

import { colors, themes, typography, spacing } from '../../styles'


//switch-selector options
const options = [
  {label: 'Recent', value: 'Recent'},
  {label: 'Most Discussed', value: 'Most Discussed'},
  {label: 'My Discussions', value: 'My Discussions'},
];

//function return
function DiscussionScreen(props) {
  const theme = themes.light;

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.createNewButton}>Create New Discussion</Text>
      </View>

      <SwitchSelector
        style={{
          paddingHorizontal: 10,
        }}
        textColor={colors.primary900}
        fontSize={typography.fs2}
        buttonColor={colors.primary500}
        options={options}
        initial={0}
        onPress={(value) => console.log(`${value}`)}
      />

      <ScrollView horizontal={false}>
        <DiscussionCard
          title="Discussion Title"
          nameAndDate="User Name and Date posted"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"></DiscussionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DiscussionScreen;

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',

    borderRadius: 50,
    padding: spacing.small,
    backgroundColor: colors.white,
    margin: spacing.small,

  },

  //create New Discussion style
  createNewButton: {

    height: 25,
    width: "100%",
    padding: spacing.smallest,
    fontWeight: typography.fwMedium,
    fontSize: typography.sf3,
    color: colors.gray700,

  },
});
