import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display New Survey Available
export default function SurveyCard(props) {
    return (
        <View style={styles.newSurvey}>
            <Image style={styles.image} source={require('../testImages/demoPic.png')} />
            <View style={styles.surveyTitle}>
                <Text numberOfLines={2} style={styles.surveyText}>{props.title}</Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Start Survey</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    //survey card style
    newSurvey: {
        flexDirection: 'row',
        borderRadius: 10,
        maxWidth: "100%",
        backgroundColor: colors.white,
        marginTop: spacing.small,
        shadowOffset: {
            width: spacing.none,
            height: spacing.smallest,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        borderRadius: 10,
        width: 110,
        height: 110,
        marginVertical: spacing.small,
        marginLeft: spacing.small
    },
    surveyTitle: {
        display: "flex",
        justifyContent: "center",
        width: "70%",
        alignItems: "center"
    },
    surveyText: {
        fontSize: typography.fs3,
        lineHeight: typography.lh3,
        fontWeight: typography.fwMedium,
        paddingBottom: spacing.small,
        paddingHorizontal: spacing.small,
        alignItems: 'flex-start'
    },
    buttonContainer: {
        minWidth: "50%",
        borderRadius: 10,
        marginBottom: spacing.small,
        backgroundColor: colors.primary400,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small
    },
    buttonText: {
        alignSelf: "center",
        fontSize: typography.fs2,
        color: colors.white,
        fontWeight: typography.fwMedium
    },

})
