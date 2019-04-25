import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, Button, Rating, Icon } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    const path = `/editReview/:${this.props.review._id}`;
    return (
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ fontSize: '16px' }}>
              <Rating icon='heart' defaultRating={this.props.review.rating} maxRating={5} size='medium' disabled style={{ marginRight: '5px' }}/>
              {this.props.review.title}
            </Card.Header>
            <Card.Meta>
              <Icon name="user" style={{ marginRight: '5px', marginTop: '5px' }} />
              {this.props.review.user} says . . .
            </Card.Meta>
            <Card.Description style={{ marginTop: '12px' }}>{this.props.review.review}</Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="right">
            Last updated: {this.props.review.createdAt.toLocaleDateString('en-US')}
          </Card.Content>
          { this.props.review.user === Meteor.user().username ? (
              <Button
                  as={ NavLink } activeClassName="active" exact to={path} key="editReview">Edit Review</Button>
          ) : ''
          }
        </Card>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default withRouter(Review);
