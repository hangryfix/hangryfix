import React from 'react';
import { Card, Feed, Rating, Image, Button, Link } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';

class Food extends React.Component {
  render() {

    const averageRating =
        Math.round(_.reduce(this.props.food.reviews, function (memo, review) { return memo + review.rating; })
            / this.props.food.reviews.length);

    return (
        <Card>
          { this.props.currentUser ? (
              <Card.Content extra>
                <Button fluid onClick={<Link to={''}/>}>Write a Review</Button>
              </Card.Content>
          ) : ''
          }
          <Card.Content>
            <Image floated='left' style={{ width: '40%' }} src={this.props.food.image} />
            <Card.Header>{this.props.food.name}</Card.Header>
            <Card.Meta>
              {this.props.food.restaurant}
              <Rating icon='heart' defaultRating={averageRating} maxRating={5} size='huge' disabled />
            </Card.Meta>
            <Card.Description>
              Address: {this.props.food.address}
              Hours: {this.props.food.hours}
              Price: {this.props.food.price}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {/* review component */}
            </Feed>
          </Card.Content>
        </Card>
    );
  }
}
Food.propTypes = {
  food: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
};

const FoodContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Food);

export default withRouter(FoodContainer);
