//DiscussionScreen module

// import packages
import React from 'react';

import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import DiscussionCard from '../../components/DiscussionCard';
import SwitchSelector from 'react-native-switch-selector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, themes, typography, spacing} from '../../styles';
import {useDiscussion} from '../../contexts/discussionContext';

//switch-selector options
const options = [
  {label: 'Recent', value: 'Recent'},
  {label: 'Most Discussed', value: 'Most Discussed'},
  {label: 'My Discussions', value: 'My Discussions'},
];

//function return
function DiscussionScreen(props) {
  const theme = themes.light;
  const [discussions] = useDiscussion([]);
  console.log(discussions);

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      <View style={styles.container}>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={22}
          style={{textAlignVertical: 'center'}}
        />
        <Text style={styles.createNewButton}>Create a new discussion</Text>
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
        {discussions
          ? discussions.map((discussion) => (
              <DiscussionCard
                key={discussion._id}
                title={discussion.title}
                nameAndDate={`${discussion.owner.firstName} ${discussion.owner.lastName} ${discussion.createdAt}`}
                description={discussion.description}
                categories={discussion.categories}
                replies={discussion.replies}
              />
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DiscussionScreen;

const styles = StyleSheet.create({
  //container style
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 50,
    padding: spacing.small,
    backgroundColor: colors.white,
    margin: spacing.small,
    textAlignVertical: 'center',
  },

  //create New Discussion style
  createNewButton: {
    height: 25,
    width: '100%',
    padding: spacing.smallest,
    fontWeight: typography.fwMedium,
    fontSize: typography.sf3,
    color: colors.gray500,
  },
});
