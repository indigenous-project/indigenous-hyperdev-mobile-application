import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../styles'

//card to display New Survey Available
export default function SurveyCard(props) {
    return (
        <View style={styles.newSurvey}>
            <Image style={styles.image} source={require('../testImages/demoPic.png')} />
            <View style={styles.surveyTitle}>
                <Text style={styles.surveyText}>{props.title}</Text>
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
        maxWidth: "95%",
        shadowOpacity: 0.2,
        shadowOffset: { width: 3, height: 6 },
        shadowColor: colors.gray900,
        backgroundColor: colors.white,
        margin: spacing.small,
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
    },
    buttonContainer: {
        minWidth: "50%",
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
    },

})
