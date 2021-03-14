import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles'

//custome chips for displaying categories
export default function EventCard(props) {
    return (
        <View style={styles.chip}>
            <Text style={styles.chipText}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    //chips styling
    chipContainer: {
        flexDirection: "row"
    },
    chip: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.primary500,
        marginRight: spacing.small,
        marginBottom: spacing.smaller,
    },
    chipText: {
        fontSize: typography.fs2,
        padding: spacing.smallest,
        color: colors.primary900,
        fontWeight: typography.fwSemiBold
    },
})
