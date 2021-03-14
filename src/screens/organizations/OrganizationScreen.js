//OrganizationScreen module

// import packages
import React from 'react';
import {Card, CardItem, Text, Left, Body, Right, View} from 'native-base';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialChip from 'react-native-material-chip';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import SwitchSelector from 'react-native-switch-selector';
import {colors, themes, spacing} from '../../styles';

//function return
function OrganizationScreen(props) {
  const theme = themes.light;

  // options for the switch selector
  const options = [
    {label: 'List', value: 'listButtonValue'},
    {label: 'Map', value: 'mapButtonValue'},
  ];
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <FocusedStatusBar barStyle="light-content" />

      {/* Chips */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.chipsView}>
          <MaterialChip
            style={styles.chips}
            text="Categories"
            onPress={() => console.log('press')}
          />
          <MaterialChip
            style={styles.chips}
            text="Indigenous"
            onPress={() => console.log('press')}
          />
          <MaterialChip
            style={styles.chips}
            text="Top-rated"
            onPress={() => console.log('press')}
          />
          <MaterialChip
            style={styles.chips}
            text="Open-now"
            onPress={() => console.log('press')}
          />
          <MaterialChip
            style={styles.chips}
            text="Distance"
            onPress={() => console.log('press')}
          />
        </View>
      </ScrollView>

      {/* Custom Switch Selectors */}
      <View>
        <SwitchSelector
          style={styles.switch}
          options={options}
          initial={0}
          textColor={theme.primaryColor}
          bold={true}
          animationDuration={200}
          height={spacing.largest}
          selectedColor={theme.inverseTextColor}
          buttonColor={theme.primaryColor}
          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
        />
      </View>

      {/* Cards */}
      <ScrollView style={styles.scrollView}>
        <Card style={styles.cardsView}>
          <CardItem cardBody style={styles.border}>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
              }}
              style={styles.cardImage}
            />
          </CardItem>
          <CardItem style={styles.border}>
            <Left>
              <Body>
                <Text>Title</Text>
                <Text>Rating</Text>
                <Text>Link</Text>
              </Body>
            </Left>
            <Right>
              <Body style={styles.typeAndLocationPosition}>
                <Text>Type</Text>
                <Text>Location</Text>
              </Body>
            </Right>
          </CardItem>
        </Card>

        <Card style={styles.cardsView}>
          <CardItem cardBody style={styles.border}>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
              }}
              style={styles.cardImage}
            />
          </CardItem>
          <CardItem style={styles.border}>
            <Left>
              <Body>
                <Text>Title</Text>
                <Text>Rating</Text>
                <Text>Link</Text>
              </Body>
            </Left>
            <Right>
              <Body style={styles.typeAndLocationPosition}>
                <Text>Type</Text>
                <Text>Location</Text>
              </Body>
            </Right>
          </CardItem>
        </Card>

        <Card style={styles.cardsView}>
          <CardItem cardBody style={styles.border}>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
              }}
              style={styles.cardImage}
            />
          </CardItem>
          <CardItem style={styles.border}>
            <Left>
              <Body>
                <Text>Title</Text>
                <Text>Rating</Text>
                <Text>Link</Text>
              </Body>
            </Left>
            <Right>
              <Body style={styles.typeAndLocationPosition}>
                <Text>Type</Text>
                <Text>Location</Text>
              </Body>
            </Right>
          </CardItem>
        </Card>

        <Card style={styles.cardsView}>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1615484486786-5a3732131c13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
              }}
              style={styles.cardImage}
            />
          </CardItem>
          <CardItem style={styles.border}>
            <Left>
              <Body>
                <Text>Title</Text>
                <Text>Rating</Text>
                <Text>Link</Text>
              </Body>
            </Left>
            <Right>
              <Body style={styles.typeAndLocationPosition}>
                <Text>Type</Text>
                <Text>Location</Text>
              </Body>
            </Right>
          </CardItem>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {flex: spacing.hairline},
  chipsView: {flexDirection: 'row', padding: spacing.sectionPadding},
  chips: {
    backgroundColor: themes.light.inverseTextColor,
  },
  switch: {
    width: '50%',
    justifyContent: 'center',
    marginLeft: '30%',
    marginBottom: spacing.smaller,
  },
  cardsView: {
    marginLeft: spacing.smaller,
    marginRight: spacing.smaller,
    marginBottom: spacing.smaller,
    borderRadius: spacing.small,
    shadowColor: colors.shadowcolor,
    shadowOffset: {
      width: spacing.none,
      height: spacing.smallest,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardImage: {height: 100, flex: 1, borderTopLeftRadius: 12},
  border: {borderRadius: 12},
  typeAndLocationPosition: {marginTop: 20},
});
export default OrganizationScreen;
