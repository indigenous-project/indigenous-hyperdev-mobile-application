import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../styles';
import { decodeHTML } from '../modules/decode.text';
import { WebView } from 'react-native-webview';
import OrganizationChips from '../components/OrganizationChips';

//card to display News
export default function NewsCard(props) {
  const NUM_OF_LINES = 2;
  return (
    <View style={styles.newsCard}>
      <View style={styles.newsContent}>
        <Text numberOfLines={2} style={styles.cardTitle}>{props.title}</Text>
        <Text style={styles.cardDetail}>{props.date}</Text>
        <WebView
          numberOfLines={NUM_OF_LINES}
          style={styles.cardSubTitle}
          scrollEnabled={false}
          originWhitelist={['*']}
          source={{
            html: `<section style="font-size:70">${decodeHTML(
              props.details,
            )}</section>`,
          }}
        />
      </View>
      <Image
        style={styles.image}
        source={require('../testImages/demoPic.png')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  //News card style
  newsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 0.3,
    borderBottomColor: colors.gray900,
    paddingVertical: spacing.small,
  },
  newsContent: {
    display: 'flex',
    justifyContent: 'center',
    width: '65%',
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontWeight: typography.fwBold,
    paddingBottom: spacing.smallest,
    color: colors.primary900,
    fontSize: typography.fs3,
  },
  cardDetail: {
    fontWeight: typography.fwLight,
    paddingBottom: spacing.smallest,
    fontSize: typography.fs2,
  },
  image: {
    borderRadius: 10,
    width: 110,
    height: 110,
    marginVertical: spacing.smallest,
    marginLeft: spacing.small,
  },
});
