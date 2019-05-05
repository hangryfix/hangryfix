import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Divider, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'underscore';
import Review from './Review';
import { Restaurants } from '/imports/api/restaurant/restaurant';


class Food extends React.Component {

  constructor(props) {
    super(props);
    this.getDefaultRating = this.getDefaultRating.bind(this);
    this.getHearts = this.getHearts.bind(this);
  }

  getHearts(numFilled) {
    let heartsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < numFilled) {
        heartsArray.push(1);
      } else {
        heartsArray.push(0);
      }
    }
    return heartsArray;
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

    if (this.props.reviews) {
      this.props.food.averageRating =
          Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
              / (this.props.reviews.length));
    }

    const path = `/addReview/:${this.props.food.key}`;

    const imageStyleReviews = { maxWidth: '100%', maxHeight: '100%', width: '160px', height: '160px' };
    const imageStyleNotReviews = { maxWidth: '100%', maxHeight: '100%', width: '120px', height: '120px' };
    const nameSizeReviews = { fontSize: '30px' };
    const nameSizeNotReviews = { fontSize: '25px' };

    const foodCard = (imageStyle, nameSize) => {
      const viewHere = <a>Show hours</a>;
      const hours = [];
      const address = [];

      if (this.props.restaurants) {
        this.props.restaurants.filter(restaurant => (restaurant.name === this.props.food.restaurant))
            .map(restaurant => (restaurant.hours
                .map(hour => (hours.push(hour)))
            ));
        this.props.restaurants.filter(restaurant => (restaurant.name === this.props.food.restaurant))
            .map(restaurant => (address.push(restaurant.address)));
      }

      return (
          <Card.Content>
            <Card.Header style={nameSize}>
              {this.props.food.name}
            </Card.Header>
            <Image style={imageStyle} src={this.props.food.image} />
            <Card.Description>
              <Card.Description style={{ paddingBottom: '10px', paddingTop: '5px'}}>
              {this.props.reviews.length > 0 ? (
                  this.getHearts(this.props.food.averageRating).map(num => {
                    if (num === 1) {
                      return <Icon name='heart' size='large'/>;
                    } else {
                      return <Icon name='heart outline' size='large'/>
                    }
                  })
              ) : (
                  'No ratings yet.'
              )
              }
            </Card.Description>
              <Card.Description style={{ padding: '2px', paddingRight: '10px' }}>
                <Icon name="map marker alternate" />
                <Dropdown
                    compact
                    pointing="left"
                    className="restaurantAddress"
                    text={this.props.food.restaurant}
                    icon="question">
                  <Dropdown.Menu><Dropdown.Header>{address[0]}</Dropdown.Header></Dropdown.Menu>
                </Dropdown>
              </Card.Description>
              <Card.Description style={{ padding: '2px' }}>
                <Icon name="clock" style={{ marginRight: '5px' }} />
                <Dropdown text={viewHere} pointing="left">
                  {this.props.restaurants ?
                      (
                        <Dropdown.Menu>
                          <Dropdown.Header>{`Mon: ${hours[0]} - ${hours[1]}`}</Dropdown.Header>
                          <Dropdown.Divider/>
                          <Dropdown.Header>{`Tues: ${hours[2]} - ${hours[3]}`}</Dropdown.Header>
                          <Dropdown.Divider/>
                          <Dropdown.Header>{`Wed: ${hours[4]} - ${hours[5]}`}</Dropdown.Header>
                          <Dropdown.Divider/>
                          <Dropdown.Header>{`Thu: ${hours[6]} - ${hours[7]}`}</Dropdown.Header>
                          <Dropdown.Divider/>
                          <Dropdown.Header>{`Fri: ${hours[8]} - ${hours[9]}`}</Dropdown.Header>
                          <Dropdown.Divider/>
                          <Dropdown.Header>{`Sat: ${hours[10]} - ${hours[11]}`}</Dropdown.Header>
                          <Dropdown.Divider/>
                          <Dropdown.Header>{`Sun: ${hours[12]} - ${hours[13]}`}</Dropdown.Header>
                        </Dropdown.Menu>
                      ) : (
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              Hours not available.
                            </Dropdown.Item>
                          </Dropdown.Menu>
                      )
                    }
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
            <Card.Description className='wrapText'>
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
                <Card.Header>No reviews yet.</Card.Header>
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
  restaurants: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Restaurants');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Food);
