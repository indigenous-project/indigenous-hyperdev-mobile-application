import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display News
export default function NewsCard(props) {
    return (
        <View style={styles.newsCard}>
            <View style={styles.newsContent}>
                <Text style={styles.cardTitle}>{props.title}</Text>
                <Text style={styles.cardDetail}>{props.date}</Text>
                <Text style={styles.cardSubTitle}>{props.details}</Text>
            </View>
            <Image style={styles.image} source={require('../testImages/demoPic.png')} />
        </View>
    );
}
const styles = StyleSheet.create({

    //News card style
    newsCard: {
        flexDirection: 'row',
        height: 120,
        width: "95%",
        marginHorizontal: spacing.small,
        backgroundColor: colors.white,
    },
    newsContent: {
        display: "flex",
        justifyContent: "center",
        width: "65%",
    },
    cardTitle: {
        fontWeight: typography.fwBold,
        paddingBottom: spacing.smallest,
        color: colors.primary900,
        fontSize: typography.fs3
    },
    cardSubTitle: {
        fontWeight: typography.fwMedium,
        paddingBottom: spacing.smallest,
        fontSize: typography.fs3
    },
    cardDetail: {
        fontWeight: typography.fwLight,
        paddingBottom: spacing.smallest,
        fontSize: typography.fs3
    },
    image: {
        borderRadius: 10,
        width: 110,
        height: 110,
        marginVertical: spacing.smallest,
        marginLeft: spacing.small
    },
})
