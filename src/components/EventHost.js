import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display host for events
export default function EventHost(props) {
    return (
        <View style={styles.hostCard} >
            <View style={styles.cardContent}>
                <Image
                    style={styles.hostIcon}
                    source={require('../testImages/userIcon.png')} />
                <View>
                    <Text style={styles.hostTitle}>{props.name}</Text>
                    <Text style={styles.hostType}>{props.type}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    //host Card styles
    hostCard: {
        paddingVertical: spacing.small,
        width: '100%',
        borderBottomColor: colors.gray900,
        borderBottomWidth: 0.2
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: spacing.large,
    },
    hostIcon: {
        width: 60,
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 100,
        marginRight: spacing.base
    },
    hostTitle: {
        color: colors.gray900,
        fontSize: typography.fs3,
        fontWeight: typography.fwBold,
        marginBottom: spacing.smaller
    },
    hostType: {
        color: colors.gray900,
        fontSize: typography.fs2
    },
})
