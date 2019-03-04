
//import Users from 'meteor/vulcan:users';
import { SurveyLists } from './collection.js';
//import moment from moment;

/**
 * @summary Views for SurveyLists
 */
/**
 * @summary User posts view
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