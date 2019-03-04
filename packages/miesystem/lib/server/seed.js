
import SurveyLists from '../modules/Surveys/collection.js';
import { createMutator } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Promise } from 'meteor/promise';


const seedData = [
    {
        _id: 'testid1',
        title: 'test1',
        description: 'test1',
        userId: 'testuserid1'
    },
    {
        _id: 'testid2',
        title: 'test2',
        description: 'test2',
        userId: 'testuserid2'
    }
];

Meteor.startup(() => {
  /*if (Users.find().fetch().length === 0) {
    Promise.await(createDummyUsers());
  }*/
  const currentUser = Users.findOne(); // just get the first user available
  if (SurveyLists.find().fetch().length === 0) {
    // eslint-disable-next-line no-console
    console.log('// creating dummy movies');
    Promise.awaitAll(seedData.map(document => createMutator({
      action: 'surveylists.create',
      collection: SurveyLists,
      document,
      currentUser,
      validate: false,
    })));
  }
});



