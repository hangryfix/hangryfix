import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Header, Feed, Button, Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              <Header as="h4">{this.props.review.user}</Header>
              <Rating icon='heart' defaultRating={this.props.review.rating} maxRating={5} size='huge' disabled/>
              {this.props.review.review}
            </Feed.Summary>
          </Feed.Content>
          { this.props.review.user === Meteor.user().username ? (
              <Feed.Extra>
                <Button>Edit Review</Button>
              </Feed.Extra>
          ) : ''
          }
        </Feed.Event>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default withRouter(Review);
