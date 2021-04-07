import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles';

//card to display Job News
export default function JobCard(props) {
    return (
        <View style={styles.JobCard}>
            <Text numberOfLines={1} style={styles.cardTitle}>{props.title}</Text>
            <Text numberOfLines={1} style={styles.cardSubTitle}>{props.posting}</Text>
            <Text numberOfLines={1} style={styles.cardDetail}>{props.type}</Text>
            <Text numberOfLines={1} style={styles.cardSubTitle}>{props.salary}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    //job card styles
    JobCard: {
        borderRadius: spacing.small,
        shadowColor: colors.shadowcolor,
        backgroundColor: colors.white,
        padding: spacing.base,
        minWidth: '100%',
        marginTop: spacing.small,
        shadowOffset: {
            width: spacing.none,
            height: spacing.smallest,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 7,
    },
    cardTitle: {
        fontWeight: typography.fwBold,
        paddingBottom: spacing.small,
        color: colors.primary900,
        fontSize: typography.fs4,
    },
    cardSubTitle: {
        fontSize: typography.fs3,
    },
    cardDetail: {
        fontWeight: typography.fwLight,
        paddingVertical: spacing.small,
        fontSize: typography.fs3,
    },
})
