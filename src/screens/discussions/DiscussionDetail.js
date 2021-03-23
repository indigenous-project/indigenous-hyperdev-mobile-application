//Discussion Detail module

// import packages
import React, { useState, useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Chips from '../../components/Chips';
import ReplyCard from '../../components/ReplyCard';
import { colors, themes, typography, spacing } from '../../styles';

//function return
function DiscussionDetail(navigate) {
    const theme = themes.light;

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
            <FocusedStatusBar barStyle="light-content" />
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.heading}>Anyone Interested in Event?</Text>
                        <Text style={styles.datePosted}>Wiinzi Amik Posted Jan 31, 2021</Text>
                    </View>
                    <Chips name='indigenous' />
                    <Text style={styles.description}>I just read about a new event in Laurentian Ski Hill. I would like to invite any interested people to join me in the same event and we can enjoy it together. I recently moved in North bay and I don’t have enough Contacts here. So It would be great if anyone wanna join me in this awesome event. I’ve also shared the link of it. Feel free to share with anyone who you think might be interested in this event. Thank you :D</Text>
                    <Image style={styles.image} source={require('../../testImages/demoPic.png')} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Replies</Text>
                    <ReplyCard name='Miishe Gegek' reply='Thank you for sharing this information. I would like to come and join you in this event.' />
                    <ReplyCard name='Miishe Gegek' reply='Thank you for sharing this information. I would like to come and join you in this event.' />
                </View>
            </ScrollView>
            <View style={styles.buttonsGroup}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Reply to this Discussion</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    //container style
    container: {
        alignItems: 'flex-start',
        padding: spacing.base,
        backgroundColor: colors.white,
        marginTop: spacing.hairline,
        marginBottom: spacing.smaller
    },

    //styling for Discussion details
    image: {
        height: 160,
        width: '100%',
        marginVertical: spacing.smaller
    },
    heading: {
        color: colors.primary900,
        marginBottom: spacing.smaller,
        fontWeight: typography.fwBold,
        fontSize: typography.fs3,
    },
    datePosted: {
        marginBottom: spacing.smaller
    },
    description: {
        fontSize: typography.fs3,
        lineHeight: typography.lh3,
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

export default DiscussionDetail;
