import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {themes, colors, spacing, typography} from '../../styles';
import SearchList from '../../components/SearchList';
import {Header, Item, Input, Icon, Left, Button, Right} from 'native-base';
import SearchBar from '../../components/SearchBar';
import {useDiscussion} from '../../contexts/discussionContext';
import {useEffect} from 'react/cjs/react.development';

function SearchScreen({navigation}) {
  const theme = themes.light;

  const [search, setSearch] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [discussions] = useDiscussion();
  console.log(search);

  useEffect(() => {
    discussions && search
      ? setSearchArray(
          discussions.filter((discussion) => {
            const itemData = `${discussion.title.toLowerCase()} ${discussion.categories.name.toLowerCase()}`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchArray([]);
  }, [discussions, search]);

  // console.log(searchArray);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        {/* <SearchBar placeholder="Search" /> */}

        <Header
          searchBar
          iosBarStyle="light-content"
          style={{backgroundColor: themes.light.primaryColor}}>
          <Left style={{maxWidth: '10%'}}>
            <Button
              transparent
              style={{marginBottom: 5}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name="chevron-back-outline"
                style={{color: themes.light.inverseTextColor}}
              />
            </Button>
          </Left>
          <Item rounded style={{backgroundColor: colors.gray200}}>
            <Icon name="ios-search" />

            <Input
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
              autoCorrect={false}
            />
          </Item>
        </Header>

        <SearchList result={searchArray} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
