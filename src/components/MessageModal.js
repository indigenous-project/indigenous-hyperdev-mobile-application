// Import React and Component
import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';
import { spacing, typography } from '../styles';

const MessageModal = (props) => {
  const { showing, message, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={showing}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator
            animating={true}
            color="#000000"
            size="large"
            style={styles.activityIndicator}
          /> */}
          <Text
            style={{
              flex: 1,
              fontSize: typography.fs3,
              fontWeight: typography.fwMedium,
              padding: spacing.base,
              justifyContent: 'center',
              alignSelf: 'center',
              // textAlignVertical: 'center',
            }}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 250,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

export default MessageModal;
