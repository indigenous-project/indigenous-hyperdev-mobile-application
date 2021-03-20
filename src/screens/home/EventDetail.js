//Event Detail module

// import packages
import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import EventHost from '../../components/EventHost';
import EventInfo from '../../components/EventInfo';
import { colors, themes, typography, spacing } from '../../styles';

//function return
function EventDetail(navigate) {
    const theme = themes.light;

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
            <ScrollView horizontal={false}>
                <FocusedStatusBar barStyle="light-content" />
                {/* <Text>{JSON.stringify(categories)}</Text> */}

                <ScrollView>
                    <Image style={styles.image} source={require('../../testImages/demoPic.png')} />
                    <EventInfo />
                    <View style={styles.container}>
                        <Text style={styles.description}>SAVE THE DATE!
                        Minweyaang Round Dance at Nbisiing High
                        School on Saturday Feb 20, 2021.
                        Pipe & Feast Ceremony 3:00 – 5:00pm
                        Round Dance 6:00pm
                        **Remember to bring your water bottles
                        and Feast bundles/kit**</Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.heading}>Hosts</Text>
                        <EventHost name='Organization Name' type='Organization type' />
                    </View>
                </ScrollView>
            </ScrollView>
            <View style={styles.buttonsGroup}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Interested</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Going</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    //container style
    container: {
        alignItems: 'flex-start',
        padding: spacing.small,
        backgroundColor: colors.white,
        marginTop: spacing.hairline,
        marginBottom: spacing.smaller
    },

    //styling for upcoming event
    image: {
        height: 160,
        width: '100%'
    },
    heading: {
        color: colors.primary900,
        paddingLeft: spacing.small,
        fontWeight: typography.fwBold,
        fontSize: typography.fs3,
    },

    description: {
        fontSize: typography.fs3,
        lineHeight: typography.lh3,
        paddingHorizontal: spacing.small,
    },

    //styling for bottom buttons group
    buttonsGroup: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: colors.white,
        justifyContent: 'space-around',
        paddingHorizontal: spacing.base,
        paddingTop: spacing.base
    },
    buttonContainer: {
        width: "40%",
        borderRadius: 10,
        marginBottom: spacing.small,
        backgroundColor: colors.primary500,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small
    },
    buttonText: {
        alignSelf: "center",
        fontSize: typography.fs2,
        color: colors.white,
        fontWeight: typography.fwBold
    },
});

export default EventDetail;
