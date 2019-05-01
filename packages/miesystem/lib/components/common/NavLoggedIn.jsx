import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

const NavLoggedIn = ({currentUser, client}) => {

  const menuItems = [
    {
      to: '/account', //Page for editting the account information
      labelId: 'users.edit_acount'
    }
  ];

  menuItems.push({
    labelId: 'users.log_out',
    itemProps: {
      onClick: () => Meteor.logout(() => client.resetStore()),
    },
  });

  return(
    <div className="users-menu">
      <div /*className="header-accounts"*/>
        <Components.Dropdown
          buttonProps={{ variant: 'secondary' }}
          id="user-dropdown"
          trigger={
            <div className="dropdown-toggle-inner">
              {/*<Components.Avatar size="small" user={currentUser} addLink={false} />*/}
              <div className="users-menu-name">{Users.getDisplayName(currentUser)}</div>
            </div>
          }
          menuItems={menuItems}
        />
      </div>

    </div>
  )
};

NavLoggedIn.propTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
}

registerComponent({name: 'NavLoggedIn', component: NavLoggedIn, hocs: [withCurrentUser, withApollo]});
