// News Detail Screen

// Import Packages


import { Image, StyleSheet, View, Alert } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { Text, Button } from 'native-base';
import { postGetDetail } from '../../api/news/news.api';
import { formatDate } from '../../modules/date.format';
import { useIsFocused } from '@react-navigation/core';
import { decodeHTML } from '../../modules/decode.text';
import { WebView } from 'react-native-webview';
import { colors, spacing, themes, typography } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import AskQuestionScreen from '../sidenavbar/AskQuestionScreen'
import NewsShareHeader from '../../components/NewsShareHeader'

// function return
function NewsDetailScreen({ navigate, route, navigation }) {
  const theme = themes.light;
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState(null);
  const token = route.params.token;
  const postId = route.params.postId;

  // fetching data
  useEffect(() => {
    postGetDetail(token, postId)
      .then((response) => {
        setPosts(response);
      })

      .catch((err) => {
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

  if (!posts) return null;
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />
      <View style={{ marginBottom: spacing.small }}>
        <Text style={styles.title}>{posts.title}</Text>
        <Text style={styles.date}>
          {formatDate(posts.lastModifiedDate)}
        </Text>

        {posts.medias.path ?
          <Image
            source={{
              uri: posts.medias.path,
            }}
            style={styles.image}
          /> : null}
      </View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `<section style="font-size:30">${decodeHTML(
            posts.description,
          )}</section>`,
        }}
      />
      <View style={styles.buttonsGroup}>
        <Button
          title="Ask Question"
          onPress={() => navigation.navigate(AskQuestionScreen)}
          style={styles.loginButton}
          block>
          <Text style={styles.loginText}>Ask Question</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    lineHeight: typography.lh3
  },
  date: {
    fontSize: typography.fs2,
    marginVertical: spacing.smallest,
    fontWeight: typography.fwLight,
    color: colors.gray900,
  },
  image: {
    height: 150,
    width: 340,
    flex: 1,
  },
  buttonsGroup: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  loginButton: {
    borderRadius: 10,
    marginBottom: spacing.small,
    backgroundColor: colors.primary400,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },
  loginText: {
    alignSelf: 'center',
    fontSize: typography.fs2,
    color: colors.white,
    fontWeight: typography.fwBold,
  },
});

export default NewsDetailScreen;
