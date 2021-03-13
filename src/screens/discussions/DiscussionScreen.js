//DiscussionScreen module

// import packages
import React from 'react';

import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import SwitchSelector from 'react-native-switch-selector';
import { colors, themes } from '../../styles';

const options = [
  { label: 'Recent', value: 'Recent' },
  { label: 'Most Discussed', value: 'Most Discussed' },
  { label: 'My Discussions', value: 'My Discussions' }
];

//function return
function DiscussionScreen(props) {
  const theme = themes.light;
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.createNewButton}>Create New Discussion</Text>
      </View>

      <SwitchSelector
        style={{
          paddingHorizontal: 10,
        }}
        textColor={colors.primary900}
        fontSize={14}
        buttonColor={colors.primary500}
        options={options}
        initial={0}
        onPress={value => console.log(`${value}`)} />

    </SafeAreaView>
  );
}

export default DiscussionScreen;

const styles = StyleSheet.create({
  //container style
  container: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    margin: 10,
    borderRadius: 50
  },

  //create New Discussion style
  createNewButton: {
    minHeight: 25,
    padding: 3,
    fontWeight: "500",
    fontSize: 16,
    color: "#6F6F6F",
    width: "100%",
  }
})