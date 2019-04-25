import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';
import Review from './Review';
import { Foods } from '/imports/api/food/food';


class UserCell extends React.Component {

  render() {

    return (
        <div>
          <Header as='h4'>
            {this.props.foods.name}
          </Header>
          <Header as='h5'>
            {this.props.foods.restaurant}
          </Header>
        </div>
    );
  }
}

UserCell.propTypes = {
  foods: PropTypes.array.isRequired,
};

export default withRouter(UserCell);
