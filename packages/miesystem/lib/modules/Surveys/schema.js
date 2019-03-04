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
    

    /*
    Timestamp of survey first appearing on the site (i.e. being open or public)
    */
/*   
   postedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'datetime',
    group: formGroups.admin,
    onCreate: ({newDocument: surveylist, currentUser}) => {
    // Set the survey's postedAt if it's going to be approved
    const userDefaultStatus = getCollection('SurveyLists').getDefaultStatus(currentUser);
    if (!survey.postedAt &&  ( userDefaultStatus === getCollection('SurveyLists').config.STATUS_OPEN || userDefaultStatus === getCollection('SurveyLists').config.STATUS_PUBLIC ))  {
        return new Date();
        }
    },
    onUpdate: ({data, document: surveylist}) => {
    // Set the survey's postedAt if it's going to be approved
    if (!surveylist.postedAt && ( data.status === getCollection('SurveyLists').config.STATUS_OPEN || data.status === getCollection('SurveyLists').config.STATUS_PUBLIC )) {
        return new Date();
        }
    }
},
*/

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

/* HTML version of the survey description */
/*
    htmlDescription: {
        type: String,
        optional: true,
        canRead: ['guests'],
        onCreate: ({newDocument: surveylist}) => {
        if (survey.description) {
            return Utils.sanitize(marked(surveylist.description));
        }
        },
        onUpdate: ({data}) => {
        if (data.descirption) {
            return Utils.sanitize(marked(data.description));
        }
        }
    },
*/

/*
    Count of how many times the survey's page was viewed
*/
/*
    viewCount: {
        type: Number,
        optional: true,
        canRead: ['admins'],
        defaultValue: 0
    },
*/

/*
    Timestamp of the last survey submission
*/
/*
    lastSurveySubmissionAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
    },
*/

/*
    The survey's status. One of draft (`1`), open (`2`), public ('3'), closed (`4`), deleted ('5')
*/
/*
    status: {
        type: Number,
        optional: true,
        canRead: ['guests'],
        canCreate: ['admins'],
        canUpdate: ['admins'],
        input: 'select',
        onCreate: ({newDocument: document, currentUser}) => {
        if (!document.status) {
            return getCollection('SurveyLists').getDefaultStatus(currentUser);
        }
        },
        onUpdate: ({data, currentUser}) => {
        // if for some reason post status has been removed, give it default status
        if (data.status === null) {
            return getCollection('SurveyLists').getDefaultStatus(currentUser);
        }
        },
        options: () => getCollection('SurveyLists').statuses,
        group: formGroups.admin
    },
*/

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

    surveyItems: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
          arguments: 'limit: Int = 5',
          type: '[SurveyItem]',
          resolver: (surveyList, { limit },  { currentUser, Users, SurveyItems }) => {
            const surveyItems = SurveyItems.find({ surveyListId: surveyList._id }, { limit }).fetch();
    
            // restrict documents fields
           // const viewableSurveyItems = _.filter(surveyItems, surveyItems => SurveyItems.checkAccess(currentUser, surveyItems));
            //const restrictedSurveyItems = Users.restrictViewableFields(currentUser, SurveyItems, viewableSurveyItems);
    
            return surveyItems;
          }
        }
      },

/* GraphQL-only fields */
/*
    postedAtFormatted: {
        type: String,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
        type: 'String',
        resolver: (surveylist, args, context) => {
            return moment(surveylist.postedAt).format('dddd, MMMM Do YYYY');
        }
        }
    },
*/
/*
responseCount: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
    type: 'Int',
    resolver: (survey, args, { SurveyResponses }) => {
        const responseCount = SurveyResponses.find({ surveyId: survey._id }).count(); //TODO: Must filter by status
        return responseCount;
    },
    }
},
*/
/*
responses: {
    type: Object,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
    arguments: 'limit: Int = 5',
    type: '[SurveyResponse]',
    resolver: (survey, { limit }, { currentUser, Users, SurveyResponses }) => {
        const responses = SurveyResponses.find({ surveyId: survey._id }, { limit }).fetch(); //TODO: Must filter by status

        // restrict documents fields
        const viewableResponses = _.filter(responses, responses => SurveyResponses.checkAccess(currentUser, responses));
        const restrictedResponses = Users.restrictViewableFields(currentUser, SurveyResponses, viewableResponses);

        return restrictedResponses;
    }
    }
},
*/

/* TODO: SurveyItemDefinitions */ 
/*
    emailShareUrl: {
        type: String,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
        type: 'String',
        resolver: (surveylist, args, { SurveyLists }) => {
            return SurveyLists.getEmailShareUrl(surveylist);
        }
        }
    },
*/
/*
    twitterShareUrl: {
        type: String,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
        type: 'String',
        resolver: (surveylist, args, { SurveyLists }) => {
            return SurveyLists.getTwitterShareUrl(surveylist);
        }
        }
    },
*/
/*
    facebookShareUrl: {
        type: String,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
        type: 'String',
        resolver: (surveylist, args, { SurveyLists }) => {
            return SurveyLists.getFacebookShareUrl(surveylist);
        }
        }
    },
*/
}

export default schema;
