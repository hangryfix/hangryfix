import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Container, Input, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

class NavBar extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };


  render() {

    const { location } = this.props;
    const searchStyle = {
      width: '80%',
      color: '#045604',
    };

    let styleName = '';
    let rightStyle = '';

    if (location.pathname === '/') {
      styleName = 'navBarLanding';
      rightStyle = 'rightLanding';
    } else {
      styleName = 'navBar';
      rightStyle = 'rightNormal';
    }

    return (

        <div className={ styleName }>
          <Menu borderless>
            <Container fluid>
              { this.props.currentUser ? (
                  [
                    <Menu.Item as={ NavLink } activeClassName="active" exact to="/youraccount" key="youraccount">
                      <Image style={{ width: '100px' }} src='https://i.ibb.co/H2ZqvWc/hangryfix-logo-white.png' />
                    </Menu.Item>,
                    <Menu.Item as={ NavLink } activeClassName="active" exact to="/search" key="search">
                      <Input
                          className='color-primary-0'
                          action={{ color: 'green', content: 'Search' }}
                          actionPosition='right'
                          icon='search'
                          iconPosition='left'
                          placeholder='Hangry??? What are you craving?'
                          style={searchStyle}/>
                    </Menu.Item>,
                    <Menu.Item position="right" as={ NavLink } activeClassName="active" exact to="/addFood"
                               key="addFood">
                      Add Food
                    </Menu.Item>,
                  ]
              ) : ''
              }
              {
                Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Menu.Item as={ NavLink } activeClassName="active" exact to="/adminFood" key="admin">Admin</Menu.Item>
                ) : ''
              }
              { this.props.currentUser === '' ? (
                  [
                    <Menu.Item
                        as={ NavLink }
                        className="navTitle"
                        exact to="/"
                        key="landing"
                    >
                      <Image style={{ width: '100px' }} src='https://i.ibb.co/H2ZqvWc/hangryfix-logo-white.png' />
                    </Menu.Item>,
                    <Menu.Item position="right" key="unloggedUser">
                      <Dropdown pointing="top right" className={ rightStyle } text="Login" icon="user" direction="left">
                        <Dropdown.Menu>
                          <Dropdown.Item icon="user" text="Sign In" as={ NavLink } exact to="/signin"/>
                          <Dropdown.Item icon="add user" text="Register" as={NavLink} exact to="/signup"/>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Item>,
                  ]
              ) : (
                  <Menu.Item>
                    <Dropdown pointing="top right" direction="left" text={this.props.currentUser} icon="user">
                      <Dropdown.Menu>
                        <Dropdown.Item icon="user" text="Your Account" as={NavLink} exact to="/youraccount"/>
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
