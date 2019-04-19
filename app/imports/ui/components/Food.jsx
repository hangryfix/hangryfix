import React from 'react';
import { Card, Feed, Rating, Image, Button } from 'semantic-ui-react';
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
          Math.round(_.reduce(this.props.food.reviews, function (memo, review) { return memo + review.rating; })
              / this.props.food.reviews.length);
    }

    return (
        <Card>
          { this.props.user ? (
              <Button as={ NavLink } activeClassName="active" exact to="/addReview" key="addReview">
                Write a Review
              </Button>
          ) : ''
          }
          <Card.Content>
            <Image floated='left' style={{ width: '50%' }} src={this.props.food.image} />
            <Card.Header>
              {this.props.food.name}
              {this.props.reviews ? (
                  <Rating icon="heart" defaultRating={averageRating} maxRating={5}/>
              ) : (
                  <Feed>
                    No ratings yet.
                  </Feed>
              )
              }
            </Card.Header>
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
          <Card.Content extra>
            {this.props.reviews ? (
                <Feed>
                  {this.props.reviews.map((review, index) => <Review
                      key={index}
                      review={review}
                      foodId={this.props.food._id}
                      user={this.props.food.user}
                  />)}
                </Feed>
            ) : (
                <Feed>
                  No reviews yet.
                </Feed>
            )
            }
          </Card.Content>
        </Card>
    );
  }
}
Food.propTypes = {
  food: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  user: PropTypes.string,
};

const FoodContainer = withTracker(() => ({
  user: Meteor.user() ? Meteor.user().username : '',
}))(Food);

export default withRouter(FoodContainer);
