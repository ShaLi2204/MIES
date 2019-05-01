
import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment SurveyItemsList on SurveyItem {
    _id
    surveyListId
    label
    required
    surveyItemType
    matrixSurveyItemId
  }
`);

registerFragment(`
  fragment SurveysQuestionFragment on SurveyItem {
    _id
    surveyListId
    label
    required
    surveyItemType
  }
`);

registerFragment(`
  fragment SurveyItemsTextBox on SurveyItem {
    _id
    surveyListId
    label
  }
`);

registerFragment(`
  fragment SurveyItemsChoice on SurveyItem {
    _id
    surveyListId
    label
    options
    required
  }
`);