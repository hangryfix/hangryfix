import React from 'react';
import { Card, Rating, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';
import Review from './Review';

class Food extends React.Component {
  render() {

    let averageRating = '';

    if (this.props.reviews) {
      averageRating =
          Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
              / (this.props.reviews.length + 1));
    }

    return (
        <Card>
          { this.props.currentUser ? (
              <Button as={ NavLink } activeClassName="active" exact to="/addReview" key="addReview">
                Write a Review
              </Button>
          ) : ''
          }
          <Card.Content>
            <Image floated='left' style={{ width: '50%' }} src={this.props.food.image} />
            <Card.Header>
              {this.props.food.name}
            </Card.Header>
            <Card.Meta>
              {this.props.reviews.filter(review => (review.foodId === this.props.food._id)) ? (
                  <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
              ) : (
                  'No ratings yet.'
              )
              }
            </Card.Meta>
            <Card.Meta>
              {this.props.food.restaurant}
            </Card.Meta>
            <Card.Meta>
              {this.props.food.hours}
            </Card.Meta>
            <Card.Meta>
              {this.props.food.price}
            </Card.Meta>
            <Card.Description>
            </Card.Description>
          </Card.Content>
          {this.props.reviews.filter(review => (review.foodId === this.props.food._id)) ? (
              <Card.Content>
                {this.props.reviews.map((review, index) => <Review
                    key={index}
                    review={review}
                />)}
              </Card.Content>
          ) : (
              <Card.Content>
                No reviews yet.
              </Card.Content>
          )
          }
        </Card>
    );
  }
}
Food.propTypes = {
  food: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  reviews: PropTypes.array.isRequired,
};

const FoodContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Food);

export default withRouter(FoodContainer);
