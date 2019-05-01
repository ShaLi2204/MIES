
//import Users from 'meteor/vulcan:users';
import { SurveyLists } from './collection.js';
//import moment from moment;

/**
 * @summary Views for SurveyLists
 */
/**
 * @summary User posts view
 */

 
/*
 SurveyLists.addDefaultView(terms => ({
   selector: {
     status: SurveyLists.config.STATUS_PUBLIC,
     isFuture: {$ne: true}, //match both false and undefined
     options: {sort : {createdAt:-1}}
   }
 }))
*/
SurveyLists.addView('userSurveyLists', terms => ({
    selector: {
      userId: terms.userId,
    },
    options: {
      limit: 5,
      sort: {
        createdAt: -1
      }
    }
  }));

  SurveyLists.addView('draft', terms=> ({
    selector: {
      status: SurveyLists.config.STATUS_DRAFT
    },
    options: {
      sort: {createdAt: -1}
    }
  }));

  SurveyLists.addView('public', terms => ({
    selector: {
      status: SurveyLists.config.STATUS_PUBLIC,
    },
    options: {
      sort: {createdAt: -1}
    }
  }));

  SurveyLists.addView('closed', terms => ({
    selector: {
      status: SurveyLists.config.STATUS_CLOSED,
    },
    options: {
      sort: {createdAt: -1}
    }
  }));