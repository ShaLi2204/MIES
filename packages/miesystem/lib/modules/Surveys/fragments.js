import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment SurveyListsFragment on SurveyList {
    # posts
    _id
    createdAt
    title
    description

    # users
    userId
    user {
      username
    }
  }
`);

