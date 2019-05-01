import React from 'react';
import Helmet from 'react-helmet';
import { replaceComponent, Components, withCurrentUser } from 'meteor/vulcan:core';

const Layout = ({currentUser, currentRoute, children}) =>

   <div>
       <Helmet>
           <title>MIE System</title>
       </Helmet>

       <Components.Header/>

       <div>
           <Components.Nav/>
       </div>
       <div>
           {children}
       </div>
   </div>

replaceComponent({name: 'Layout', component: Layout, hocs: [withCurrentUser]});