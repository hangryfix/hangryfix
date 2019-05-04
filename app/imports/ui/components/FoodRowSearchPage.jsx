import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Table, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Review from './Review';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { Restaurants } from '/imports/api/restaurant/restaurant';
import { NavLink } from 'react-router-dom';

class FoodRowSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { closesAt: '', opensNext: '', isOpen: false };
    this.onClick = this.onClick.bind(this);
    this.getAverageRatingRow = this.getAverageRatingRow.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.getHearts = this.getHearts.bind(this);
    this.getStars = this.getStars.bind(this);
    this.getDefaultRating = this.getDefaultRating.bind(this);
  }

  onClick = () => Foods.remove(this.props.food._id, this.deleteCallback);


  getDefaultRating() {
    let price = this.props.food.price;
    let stars = 0;
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

  getStars(numFilled) {
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

  isOpen(food) {
    let d = new Date();
    let restaurantName = food.restaurant;
    let restaurant = null;
    this.props.restaurants.map(rest => {
      if (rest.name === restaurantName) {
        restaurant = rest;
      }
    });

    let open = 0;
    let close = 0;

    switch (d.getDay()) {
      case 1: // Monday
        open = 0;
        close = 1;
        break;
      case 2: // Tuesday
        open = 2;
        close = 3;
        break;
      case 3: // Wednesday
        open = 4;
        close = 5;
        break;
      case 4: // Thursday
        open = 6;
        close = 7;
        break;
      case 5: // Friday
        open = 8;
        close = 9;
        break;
      case 6: // Saturday
        open = 10;
        close = 11;
        break;
      case 7: // Sunday
        open = 12;
        close = 13;
        break;
    }

    let openTimeString = restaurant.hours[open];
    let closeTimeString = restaurant.hours[close];
    let nextOpenTimeString = restaurant.hours[(open + 2) % 14];

    let openTokens = openTimeString.split(':');
    let openHours = openTokens[0];
    let openTokens2 = openTokens[1].split(' ');
    let openMinutes = openTokens2[0];
    let openAP = openTokens2[1];

    let closeTokens = closeTimeString.split(':');
    let closeHours = closeTokens[0];
    let closeTokens2 = closeTokens[1].split(' ');
    let closeMinutes = closeTokens2[0];
    let closeAP = closeTokens2[1];

    let timeString = '';

    let isOpenNow = false;

    let closeValue = 0;
    let openValue = 0;

    if (closeAP === 'pm') {
      closeValue += parseInt(closeHours) + 12;
    } else {
      closeValue += parseInt(closeHours);
    }

    if (openAP === 'pm') {
      openValue += parseInt(openHours) + 12;
    } else {
      openValue += parseInt(openHours);
    }

    if (closeValue > d.getHours()) {
      if (openValue < d.getHours()) {
        isOpenNow = true;
      } else
        if (openValue === d.getHours() && openMinutes > d.getMinutes) {
          isOpenNow = true;
        } else {
          timeString = openTimeString;
        }
    } else
      if (closeValue === d.getHours() && closeMinutes < d.getMinutes()) {
        isOpenNow = true;
      } else {
        timeString = nextOpenTimeString;
      }

    if (isOpenNow) {
      return 'Open until ' + closeTimeString;
    } else {
      return 'Closed until ' + timeString;
    }

  }

  /** Notify the user of the results of the delete. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Food Deleted' });
    }
  }

  getAverageRatingRow(reviews) {
    let total = 0;
    for (let rev of reviews) {
      total += rev.rating;
    }
    return Math.round(total / reviews.length);
  }

  getReviews() {
    let reviewArray = [];
    this.props.reviews.map(review => {
      if (parseInt(review.foodId) === parseInt(this.props.food.key)) {
        reviewArray.push(review);
      }
    });
    return reviewArray;
  }

  getDefaultRating(price) {
    let stars = 0
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
    return stars;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const path = `/addReview/:${this.props.food.key}`;
    const openString = this.isOpen(this.props.food);

    return (
        <Table.Row style={{ width: '100%' }}>
          {/*Col 1: Image/Name*/}
          <Table.Cell style={{ width: '20%' }}>
            <Header as='h3' textAlign='center' style={{ width: '100%' }}>
              {this.props.food.name}
            </Header>
            <Image floated='left' style={{ width: '100%' }} src={this.props.food.image}/>
          </Table.Cell>

          {/*Col 2: Info*/}
          <Table.Cell style={{ width: '20%' }}>
            <div style={{ width: '100%' }}>
              <Icon name="map marker alternate" style={{ marginRight: '5px' }}/>
              {this.props.food.restaurant}
            </div>
            <div style={{ width: '100%' }}>
              <Icon name="clock" style={{ marginRight: '5px' }}/>
              {openString}
            </div>
            <Icon name="dollar sign"/>
            {this.props.food.price}
            <div>
              <p style={{ margin: '3px 0 0 0'}}>Price Range</p>
            {this.getStars(this.getDefaultRating(this.props.food.price)).map(num => {
              if (num === 1) {
                return <Icon name='star' size='large'/>;
              } else {
                return <Icon name='star outline' size='large'/>
              }
            })
            }
            </div>
          </Table.Cell>

          {/*Col 3: Reviews*/}
          <Table.Cell style={{ paddingBottom: '20px', width: '20%' }}>
            {this.getReviews().length > 0 ? (
                    this.getHearts(this.getAverageRatingRow(this.getReviews())).map(num => {
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
            {this.getReviews().length > 0 ? (
                <Modal size='small'
                       trigger={<Button fluid>Show {this.getReviews().length} ratings and reviews</Button>}>
                  <Modal.Header>
                    <Card fluid>
                      <Card.Content>
                        <Image floated='left' style={{ width: '30%' }} src={this.props.food.image}/>
                        <Card.Header style={{ fontSize: '30px' }}>
                          {this.props.food.name}
                        </Card.Header>
                        <Card.Meta style={{ paddingBottom: '30px' }}>
                          {this.getReviews().length > 0 ? (
                              <Rating size="huge" icon="heart"
                                      defaultRating={this.getAverageRatingRow(this.getReviews())} maxRating={5}
                                      disabled/>
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
                          <Icon name="clock" style={{ marginRight: '5px' }}/>
                          {openString}
                        </Card.Meta>
                        <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
                          <Icon name="dollar sign"/>
                          {this.props.food.price}
                        </Card.Meta>
                        <Card.Description>
                          {this.props.food.description}
                        </Card.Description>
                      </Card.Content>
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
                        {<Label tag style={{ backgroundColor: '#338D33', color: 'white' }}>
                          {this.props.food.category}
                        </Label>}
                      </Card.Content>
                    </Card>
                  </Modal.Header>
                  <Modal.Content scrolling>
                    {this.getReviews().map((review, index) => <Review
                        key={index}
                        review={review}
                    />)}
                  </Modal.Content>
                </Modal>
            ) : (
                <Card.Header style={{ fontSize: '18px' }}>No reviews yet.</Card.Header>
            )
            }
          </Table.Cell>

          {/*Col 4: tags*/}
          <Table.Cell style={{ width: '18%' }}>
            {this.props.food.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag}
            </Label>)}
          </Table.Cell>
          <Table.Cell style={{ width: '20%' }}>
            <Button
                as={NavLink}
                activeClassName="active"
                exact to={path}
                key="addReview">
              Write a Review
            </Button>
          </Table.Cell>

        </Table.Row>
    );
  }
}

FoodRowSearchPage.propTypes = {
  food: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  reviews: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('FoodAdmin');
  const subscription2 = Meteor.subscribe('Foods');
  const subscription3 = Meteor.subscribe('Reviews');
  const subscription4 = Meteor.subscribe('Restaurants');

  return {
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(FoodRowSearchPage);
