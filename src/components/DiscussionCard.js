import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles';
import Chips from '../components/Chips';

//card to display Discussion
export default function EventCard(props) {
    return (
        <View style={styles.discussionCard}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <Text style={styles.cardDetail}>{props.nameAndDate}</Text>
            <View style={styles.chipContainer}>
                <Chips name="Category 1"></Chips>
                <Chips name="Category 2"></Chips>
            </View>
            <Text style={styles.cardSubTitle}>{props.description}</Text>
            <View style={styles.actionContainer}>
                <Text>Replies</Text>
                <Text>Save</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    //Discussion Card styles
    discussionCard: {
        minHeight: "25%",
        alignItems: 'flex-start',
        padding: spacing.base,
        backgroundColor: colors.white,
        marginHorizontal: spacing.small,
        marginTop: spacing.small,
        borderRadius: spacing.small
    },
    cardTitle: {
        fontSize: typography.fs3,
        color: colors.primary900,
        fontWeight: typography.fwBold,
        paddingBottom: spacing.smaller,
    },
    cardSubTitle: {
        fontSize: typography.fs2,
        lineHeight: typography.lh3,
        paddingBottom: spacing.smaller
    },
    cardDetail: {
        fontWeight: typography.fwLight,
        paddingBottom: spacing.smaller
    },

    //chips styling
    chipContainer: {
        flexDirection: "row"
    },

    //Actions styling (Replies and Save)
    actionContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "90%",
        marginHorizontal: spacing.small
    },
})
