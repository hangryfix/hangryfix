import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, Button, Rating, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ fontSize: '16px' }}>
              <Rating icon='heart' defaultRating={this.props.review.rating} maxRating={5} size='medium' disabled style={{ marginRight: '5px' }}/>
              {this.props.review.title}
            </Card.Header>
            <Card.Meta>
              <Icon name="user" style={{ marginRight: '5px' }} />
              {this.props.review.user} says . . .
            </Card.Meta>
            <Card.Description>{this.props.review.review}</Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="right">
            Last Updated: {this.props.review.createdAt}
          </Card.Content>
          { this.props.review.user === Meteor.user().username ? (
              <Button>Edit Review</Button>
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
