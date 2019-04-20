import React from 'react';
import { Card, Rating, Image, Button, Icon, Dropdown, Label } from 'semantic-ui-react';
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
              / (this.props.reviews.length));
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
            <Image floated='left' style={{ width: '40%' }} src={this.props.food.image} />
            <Card.Header style={{ fontSize: '30px' }}>
              {this.props.food.name}
            </Card.Header>
            <Card.Meta style={{ paddingBottom: '30px' }}>
              {this.props.reviews.length > 0 ? (
                  <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
              ) : (
                  'No ratings yet.'
              )
              }
            </Card.Meta>
            <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
              <Icon name="map marker alternate" style={{ marginRight: '5px' }}/>
              {this.props.food.restaurant}
            </Card.Meta>
            <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
              <Icon name="clock" style={{ marginRight: '5px' }} />
              {this.props.food.hours}
            </Card.Meta>
            <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
              <Icon name="dollar sign" />
              <Rating size="large" icon="star" defaultRating={this.props.food.price} maxRating={5} disabled/>
            </Card.Meta>
            <Card.Description>
              {this.props.food.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            {this.props.food.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag.name}
            </Label>)}
          </Card.Content>
          <Card.Content>
            {this.props.reviews.length > 0 ? (
                <Button fluid>
                  <Dropdown scrolling fluid
                            icon={''}
                            text={`Show ${this.props.reviews.length} ratings and reviews`}
                            style={{ fontSize: '18px', textAlign: 'center' }}
                  >
                    <Dropdown.Menu>
                      {this.props.reviews.map((review, index) => <Review
                          key={index}
                          review={review}
                      />)}
                    </Dropdown.Menu>
                  </Dropdown>
                </Button>
            ) : (
                <Card.Header style={{ fontSize: '18px' }}>No reviews yet.</Card.Header>
            )
            }
          </Card.Content>
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
