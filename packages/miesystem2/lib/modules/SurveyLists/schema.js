/*

Schema of SurveyLists

*/


import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting, getCollection } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';

/**
 * @summary SurveyLists schema
 * @type {Object}
 */

const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },

    /* The time at which the survey is created */
    createdAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
        onCreate: () => {
            return new Date();
        }
    },

    /**
    URL
    */
   
    url: {
        type: String,
        optional: true,
        max: 500,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'url',
        order: 10,
        hidden: true,
        searchable: true,
        query: `
        SiteData{
            logoUrl
            title
        }
        `,
    },
    
    /**
    Slug
  */
 
    slug: {
        type: String,
        optional: true,
        canRead: ['guests'],
        onCreate: ({document: surveyList}) => {
        return Utils.slugify(surveyList.title);
        },
        onUpdate: ({data}) => {
        if (data.title) {
            return Utils.slugify(data.title);
        }
        }
    },
    
    postedAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'datetime',
        onCreate: ({document: surveyList, currentUser}) => {
            // Set the surveyList's postedAt if it is going to be published
            if (!surveyList.postedAt && getCollection('SurveyLists').getDefaultStatus(currentUser) === getCollection('SurveyLists').config.STATUS_PUBLIC){
                return new Date();
            }
        },
        onUpdate: ({data, document: surveyList}) => {
            if (!surveyList.postedAt && data.status === getCollection('SurveyLists').config.STATUS_PUBLIC) {
                return new Date();
            }
        }
    },

/* Title */
    title: {
        type: String,
        optional: false,
        max: 500,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'text',
        order: 20,
        searchable: true
    }, 

/* Survey description (markdown) */
    description: {
        type: String,
        optional: true,
        max: 3000,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'textarea',
        order: 30
    },

    status: {
        type: Number,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'select',
        hidden: true,
        onCreate: ({document: document, currentUser}) => {
            if (!document.status) {
                return getCollection('SurveyLists').getDefaultStatus(currentUser);
            }
        },
        onUpdate: ({data, currentUser}) => {
            if(data.status === null) {
                return getCollection('SurveyLists').getDefaultStatus(currentUser);
            }
        },
        options: () => getCollection('SurveyLists').statuses,
    },

    /* Whether a survey is scheduled in the future or not */
    isFuture: {
        type: Boolean,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        onCreate: ({document: surveyList}) => {
            if (surveyList.postedAt) {
                const postTime = new Date(surveyList.postedAt).getTime();
                const currentTime = new Date().getTime() + 1000;
                return postTime > currentTime; //round up to the second
            }
        },
        onUpdate: ({data, document: surveyList}) => {
            if (data.postedAt) {
                const postTime = new Date(data.postedAt).getTime();
                const currentTime = new Date().getTime() + 1000;
                if (postTime > currentTime){
                    // if a surveyList's postedAt date is in the future, set isFuture to true
                    return true;
                } else if (surveyList.isFuture) {
                    //else if a post has isFuture to true but its data is in the past, set isFuture to false
                    return false;
                }
            }
        }
    },

/* The survey author's name */

    author: {
        type: String,
        optional: true,
        canRead: ['guests'],
        onUpdate: ({data}) => {
        // if userId is changing, change the author name too
        if (data.userId) {
            return Users.getDisplayNameById(data.userId)
        }
        }
    },


    userId: {
        type: String,
        optional: true,
        input: 'select',
        canRead: ['guests'],
        canCreate: ['members'],
        hidden: true,
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            resolver: async (surveyList, args, context) => {
                if (!surveyList.userId) return null;
                const user = await context.Users.loader.load(surveyList.userId);
                return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
            },
            addOriginalField: true
        }
    },

    surveyItemsCount: {
        type: Number,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            type: 'Int',
            resolver: (surveyList, args, { SurveyItems }) => {
                const surveyItemsCount = SurveyItems.find({ surveyListId: surveyList._id}).count();
                return surveyItemsCount;
            }
        }
    },

    // A survey can have multiple survey items
    surveyItems: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
          arguments: 'limit: Int = 5',
          type: '[SurveyItem]',
          resolver: (surveyList, { limit },  { currentUser, Users, SurveyItems }) => {
            const surveyItems = SurveyItems.find({ surveyListId: surveyList._id }, { limit }).fetch();
            return surveyItems;
          }
        }
    },

    password: {
        type: String,
        optional: true,
        canCreate: ['members'],
        canRead: ['members']
    },
    
    surveyResponses: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
          arguments: 'limit: Int = 5',
          type: '[SurveyResponse]',
          resolver: (surveyList, { limit },  { currentUser, Users, SurveyResponses }) => {
            const surveyResponses = SurveyResponses.find({ surveyListId: surveyList._id }, { limit }).fetch();
            return surveyResponses;
          }
        }
    },
}

export default schema;
