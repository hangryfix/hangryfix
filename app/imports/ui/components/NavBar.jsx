import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Dropdown, Container } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

class NavBar extends React.Component {
  render() {
    return (
        <div className="navBar">
      <Menu borderless>
        <Container>
        <Menu.Item as={ NavLink } activeClassName="" exact to="/">
          <Header as='h2' inverted>[THE LOGO]</Header>
        </Menu.Item>
          { this.props.currentUser ? (
              [
                <Menu.Item position="right" as={ NavLink } activeClassName="active" exact to="/addFood" key="addFood">
                  Add Food
                </Menu.Item>,
                <Menu.Item as={ NavLink } activeClassName="active" exact to="/yourReviews" key="yourReviews">
                  Your Reviews
                </Menu.Item>,
                <Menu.Item as={ NavLink } activeClassName="active" exact to="/yourFoods" key="yourFoods">
                  Your Foods
                </Menu.Item>,
              ]
          ) : ''
          }
          {
            Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Menu.Item as={ NavLink } activeClassName="active" exact to="/admin" key="admin">Admin</Menu.Item>
            ) : ''
          }
          { this.props.currentUser === '' ? (
              <Menu.Item position="right">
                <Dropdown text="Login" icon="user">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={ NavLink } exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Register" as={NavLink} exact to="/register"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
          ) : (
              <Menu.Item>
                <Dropdown direction="left" text={this.props.currentUser} icon="user">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
          )
          }
        </Container>
      </Menu>
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. */
export default withRouter(NavBarContainer);
