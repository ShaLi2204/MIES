/*
    Schema for the Survey Items Definition
*/

import Users from 'meteor/vulcan:users';
import { Utils } from 'meteor/vulcan:core';
import marked from 'marked';
import SimpleSchema from 'simpl-schema';

/* NAme of the block */
/* Label => Question */

/**
 * @summary SurveyItems schema
 * @type {Object}
 */


const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate:['members'],
        canUpdate:['members']
    },

    createdAt: {
        type: Date,
        optional: true,
        canRead: ['members'],
        onCreate: () => {
            return new Date();
        }
    },

    author: {
        type: String,
        optional: true,
        canRead: ['guests'],
        onUpdate: ({data}) => {
            if (data.userId) {
                return Users.getDisplayNameById(data.userId)
            }
        }
    },

    surveyListId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['guests'],
        // regEx: SimpleSchema.RegEx.Id,
        max: 500,
        resolveAs: {
          fieldName: 'surveyList',
          type: 'SurveyList',
          resolver: async (surveyItem, args, {currentUser, Users, SurveyLists}) => {
            if (!surveyItem.surveyListId) return null;
            const surveyList = await SurveyLists.loader.load(surveyItem.surveyListId);
            return Users.restrictViewableFields(currentUser, SurveyLists, surveyList);
          },
          addOriginalField: true
        },
        hidden: true // never show this
      },

    surveyItemType: {
        type: String,
        optional: true,
        max:500,
        canRead: ['guests'],
        canCreate: ['guests'],
        input: 'text',
    },

    userId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        hidden: true,
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            resolver: async (surveyItem, args, {currentUser, Users}) => {
                if( !surveyItem.userId) return null;
                const user = await Users.loader.load(surveyItem.userId);
                return Users.restrictViewableFields(currentUser, Users, user);
            },
            addOriginalField: true
            
        }
    },

    surveyItemQuestion: {
        type: String, 
        optional: true,
        max: 500,
        canRead: ['guests'],
        canCreate: ['guests'],
        canUpdate: ['guests'],
        input: 'textarea'
    },

    required: {
        type: Boolean, 
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },

    isDeleted: {
        type: Boolean, 
        optional: true, 
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        onCreate: () => {
            return false;
        }        
    },

    surveyItemOptions: {
        type: String, 
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members']
    }, 

    surveyItemResponses: {
        type: Object, 
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            arguments: 'limit: Int = 5', 
            type: '[SurveyItemResponse]', 
            resolver: (surveyItem, { limit }, {currentUser, Users, SurveyItemResponses}) => {
                const surveyItemResponses = SurveyItemResponses.find({ surveyItemId: surveyItem._id}, { limit }).fetch();
                return surveyItemResponses;
            }
        }
    },

/*
    surveyItemOptions: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            arguments: 'limit: Int = 5',
            type: '[SurveyItemOption]',
            resolver: (surveyItem, {limit}, {currentUser, Users, SurveyItems }) => {
                const surveyItemOptions = SurveyItemOptions.find({ surveyItemId: surveyItem._id}, {limit}).fetch();
                return surveyItemOptions;
            }
        }
    },

    matrixSurveyItemId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
        max: 500,
        resolveAs: {
            fieldName: 'matrixSurveyItem',
            type: 'MatrixSurveyItem',
            resolver: async (surveyItem, args, {currentUser, Users, MatrixSurveyItems}) => {
                if (!surveyItem.matrixSurveyItemId) return null;
                const matrixSurveyItem = await MatrixSurveyItems.loader.load(surveyItem.matrixSurveyItemId);
                return Users.restrictViewableFields(currentUser, MatrixSurveyItems, matrixSurveyItem);
            },
            addOriginalField: true
        },
        hidden: true
    },



    objectTest: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['guests'],
    }
/*
    options: {
        type: Array,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        group: optionGroup
    },

    'options.$' : {
        type:optionSchema
    },
*/
}

export default schema;
