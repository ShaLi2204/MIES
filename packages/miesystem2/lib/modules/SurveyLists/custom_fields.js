/**
 * Custom fields on Users Collection
 */

import Users from 'meteor/vulcan:users';
import SimpleSchema from 'simpl-schema';

Users.addField([
    /**
     * Count of the users' surveys
     */
    {
        fieldName: 'surveyListCount',
        fieldSchema: {
            type: Number, 
            optional: true,
            defaultValue: 0,
            canRead: ['guests']
        }
    },
    /**
     * The user's associated surveyLists
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
                return surveyLists;
            }
          }
        }
    },
]);