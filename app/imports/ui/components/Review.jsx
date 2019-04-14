import React from 'react';
import { Header, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              <Header as="h4">Review from {this.props.review.user}</Header>
              {this.props.review.review}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default withRouter(Review);
