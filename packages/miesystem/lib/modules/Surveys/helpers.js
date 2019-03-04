/*

Survey helpers

*/

import moment from 'moment';
import { SurveyLists } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

registerSetting('forum.outsideLinksPointTo', 'link', 'Whether to point RSS links to the linked URL (“link”) or back to the post page (“page”)');
registerSetting('forum.requirePostsApproval', false, 'Require posts to be approved manually');
registerSetting('twitterAccount', null, 'Twitter account associated with the app');
registerSetting('siteUrl', null, 'Main site URL');

/**
 * @summary Return a surveyList's link if it has one, else return its surveyList page URL
 * @param {Object} surveyList
 */

SurveyLists.getLink = function (surveyList, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
  return !!surveyList.url ? url : SurveyLists.getPageUrl(surveyList, isAbsolute);
};

/**
 * @summary Depending on the settings, return either a surveyList's URL link (if it has one) or its page URL.
 * @param {Object} surveyList
 */
/*
SurveyLists.getShareableLink = function (surveyList) {
    return getSetting('forum.outsideLinksPointTo', 'link') === 'link' ? SurveyLists.getLink(surveyList) : SurveyLists.getPageUrl(surveyList, true);
  };
  
  /**
   * @summary Whether a surveyList's link should open in a new tab or not
   * @param {Object} surveyList
   */

  SurveyLists.getLinkTarget = function (surveyList) {
    return !!surveyList.url ? '_blank' : '';
  };

  /**
 * @summary Get URL of a surveyList page.
 * @param {Object} surveyList
 */

SurveyLists.getPageUrl = function(surveyList, isAbsolute = false){
    const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
    return `${prefix}/surveyLists/${surveyList._id}`;
};


  
  