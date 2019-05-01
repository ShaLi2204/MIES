
import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment SurveyItemsList on SurveyItem {
    _id
    surveyListId
    surveyItemQuestion
    required
    surveyItemType
    surveyItemOptions
  }
`);