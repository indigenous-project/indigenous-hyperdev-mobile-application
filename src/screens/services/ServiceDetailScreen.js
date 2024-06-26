import React, { useLayoutEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native';
import { spacing, colors, typography } from '../../styles';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import ServiceShareHeader from '../../components/ServiceComponent/ServiceShareHeader';
import ServiceDetailCard from '../../components/ServiceComponent/ServiceDetailCard';

const ServiceDetailScreen = ({ route, navigation }) => {
    const token = route.params.token;
    const serviceId = route.params.name;

    //function handle when user tap on link that navigate to mail app
    const handleEmailLink = () => {
        Linking.openURL(`mailto:${serviceId.contact.email}`);
    };

    //function handle when user tap on link that navigate to phone app
    const handlePhoneLink = () => {
        Linking.openURL(`tel:${serviceId.contact.phone}`);
    };

    //useLayoutEffect to get title and share button
    useLayoutEffect(() => {
        serviceId
            ? navigation.setOptions({
                // headerTitle: job.title,
                headerRight: () => <ServiceShareHeader shareData={serviceId} />,
            })
            : null;
    }, [navigation, serviceId]);

    //return serviceDetails by selected service
    if (!serviceId) return null;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['right', 'left']}>
            <FocusedStatusBar barStyle="dark-content" />
            <ScrollView style={styles.container}>
                {/* ServiceDetailCard Component */}
                <ServiceDetailCard
                    name={serviceId.name}
                    serviceProviderName={serviceId.contact.providerName}
                    serviceProviderPosition={serviceId.contact.position}
                    contactEmail={serviceId.contact.email}
                    contactPhone={serviceId.contact.phone}
                    description={serviceId.description}
                    isIndigenous={serviceId.isIndigenous}
                    media={serviceId.medias}
                />
            </ScrollView>

            {/* buttons to call or sending email to service provider */}
            <View style={styles.buttonsGroup}>
                {/* buttons to call */}
                <TouchableOpacity onPress={handlePhoneLink}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
                {/* buttons to sendi */}
                <TouchableOpacity onPress={handleEmailLink}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Email</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
    // Services by category styles
    container: {
        padding: spacing.base,
    },
    //styling for bottom buttons group
    buttonsGroup: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.white,
        justifyContent: 'space-around',
        paddingHorizontal: spacing.base,
        paddingTop: spacing.small,
        bottom: 0
    },
    buttonContainer: {
        width: '40%',
        borderRadius: 10,
        marginBottom: spacing.small,
        backgroundColor: colors.primary400,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: typography.fs2,
        color: colors.white,
        fontWeight: typography.fwBold,
    },
});
