import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image, Dropdown, Segment, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Restaurants } from '/imports/api/restaurant/restaurant';
import { Reviews } from '/imports/api/review/review';
import Review from './Review';


class YourReviewPane extends React.Component {

  constructor(props) {
    super(props);
    this.getStars = this.getStars.bind(this);
    this.getHearts = this.getHearts.bind(this);
  }

  getHearts(numFilled) {
    const heartsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < numFilled) {
        heartsArray.push(1);
      } else {
        heartsArray.push(0);
      }
    }
    return heartsArray;
  }

  getStars(price) {
    let stars = 0;
    const starsArray = [];
    if (price < 4) {
      stars = 1;
    } else
      if (price >= 4 && price < 8) {
        stars = 2;
      } else
        if (price >= 8 && price < 12) {
          stars = 3;
        } else
          if (price >= 12 && price < 16) {
            stars = 4;
          } else {
            stars = 5;
          }
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsArray.push(1);
      } else {
        starsArray.push(0);
      }
    }
    return starsArray;
  }

  render() {
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

    this.props.food.averageRating =
        Math.round((this.props.reviews.filter(review => (review.foodId == this.props.food.key))
            .reduce((memo, reviewForAverage) => memo + reviewForAverage.rating, 0))
            / (this.props.reviews.filter(review => (review.foodId == this.props.food.key)).length));

    return (
          <Card style={{ backgroundColor: '#f4f4f4' }}>
            <Card.Description style={{ paddingTop: '10px' }}>
              <Segment basic>
                <Grid columns={2} divided>
                  <Grid.Column style={{ paddingLeft: '30px' }} width={6}>
              <Card.Header style={{ fontSize: '20px', fontWeight: 'bold' }}>{this.props.food.name}</Card.Header>
              <Image
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '120px',
                    height: '120px',
                    padding: '10px 0 10px 0' }}
                  src={this.props.food.image}
              />
                  </Grid.Column>
                  <Grid.Column style={{ paddingRight: '15px' }} width={10} verticalAlign='middle' textAlign='center'>
              <Card.Description>
                <Card.Description style={{ paddingBottom: '10px', paddingTop: '5px' }}>
                  {this.getHearts(this.props.food.averageRating).map(num => {
                    let returnThis = '';
                    if (num === 1) {
                      returnThis = <Icon name='heart' size='large'/>;
                    } else {
                      returnThis = <Icon name='heart outline' size='large'/>;
                    }
                    return returnThis;
                  })}
                </Card.Description>
                <Card.Description>
                  <Icon name="map marker alternate" color="black" style={{ paddingLeft: '3px' }}/>
                  <Dropdown
                      compact
                      pointing="left"
                      className="restaurantAddress"
                      text={this.props.food.restaurant}
                      icon="question"
                  >
                    <Dropdown.Menu><Dropdown.Header>{address[0]}</Dropdown.Header></Dropdown.Menu>
                  </Dropdown>
                </Card.Description>
                <Card.Description style={{ padding: '2px' }}>
                  <Icon name="clock" style={{ marginRight: '5px' }} color="black"/>
                  <Dropdown text='Show hours' pointing="left" className="restaurantHours">
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
                  <Icon name="dollar sign" color="black"/>
                  {this.getStars(this.props.food.price).map(num => {
                    let returnThis = '';
                    if (num === 1) {
                      returnThis = <Icon name='star'/>;
                    } else {
                      returnThis = <Icon name='star outline'/>;
                    }
                    return returnThis;
                  })}
                </Card.Description>
              </Card.Description>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Card.Description>
            <Card.Content>
              <Review review={this.props.review}/>
            </Card.Content>
          </Card>
    );
  }
}

YourReviewPane.propTypes = {
  food: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  review: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Restaurants');
  const subscription2 = Meteor.subscribe('Reviews');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    restaurants: Restaurants.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(YourReviewPane);
