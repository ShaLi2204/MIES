
import  { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'Welcome',         path: '/',                     componentName: 'Welcome'});
addRoute({ name: 'Login',           path: 'loginform',             componentName: 'Login'});
addRoute({ name: 'CreatedSurveys',  path: 'createdsurveys',        componentName: 'CreatedSurveys'});
addRoute({ name: 'SurveysList',     path: 'surveylist',            componentName: 'SurveysList' });
addRoute({ name: 'SurveysNewForm',  path: 'newsurvey',             componentName: 'SurveysNewForm'});
//addRoute({ name: 'SurveysDisplay',  path: '/display',           componentName: 'SurveysDisplay' });
addRoute({ name: 'SurveySingle',    path: 'surveylist/:_id',        componentName: 'SurveySingle'});
addRoute({ name: 'SurveysNewSingle',path: 'newsurvey/:_id',        componentName: 'SurveysNewSingle'});
