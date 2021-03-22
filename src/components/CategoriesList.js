//List of Categories module

// import packages
import React from 'react';
import CategoryButton from '../components/CategoryButton'
import {
    StyleSheet,
    View,
} from 'react-native';

import { colors, themes, spacing } from '../styles';

//function return
function CategoriesList(props) {
    const theme = themes.light;

    return (
        <View style={styles.baseModal}>
            <View style={styles.services}>
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/cultureIcon.png"
                    name="Culture"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/legalIcon.png"
                    name="Government/ Legal"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/hospitalIcon.png"
                    name="Mental Health/ Addiction"
                />
            </View>
            <View style={styles.services}>
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/communityIcon.png"
                    name="Community"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/employmentIcon.png"
                    name="Employment & Housing"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/emergencyIcon.png"
                    name="Emergency"
                />
            </View>
            <View style={styles.services}>
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/familyIcon.png"
                    name="Family"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/incomeIcon.png"
                    name="Income Support"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/disabilityIcon.png"
                    name="Disabilities"
                />
            </View>
            <View style={styles.services}>
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/lgbtqIcon.png"
                    name="LGBTQ"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/homelessIcon.png"
                    name="Homelessness"
                />
                <CategoryButton
                    icon="https://indigenous-images.s3.amazonaws.com/abbuseIcon.png"
                    name="Abuse/ Assault"
                />
            </View>
        </View>
    );
}

export default CategoriesList;

const styles = StyleSheet.create({
    baseModal: {
        height: 700,
        paddingTop: spacing.small,
        backgroundColor: colors.white
    },

    //styling for service categories
    services: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: spacing.small,
        backgroundColor: colors.white,
    },
});
