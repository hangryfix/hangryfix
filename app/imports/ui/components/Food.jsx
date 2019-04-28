import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Divider, Grid, Segment, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';
import Review from './Review';

class Food extends React.Component {

  constructor(props) {
    super(props);
    this.getDefaultRating = this.getDefaultRating.bind(this);
  }


  getDefaultRating(price) {
    let stars = 0
    if (price < 4 ) {
      stars = 1;
    } else if (price >= 4 && price  < 8 ) {
      stars = 2;
    } else if (price >= 8 && price  < 12 ) {
      stars = 3;
    } else if (price >= 12 && price  < 16 ) {
      stars = 4;
    } else  {
      stars = 5;
    }
    return stars;
  }

  render() {
    let averageRating = '';

    if (this.props.reviews) {
      averageRating =
          Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
              / (this.props.reviews.length));
    }

    const path = `/addReview/:${this.props.food.key}`;

    const imageStyleReviews = { maxWidth: '100%', maxHeight: '100%', width: '160px', height: '160px' };
    const imageStyleNotReviews = { maxWidth: '100%', maxHeight: '100%', width: '120px', height: '120px' };
    const nameSizeReviews = { fontSize: '30px' };
    const nameSizeNotReviews = { fontSize: '25px' };

    const foodCard = (imageStyle, nameSize) => {
      const viewHere = <a>Click here</a>;

      return (
          <Card.Content>
            <Image floated='left' style={imageStyle} src={this.props.food.image} />
            <Card.Header style={nameSize}>
              {this.props.food.name}
            </Card.Header>
            <Card.Meta style={{ paddingBottom: '30px', paddingTop: '5px' }}>
              {this.props.reviews.length > 0 ? (
                  <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
              ) : (
                  'No ratings yet.'
              )
              }
            </Card.Meta>
            <Card.Description>
              <Card.Description style={{ padding: '2px', paddingRight: '10px' }}>
                <Icon name="map marker alternate" style={{ paddingRight: '5px' }}/>
                {this.props.food.restaurant}
              </Card.Description>
              <Card.Description style={{ padding: '2px' }}>
                <Icon name="clock" style={{ marginRight: '5px' }} />
                <Dropdown text={viewHere}>
                  <Dropdown.Menu>
                    {this.props.food.restaurant.hours ?
                        (
                            <div>
                              <Dropdown.Item
                                  text={`Mon: ${this.props.food.restaurant.hours[0]} - ${this.props.food.restaurant.hours[1]}`}
                              />
                              <Dropdown.Item
                                  text={`Tues: ${this.props.food.restaurant.hours[2]} - ${this.props.food.restaurant.hours[3]}`}
                              />
                              <Dropdown.Item
                                  text={`Wed: ${this.props.food.restaurant.hours[4]} - ${this.props.food.restaurant.hours[5]}`}
                              />
                              <Dropdown.Item
                                  text={`Thurs: ${this.props.food.restaurant.hours[6]} - ${this.props.food.restaurant.hours[7]}`}
                              />
                              <Dropdown.Item
                                  text={`Fri: ${this.props.food.restaurant.hours[8]} - ${this.props.food.restaurant.hours[9]}`}
                              />
                              <Dropdown.Item
                                  text={`Sat: ${this.props.food.restaurant.hours[10]} - ${this.props.food.restaurant.hours[11]}`}
                              />
                              <Dropdown.Item
                                  text={`Sun: ${this.props.food.restaurant.hours[12]} - ${this.props.food.restaurant.hours[13]}`}
                              />
                            </div>
                        ) : ''
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Description>
              <Card.Description style={{ padding: '2px' }}>
                <Icon name="dollar sign" />
                <Rating size="large"
                        icon="star"
                        defaultRating={this.getDefaultRating(this.props.food.price)}
                        maxRating={5}
                        disabled/>
              </Card.Description>
            </Card.Description>
            <Divider horizontal><Icon name="info circle" /></Divider>
            <Card.Description>
              {this.props.food.description}
            </Card.Description>
            <Card.Meta textAlign="right" style={{ paddingTop: '30px' }}>
              Last updated: {this.props.food.timestamp.toLocaleDateString('en-US')}
            </Card.Meta>
          </Card.Content>
      );
    };

    return (
        <Card>
          <Button
              as={ NavLink }
              activeClassName="active"
              exact to={path}
              key="addReview">
            Write a Review
          </Button>
          {foodCard(imageStyleNotReviews, nameSizeNotReviews)}
          <Card.Content>
            {this.props.food.tags.map((tag, index) => {
              let returnThis = '';
              if ((typeof tag) === 'object') {
                returnThis =
                    <Label.Group tag>
                      <Label style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                        {tag.name}
                      </Label>
                      <Label tag style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                        {tag.type}
                      </Label>
                    </Label.Group>;
              } else {
                returnThis =
                    <Label tag style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                      {tag}
                    </Label>;
              }
              return returnThis;
            })}
          </Card.Content>
          <Card.Content>
            {this.props.reviews.length > 0 ? (
                <Modal
                    dimmer="blurring"
                    size='tiny'
                    trigger={<Button fluid>Show {this.props.reviews.length} ratings and reviews</Button>}>
                  <Modal.Content
                  >
                    <Card fluid>
                      {foodCard(imageStyleReviews, nameSizeReviews)}
                      <Card.Content>
                        {this.props.food.tags.map((tag, index) => {
                          let returnThis = '';
                          if ((typeof tag) === 'object') {
                            returnThis =
                                <Label.Group tag>
                                  <Label style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                                    {tag.name}
                                  </Label>
                                  <Label tag style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                                    {tag.type}
                                  </Label>
                                </Label.Group>;
                          } else {
                            returnThis =
                                <Label tag style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                                  {tag}
                                </Label>;
                          }
                          return returnThis;
                        })}
                      </Card.Content>
                    </Card>
                  </Modal.Content>
                  <Modal.Content scrolling
                  >
                    {this.props.reviews.map((review, index) => <Review
                        key={index}
                        review={review}
                    />)}
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                        style={{ backgroundColor: '#338D33', color: 'white' }}
                        as={ NavLink }
                        activeClassName="active"
                        exact to={path}
                        key="addReview">
                      Write a Review
                      <Icon inverted name="right chevron" />
                    </Button>
                  </Modal.Actions>
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
