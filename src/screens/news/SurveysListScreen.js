import React, {useEffect, useState} from 'react';
import {View, Linking} from 'react-native';
import {surveyGetList} from '../../api/surveys/surveys.api';
import {useCurrentUser} from '../../contexts/currentUserContext';
import {useIsFocused} from '@react-navigation/core';
import SurveyListCard from '../../components/SurveyListCard';
import {
  formatDate,
  formatDateByTime,
  formatDateByMonth,
} from '../../modules/date.format';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SurveysListScreen = () => {
  const [surveys, setSurveys] = useState(null);
  const [currentUser, token] = useCurrentUser();
  const isFocused = useIsFocused();
  // useEffect load survey list
  useEffect(() => {
    if (token && isFocused)
      surveyGetList(token)
        .then(setSurveys)
        .catch(err =>
          Alert.alert(err.errors[0].title, err.errors[0].description),
        );
  }, [token, isFocused]);

  return (
    <View>
      {surveys
        ? surveys.map(survey => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(survey.link);
                surveyId: survey._id
              }}
              key={survey._id}
              >
              <SurveyListCard
                media={survey.medias}
                title={survey.title}
                startDate={formatDateByMonth(survey.startDate)}
                endDate={formatDateByMonth(survey.endDate)}
              />
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

export default SurveysListScreen;
