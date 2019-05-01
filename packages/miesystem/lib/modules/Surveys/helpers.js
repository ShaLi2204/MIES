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

SurveyLists.getLinkCreated = function (surveyList, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
  return !!surveyList.url ? url : SurveyLists.getPageUrlCreated(surveyList, isAbsolute);
};

SurveyLists.getPageUrlCreated = function(surveyList, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/newsurvey/${surveyList._id}`;
};

SurveyLists.getLinkOpenSurveys = function (surveyList, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
  return !!surveyList.url ? url : SurveyLists.getPageUrlOpenSurvey(surveyList, isAbsolute);
};

SurveyLists.getPageUrlOpenSurvey = function(surveyList, isAbsolute = false) {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/opensurveys/${surveyList._id}`;
}

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

SurveyLists.getNewPageUrl = function(surveyList, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/newsurvey/${surveyList._id}`;
};

SurveyLists.getDefaultStatus = function (user) {
  return SurveyLists.config.STATUS_DRAFT;
/*  const canSurveyListDraft = typeof user === 'undefined' ? false: Users.canDo(user, 'surveylists.new.draft');
  if (canSurveyListDraft) {
    return SurveyLists.config.STATUS_DRAFT;
  } else {
    return SurveyLists.config.STATUS_DRAFT;
  }
*/  
};

SurveyLists.getStatusName = function (surveyList) {
  if (surveyList.status === null) {
    return "NULL"
  } else {
  return Utils.findWhere(SurveyLists.statuses, {value: surveyList.status}).label;
  }
}

SurveyLists.isDraft = function (surveyList) {
  return surveyList.status === SurveyLists.config.STATUS_DRAFT;
};

SurveyLists.isPublic = function (surveyList) {
  return surveyList.status === SurveyLists.config.STATUS_PUBLIC;
};

SurveyLists.isClosed = function (surveyList) {
  return surveyList.status === SurveyLists.config.STATUS_CLOSED;
}
  
  