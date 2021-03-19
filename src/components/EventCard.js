import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display upcoming events
export default function EventCard(props) {
    return (
        <View style={styles.eventCard}>
            <Image style={styles.image} source={require('../testImages/demoPic.png')} />
            <Text style={styles.cardTitle}>{props.name}</Text>
            <Text style={styles.cardSubTitle}>{props.date}</Text>
            <Text style={styles.cardDetail}>{props.status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    //styling for upcoming event
    eventCard: {
        margin: spacing.small,
        backgroundColor: colors.white,
        shadowOffset: { width: 3, height: 6 },
        shadowColor: colors.gray900,
        height: '90%',
        shadowOpacity: 0.2,
    },
    cardTitle: {
        fontWeight: typography.fwBold,
        paddingBottom: spacing.smaller
    },
    cardSubTitle: {
        fontWeight: typography.fwMedium,
        paddingBottom: spacing.smaller
    },
    cardDetail: {
        fontWeight: typography.fwLight,
        paddingBottom: spacing.smaller
    },
    image: {
        width: 200,
        height: 100,
        borderTopLeftRadius: spacing.small,
        borderTopRightRadius: spacing.small,
        marginBottom: spacing.small
    },
})
