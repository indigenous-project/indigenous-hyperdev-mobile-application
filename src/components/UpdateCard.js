import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display upcoming events
export default function UpdateCard(props) {
    return (
        <View style={styles.updateCard}>
            <Text style={styles.updateTitle}>{props.title}</Text>
            <Text style={styles.updateDescription}>{props.description}</Text>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Read More</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    //styling for latest update
    updateCard: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    updateTitle: {
        textAlign: "center",
        color: "red",
        textTransform: "uppercase",
        fontSize: typography.fs3,
        fontWeight: typography.fwBold,
        paddingTop: spacing.small,
    },
    updateDescription: {
        fontSize: typography.fs3,
        lineHeight: typography.lh3,
        padding: spacing.small,
    },
    //button styling
    buttonContainer: {
        width: "50%",
        marginBottom: spacing.small,
        backgroundColor: colors.primary400,
        borderRadius: spacing.small,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small
    },
    buttonText: {
        fontSize: typography.fs2,
        color: colors.white,
        alignSelf: "center",
    },
})
