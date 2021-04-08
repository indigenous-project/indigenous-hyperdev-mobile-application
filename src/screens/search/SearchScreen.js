import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {themes, colors} from '../../styles';
import SearchList from '../../components/SearchList';
import {Header, Item, Input, Icon, Left, Button} from 'native-base';
import {useDiscussion} from '../../contexts/discussionContext';
import {useEffect} from 'react/cjs/react.development';
import {useEvent} from '../../contexts/eventContext';
import {useJob} from '../../contexts/jobContext';
import {useNews} from '../../contexts/newsContext';
import {useService} from '../../contexts/serviceContext';
import {useOrganization} from '../../contexts/organizationContext';

function SearchScreen({navigation}) {
  const [search, setSearch] = useState('');
  const [searchDiscussionArray, setSearchDiscussionArray] = useState([]);
  const [searchEventArray, setSearchEventArray] = useState([]);
  const [searchJobArray, setSearchJobArray] = useState([]);
  const [searchNewsArray, setSearchNewsArray] = useState([]);
  const [searchServiceArray, setSearchServiceArray] = useState([]);
  const [searchOrganizationArray, setSearchOrganizationArray] = useState([]);
  /////////////////////////////////////////
  const [discussions] = useDiscussion();
  const [events] = useEvent();
  const [jobs] = useJob();
  const [news] = useNews();
  const [services] = useService();
  const [organizations] = useOrganization();

  //search DISCUSSION
  useEffect(() => {
    discussions && search
      ? setSearchDiscussionArray(
          discussions.filter((discussion) => {
            const itemData = `${discussion.title.toLowerCase()} ${
              discussion.categories
                ? discussion.categories.name.toLowerCase()
                : null
            } discussions`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchDiscussionArray([]);
  }, [discussions, search]);

  //search EVENT
  useEffect(() => {
    events && search
      ? setSearchEventArray(
          events.filter((event) => {
            const itemData = `${event.title.toLowerCase()} events`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchEventArray([]);
  }, [events, search]);

  //search JOB
  useEffect(() => {
    jobs && search
      ? setSearchJobArray(
          jobs.filter((job) => {
            const itemData = `${job.title.toLowerCase()} ${job.type.toLowerCase()} jobs`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchJobArray([]);
  }, [jobs, search]);

  //search NEWS
  useEffect(() => {
    news && search
      ? setSearchNewsArray(
          news.filter((item) => {
            const itemData = `${item.title.toLowerCase()} ${
              item.category ? item.category.name.toLowerCase() : null
            } news`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchNewsArray([]);
  }, [news, search]);

  //search SERVICES
  useEffect(() => {
    services && search
      ? setSearchServiceArray(
          services.filter((service) => {
            const itemData = `${service.name.toLowerCase()} ${
              service.category ? service.category.name.toLowerCase() : null
            } ${service.isIndigenous ? 'indigenous' : null} services`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchServiceArray([]);
  }, [services, search]);

  //search ORGANIZATION
  useEffect(() => {
    organizations && search
      ? setSearchOrganizationArray(
          organizations.filter((organization) => {
            const itemData = `${organization.name.toLowerCase()} ${
              organization.category
                ? organization.category.name.toLowerCase()
                : null
            } organizations centre center ${
              organization.isIndigenous ? 'indigenous' : null
            }`;
            return itemData.indexOf(search.trim().toLowerCase()) > -1;
          }),
        )
      : setSearchOrganizationArray([]);
  }, [organizations, search]);

  //console.log(searchJobArray);
  if (
    !searchEventArray ||
    !searchDiscussionArray ||
    !searchJobArray ||
    !searchNewsArray ||
    !searchServiceArray ||
    !searchOrganizationArray
  )
    return null;
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
              returnKeyType="done"
              autoCorrect={false}
            />
          </Item>
        </Header>

        <SearchList
          navigationProp={navigation}
          discussion={searchDiscussionArray}
          event={searchEventArray}
          job={searchJobArray}
          news={searchNewsArray}
          service={searchServiceArray}
          organization={searchOrganizationArray}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
