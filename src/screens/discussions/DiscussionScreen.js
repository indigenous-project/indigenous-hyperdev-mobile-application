//DiscussionScreen module

// import packages
import React from 'react';

import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { colors, themes } from '../../styles';

//function return
function DiscussionScreen(props) {
  const theme = themes.light;
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.createNewButton}>Create New Discussion</Text>
      </View>

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