import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label } from 'semantic-ui-react';
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

    const path = `/addReview/:${this.props.food.key}`;

    const foodCard = () => {
      return (
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
            <Card.Meta textAlign="right">
              Last updated: {this.props.food.timestamp.toLocaleDateString('en-US')}
            </Card.Meta>
          </Card.Content>
      );
    };


    return (
        <Card>
          { this.props.currentUser ? (
              <Button as={ NavLink } activeClassName="active" exact to={path} key="addReview">
                Write a Review
              </Button>
          ) : (
              <Modal trigger={<Button>Write a Review</Button>}>
                <Modal.Header>Sign In or Register</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    Please sign in to your account or register for an account before leaving a review.
                  </Modal.Description>
                </Modal.Content>
              </Modal>
          )}
          {foodCard()}
          <Card.Content>
            {this.props.food.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag.name}
            </Label>)}
          </Card.Content>
          <Card.Content>
            {this.props.reviews.length > 0 ? (
                <Modal size='small' trigger={<Button fluid>Show {this.props.reviews.length} ratings and reviews</Button>}>
                  <Modal.Header>
                    <Card fluid>
                      {foodCard()}
                      <Card.Content>
                        {this.props.food.tags.map((tag, index) => <Label tag
                                                                         style={{ backgroundColor: '#338D33', color: 'white' }}
                                                                         key={index}>
                          {tag.name}
                        </Label>)}
                      </Card.Content>
                    </Card>
                  </Modal.Header>
                  <Modal.Content scrolling>
                    {this.props.reviews.map((review, index) => <Review
                        key={index}
                        review={review}
                    />)}
                  </Modal.Content>
                </Modal>
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
