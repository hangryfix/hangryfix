import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, Button, Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.review.user}</Card.Header>
            <Card.Meta><Rating icon='heart' defaultRating={this.props.review.rating} maxRating={5} size='medium' disabled/></Card.Meta>
            <Card.Description>{this.props.review.review}</Card.Description>
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
  review: PropTypes.array.isRequired,
};

export default withRouter(Review);
