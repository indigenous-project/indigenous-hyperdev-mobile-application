import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles';

//card to display Job News
export default function JobCard(props) {
    return (
        <View style={styles.JobCard}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <Text style={styles.cardSubTitle}>{props.posting}</Text>
            <Text style={styles.cardDetail}>{props.type}</Text>
            <Text style={styles.cardSubTitle}>{props.salary}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    //job card styles
    JobCard: {
        borderRadius: 10,
        minWidth: "60%",
        shadowOpacity: 0.2,
        shadowOffset: { width: 3, height: 6 },
        shadowColor: colors.gray900,
        backgroundColor: colors.white,
        margin: spacing.small,
        padding: spacing.small,
    },
    cardTitle: {
        fontWeight: typography.fwBold,
        paddingBottom: spacing.smallest,
        color: colors.primary900,
        fontSize: typography.fs4
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
})
