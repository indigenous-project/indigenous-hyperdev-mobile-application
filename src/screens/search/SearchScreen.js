import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {themes, colors, spacing, typography} from '../../styles';
import SearchList from '../../components/SearchList';
import SearchBar from '../../components/SearchBar';

function SearchScreen({navigation}) {
  const theme = themes.light;
  // state = {
  //   search: '',
  // };
  // updateSearch = (search) => {
  //   this.setState({search});
  // };
  // const {search} = this.state;

  const [search, setSearch] = useState('');

  const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        {/* <SearchBar placeholder="Search" /> */}

        <SearchBar placeholder="Search" navigation={navigation} />
        <SearchList name="Legal Services" name1="Mental Health" />
      </SafeAreaView>
    </DismissKeyboard>
  );
}

export default SearchScreen;
