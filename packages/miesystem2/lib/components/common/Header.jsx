import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/SurveyLists/index.js';

// Header component

const Header = (props) => {

 return(

   <div className="header-wrapper">

     <div className="header">

       <h1>
       MIE System
       </h1>
     <div className="nav">
       <div className="nav-user">
       {!!props.currentUser ?
         <Components.NavLoggedIn /*currentUser={props.currentUser}*//> :
         <Components.NavLoggedOut/>
       }
       </div>
       <div className="nav-new-survey">
         <Components.ShowIf check={SurveyLists.options.mutations.new.check}>
           <Components.SurveysNewButton/>
         </Components.ShowIf>
       </div>
     </div>
     </div>
   </div>
   )
}

Header.displayName = "Header";

Header.propTypes = {
 currentUser: PropTypes.object,
};

registerComponent({ name: 'Header', component: Header, hocs: [withCurrentUser] });