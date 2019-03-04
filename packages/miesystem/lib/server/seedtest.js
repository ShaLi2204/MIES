

import SurveyItems from '../modules/Surveys/SurveyItem/collection.js';

import { createMutator } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const seedData = [
    {
        _id: 'testid1',
        surveyId: 'test1',
        label: 'test1'
    },
    {
        _id: 'testid2',
        surveyId: 'test2',
        label: 'test2'
    }
];

Meteor.startup(function () {
    if (Users.find().fetch().length === 0) {
      Accounts.createUser({
        username: 'DemoUser',
        email: 'dummyuser@telescopeapp.org',
        profile: {
          isDummy: true
        }
      });
    }
    const currentUser = Users.findOne();
    if (SurveyItems.find().fetch().length === 0) {
      seedData.forEach(document => {
        createMutator({
          collection: SurveyItems,
          document: document, 
          currentUser: currentUser,
          validate: false
        });
      });
    }
  });