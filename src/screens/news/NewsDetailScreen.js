// News Detail Screen

// Import Packages
import { Image, StyleSheet, View, Alert } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'native-base';
import { postGetDetail } from '../../api/news/news.api';
import { formatDate } from '../../modules/date.format';
import { decodeHTML } from '../../modules/decode.text';
import { WebView } from 'react-native-webview';
import { colors, spacing, themes, typography } from '../../styles';
import AskQuestionScreen from '../sidenavbar/AskQuestionScreen';
import NewsShareHeader from '../../components/NewsShareHeader';

// function return
function NewsDetailScreen({ route, navigation }) {
  // State and useState region
  const [posts, setPosts] = useState(null);
  const token = route.params.token;
  const postId = route.params.postId;
  //End useState region

  //Methods Region
  // fetching data
  useEffect(() => {
    postGetDetail(token, postId)
      .then(response => {
        setPosts(response);
      })

      .catch(err => {
        Alert.alert(err.errors[0].title, err.errors[0].description);
      });
  }, [token, postId]);

  //useLayoutEffect to get title and share button
  useLayoutEffect(() => {
    posts
      ? navigation.setOptions({
        // headerTitle: posts.title,
        headerRight: () => <NewsShareHeader shareData={posts} />,
      })
      : null;
  }, [navigation, posts]);
  // End useEffectRegion

  if (!posts) return null;

  // Render element
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={{ marginBottom: spacing.small }}>
        <Text style={styles.title}>{posts.title}</Text>
        <Text style={styles.date}>{formatDate(posts.lastModifiedDate)}</Text>

        {/* Extracting the data from the news array and displaying the required elements */}
        {posts.medias ? (
          <Image
            source={{
              uri: posts.medias[0].path,
            }}
            style={styles.image}
          />
        ) : null}
      </View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `<section style="font-size:30">${decodeHTML(
            posts.description,
          )}</section>`,
        }}
      />

      {/* Displaying and logic of Ask Question Button */}
      <View style={styles.buttonsGroup}>
        <Button
          title="Ask Question"
          onPress={() => navigation.navigate(AskQuestionScreen)}
          style={styles.askQuestionButton}
          block>
          <Text style={styles.askQuestionText}>Ask Question</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

/* Stylesheet for NewsDetailScreen */
const styles = StyleSheet.create({
  //container style
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: spacing.base,
    marginTop: spacing.smaller,
  },
  title: {
    color: colors.primary900,
    marginTop: spacing.base,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
    lineHeight: typography.lh3,
  },
  date: {
    fontSize: typography.fs2,
    marginVertical: spacing.smallest,
    fontWeight: typography.fwLight,
    color: colors.gray900,
  },
  image: {
    marginVertical: spacing.small,
    height: 150,
  },
  // Styling for AskQuestion Button
  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  askQuestionButton: {
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  askQuestionText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default NewsDetailScreen;
