import React, {useState} from 'react';
import {Text, StyleSheet, Pressable, Modal} from 'react-native';
import {themes, spacing, colors, typography} from '../styles';
import {Card, CardItem, Body, View} from 'native-base';
import ServiceDetail from './ServiceDetail';

const ServiceCategoryCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  return (
    <View style={styles.textCardContainer}>
      <Text style={styles.title}>{props.category}</Text>
      <Pressable onPress={() => setModalVisible(true)}>
        <Card style={styles.cardsContainer}>
          <CardItem style={styles.cardBorder}>
            <Body>
              <Text style={styles.cardText}>{props.title}</Text>
              <Text style={styles.cardText}>{props.name}</Text>
              <Text style={styles.cardText}>{props.description}</Text>
            </Body>
          </CardItem>
        </Card>
      </Pressable>

      <Card style={styles.cardsContainer}>
        <CardItem style={styles.cardBorder}>
          <Body>
            <Text style={styles.cardText}>{props.title}</Text>
            <Text style={styles.cardText}>{props.name}</Text>
            <Text style={styles.cardText}>{props.description}</Text>
          </Body>
        </CardItem>
      </Card>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>
              Suswin Housing First Program
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>x</Text>
            </Pressable>
          </View>
          <ServiceDetail
            visibleModal={setModalVisible}
            image=""
            name="Janie Kataquapit"
            subtitle="subtitle"
            email="Email@email.com"
            phone="987-654-1234"
            description="description"
          />
        </View>
      </Modal>
    </View>
  );
};

export default ServiceCategoryCard;

const styles = StyleSheet.create({

  //style to the card
  textCardContainer: {
    backgroundColor: themes.light.inverseTextColor,
    minHeight: 300,
  },
  title: {
    color: colors.primary900,
    fontSize: typography.fs3,
    fontWeight: typography.fwBold,
    marginTop: spacing.small,
    marginLeft: spacing.large,
  },
  cardsContainer: {
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: spacing.large,
    marginRight: spacing.large,
    marginTop: spacing.base,
  },
  cardBorder: {
    borderRadius: spacing.small,
  },
  cardText: {marginTop: spacing.smaller, marginLeft: spacing.smallest},

  //styling for modal container
  modalView: {
    marginTop: 50,
    backgroundColor: colors.primary50,
    borderRadius: 20,
  },
  modalTitle: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    flexDirection: 'row',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomColor: colors.gray400,
    borderBottomWidth: 0.2,
  },
  modalTitleText: {
    fontSize: typography.fs3,
    color: colors.primary900,
    fontWeight: typography.fwBold,
    paddingTop: spacing.smallest,
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.gray900,
    shadowOpacity: 0.9,
    borderRadius: 20,
    backgroundColor: colors.primary50,
  },
  closeButtonText: {
    color: colors.primary900,
    fontSize: 20,
    fontWeight: typography.fwMedium,
  },
});
