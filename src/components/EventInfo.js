import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display host for events
export default function EventInfo(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.eventDate}>Event Date</Text>
            <Text style={styles.eventStatus}>Interested | Going</Text>
            <View style={styles.eventInfo}>
                <Image
                    style={styles.infoIcon}
                    source={require('../testImages/locationIcon.png')} />
                <View>
                    <Text style={styles.location}>Location</Text>
                </View>
            </View>
            <View style={styles.eventInfo}>
                <Image
                    style={styles.infoIcon}
                    source={require('../testImages/timeIcon.png')} />
                <View>
                    <Text style={styles.time}>Time</Text>
                    <Text style={styles.duration}>Time</Text>
                </View>
            </View>
            <View style={styles.eventInfo}>
                <Image
                    style={styles.infoIcon}
                    source={require('../testImages/priceIcon.png')} />
                <View>
                    <Text style={styles.price}>Price</Text>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    //container style
    container: {
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.small,
        marginTop: spacing.hairline,
        marginBottom: spacing.smaller
    },

    //Event Info styles
    eventDate: {
        fontSize: typography.fs3,
        fontWeight: typography.fwBold,
        textTransform: 'uppercase',
        marginVertical: spacing.smallest
    },
    eventStatus: {
        fontSize: typography.fs3,
        marginVertical: spacing.smallest
    },
    infoIcon: {
        marginTop: spacing.hairline,
        width: 30,
        height: 30
    },

    eventInfo: {
        marginTop: spacing.smallest,
        flexDirection: 'row'
    },
    location: {
        marginTop: spacing.smallest,
        textDecorationLine: 'underline',
        color: 'blue',
        fontSize: typography.fs3,
        marginLeft: spacing.smaller
    },
    time: {
        marginTop: spacing.smallest,
        fontSize: typography.fs3,
        marginLeft: spacing.smaller
    },
    duration: {
        fontSize: typography.fs3,
        marginLeft: spacing.smaller,
        fontWeight: typography.fwLight,
        color: colors.gray500
    },
    price: {
        marginTop: spacing.smallest,
        fontSize: typography.fs3,
        marginLeft: spacing.smaller
    },
})
