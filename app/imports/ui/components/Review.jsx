import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Feed, Button, Link, Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              <Header as="h4">Review from {this.props.review.user}</Header>
              <Rating icon='heart' defaultRating={this.props.review.rating} maxRating={5} size='huge' disabled/>
              /* in AddFood: try access defaultRating field from Rating component and pass that number to the rating property*/
              {this.props.review.review}
            </Feed.Summary>
          </Feed.Content>
          { this.props.currentUser ? (
              <Feed.Extra>
                <Button fluid onClick={<Link to={''}/>}>Edit Review</Button>
              </Feed.Extra>
          ) : ''
          }
        </Feed.Event>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

const ReviewContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Review);

export default withRouter(ReviewContainer);
