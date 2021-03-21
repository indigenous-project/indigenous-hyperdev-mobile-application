import React from 'react';
import {View, StyleSheet} from 'react-native';
import { colors,typography} from '../styles';

import { Text, ListItem, List, } from 'native-base';


const SearchList = (props) => {
    return (
        <View>
          <List>
            <ListItem itemHeader  >
              <Text style={styles.recent} >Recent</Text>
            </ListItem>
            <ListItem >
              <Text>{props.name}</Text>
            </ListItem>
            <ListItem >
              <Text>{props.name1}</Text>
            </ListItem>
          </List>
       
      </View>
    )
}

export default SearchList

const styles = StyleSheet.create({
    recent: {
        color: colors.primary900,
        fontSize: typography.fs2,
        fontWeight: typography.fwBold,
        
      }
})
