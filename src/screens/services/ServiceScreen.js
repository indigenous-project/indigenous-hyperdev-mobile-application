//ServiceScreen module

// import packages
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import ServicesCategoryButton from '../../components/ServicesCategoryButton';
import ServicesCard from '../../components/ServicesCard';
import { themes, spacing, typography, colors } from '../../styles';
import { serviceGetList } from '../../api/services/services.api';
import { useCurrentUser } from '../../contexts/currentUserContext';
// import ServiceCategoriesList from '../../components/ServiceCategoriesList';
import { useCategoryGeneral } from '../../contexts/categoriesGeneralContext';
import { removeAsyncStorage, useAsyncStorage } from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';

//function return
function ServiceScreen({ navigation }) {
  const [services, setServices] = useState(null);
  // const [category, setCategory] = useState(null);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [currentUser, token] = useCurrentUser();
  const [categories] = useCategoryGeneral();
  const [lastOpen, setLastOpen] = useAsyncStorage('lastOpen', []);
  const isFocused = useIsFocused();
  //removeAsyncStorage('lastOpen');
  const [storedValue, setStoredValue] = useState();
  useEffect(() => {
    AsyncStorage.getItem('lastOpen')
      .then((value) => {
        if (value === null) return [];
        return JSON.parse(value);
      })
      .then(setStoredValue)
      .catch(Alert.alert);
  }, [isFocused]);

  const categoriesGeneral = categories.filter(
    (item) => item.type === 'general',
  );
  //removeAsyncStorage('lastOpen');
  useEffect(() => {
    serviceGetList(token)
      .then(setServices)
      .catch((err) =>
        Alert.alert(err.errors[0].title, err.errors[0].description),
      );
  }, [token]);

  if (categoriesExpanded == false) {
    categoriesGeneral.length = 6;
  }

  if (!services) return null;
  function renderItem({ item }) {
    return categoriesGeneral ? (
      <View
        style={{
          width: '25%',
          marginHorizontal: spacing.base,
          marginVertical: spacing.smallest,
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('Services and Programs', {
              name: item.name,
              token: token,
            })
          }>
          <ServicesCategoryButton
            icon={item.icon}
            name={item.name}
            category={{ id: item._id, name: item.name }}
          />
        </Pressable>
      </View>
    ) : null;
  }
  return (
    <SafeAreaView edges={['right', 'left']} style={{ flex: 1 }}>
      {/* <ScrollView > */}
      <View>
        <FocusedStatusBar barStyle="light-content" />

        {/* Services by category template */}
        <View style={styles.container}>
          <View style={styles.titleBlock}>
            <Text style={styles.heading}>Services by Category</Text>
            {categoriesExpanded == true ? (
              <Text onPress={() => setCategoriesExpanded(!categoriesExpanded)}>
                See Less
              </Text>
            ) : (
              <Text onPress={() => setCategoriesExpanded(!categoriesExpanded)}>
                See All
              </Text>
            )}
          </View>
        </View>
        <FlatList
          style={{
            backgroundColor: colors.white,
            marginBottom: spacing.base,
            paddingVertical: spacing.smaller,
          }}
          data={categoriesGeneral}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />

        {/* last opened template */}

        <View style={styles.container}>
          <Text style={styles.heading}>Last Opened</Text>
          <ScrollView>
            {storedValue.length > 0
              ? storedValue.map((service) => (
                <ServicesCard
                  key={service._id}
                  title={service.name}
                  name={
                    service.contact.providerName
                      ? service.contact.providerName
                      : '_'
                  }
                  position={service.contact.position}
                />
              ))
              : null}
          </ScrollView>
        </View>

        {/* saved Services template */}
        {/* <View style={styles.savedItemContainer}>
        <Text style={styles.heading}>Saved Services</Text>
        <ServicesCard
          title="A place to Gather"
          name="Donny Sutherlan"
          description="A place to Gather (Enjamonjading) Worker"
        />
        <ServicesCard
          title="A place to Gather"
          name="Donny Sutherlan"
          description="A place to Gather (Enjamonjading) Worker"
        />
      </View> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // Services by category styles
  container: {
    padding: spacing.base,
    backgroundColor: colors.white,
  },
  // savedItemContainer: {
  //   padding: spacing.base,
  //   backgroundColor: colors.white,
  //   marginTop: spacing.base
  // },

  heading: {
    color: colors.primary900,
    paddingBottom: spacing.smallest,
    fontWeight: typography.fwBold,
    fontSize: typography.fs3,
  },

  titleBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  groupOfCatergories: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default ServiceScreen;
