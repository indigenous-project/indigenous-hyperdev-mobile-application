import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display upcoming events
export default function CategoryButton(props) {
    return (
        <View>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryIcon}>{props.icon}</Text>
            </TouchableOpacity>
            <Text style={styles.categoryName}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    //styling for category button
    categoryButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 3, height: 6 },
        shadowColor: colors.gray900,
        shadowOpacity: 0.2,
        borderRadius: 100,
        backgroundColor: colors.primary50,
    },
    categoryIcon: {
        color: colors.primary900,
        fontSize: 40,
    },
    categoryName: {
        color: colors.primary900,
        fontWeight: "600",
        alignSelf: "center",
        marginTop: spacing.small,
        fontSize: typography.fs2
    }
})
