/*

Custom fields on Users collection

*/

import Users from 'meteor/vulcan:users';
import SimpleSchema from 'simpl-schema';

Users.addField([
    /**
      Count of the user's posts
    */
    {
      fieldName: 'surveyListCount',
      fieldSchema: {
        type: Number,
        optional: true,
        defaultValue: 0,
        canRead: ['guests'],
      }
    },
    /**
      The user's associated posts (GraphQL only)
    */
    {
      fieldName: 'surveyLists',
      fieldSchema: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
          arguments: 'limit: Int = 5',
          type: '[SurveyList]',
          resolver: (user, { limit }, { currentUser, Users, SurveyLists }) => {
            const surveyLists = SurveyLists.find({ userId: user._id }, { limit }).fetch();
  
            // restrict documents fields
            //const viewablePosts = _.filter(posts, post => Posts.checkAccess(currentUser, post));
            //const restrictedPosts = Users.restrictViewableFields(currentUser, Posts, viewablePosts);
            return surveyLists;
          }
        }
      }
    },
  ]);
  