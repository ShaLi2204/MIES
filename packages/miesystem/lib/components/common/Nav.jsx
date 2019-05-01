
import React, { Component } from 'react';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import { 
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Nav, 
    NavItem, 
    NavLink, 
    UncontrolledDropdown } from 'reactstrap';
import classnames from 'classnames';
import { componentFromStream } from 'recompose';
import { Meteor } from 'meteor/meteor';

class NavBar extends Component{
    constructor(props) {
        super(props);
            this.state = {
          activeTab: '1',
          isOpen: false
        };
      }
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return(
            <div>
                <Nav tabs>
                    <NavItem> 
                        <NavLink href='/'>
                            Home
                        </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle nav caret>My Surveys</DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href='/createdsurveys'>
                                Created Surveys
                            </DropdownItem>
                            <DropdownItem href='/participated'>
                                Participated In Surveys
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink href='/opensurveys'>
                            Open Surveys
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='./FAQ'>
                            FAQ
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='./contact'>
                            Contact
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='./account'>
                            Account
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

registerComponent({name:'Nav', component: NavBar});