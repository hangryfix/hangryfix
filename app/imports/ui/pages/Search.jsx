import React from 'react';
import { Grid, Table, Header, Image, Dropdown, Item, Container, Radio, Rating, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Reviews } from '/imports/api/review/review';
import { Restaurants } from '/imports/api/restaurant/restaurant';
import { Foods } from '/imports/api/food/food';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import FoodRowSearchPage from '../components/FoodRowSearchPage';

/** A simple static component to render some text for the landing page. */
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { refreshPage: false, rating: 0, onlyOpen: false };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
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
      } else if (openValue === d.getHours() && openMinutes > d.getMinutes ) {
        isOpenNow = true;
      }
    } else if (closeValue === d.getHours() && closeMinutes < d.getMinutes()) {
      isOpenNow = true;
    }

    return isOpenNow;

  }

  getAverageRating(reviews) {
    let total = 0;
    for (let rev of reviews) {
      total += rev.rating;
    }
    return reviews.length > 0 ? Math.round(total / reviews.length) : 1;

  }

  getReviews(food) {
    let reviewArray = [];
    this.props.reviews.map(review => {
      if (parseInt(review.foodId) === parseInt(food.key)) {
        reviewArray.push(review);
      }
    });
    return reviewArray;
  }

  getSearchResults(cuisine) {
    console.log(this.state.rating);
    let results = [];
    if (cuisine === 'All') {
      this.props.foods.map(food => {
        let avgRating = this.getAverageRating(this.getReviews(food));
        if (avgRating >= this.state.rating) {
          if (!this.state.onlyOpen) {
            results.push(food);
          } else {
            if (this.isOpen(food)) {
              results.push(food);
            }
          }
        }
      });
    } else {
      this.props.foods.map(food => {
        if (food.category === cuisine) {
          let avgRating = this.getAverageRating(this.getReviews(food));
          if (avgRating >= this.state.rating) {
            if (!this.state.onlyOpen) {
              results.push(food);
            } else {
              if (this.isOpen(food)) {
                results.push(food);
              }
            }
          }
        }
      });
    }

    console.log(results);
    return results;
  }

  handleChangeRating(e, { rating }) {
    let s = {};
    s['rating'] = rating;
    s['refreshPage'] = !this.state.refreshPage;
    this.setState(s);
  }

  handleRadioChange(e, data) {
    let s = {};
    s['onlyOpen'] = data.checked;
    s['refreshPage'] = !this.state.refreshPage;
    this.setState(s);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    let stringURL = this.props.location.pathname;
    let URLarray = stringURL.split(':');
    let cuisineName = URLarray[1];

    const spacing = { paddingTop: '10px' };

    const searchStyle = { padding: '20px 0 0 0' };
    const iconMenu = {
      color: '#045604',
    };

    return (
        <Grid style={{ paddingBottom: '30px' }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <div className='search-sidebar'>
                <Header as='h2' content='Filters'/>
                <Container>
                  <Radio
                      toggle label='Search Open Restaurants Only'
                      style={spacing}
                      onChange={this.handleRadioChange}
                  />
                  <Header as='h3' content='Rating'/>
                  <Rating
                      icon='heart'
                      defaultRating={1}
                      maxRating={5}
                      size='massive'
                      onRate={this.handleChangeRating}
                  />
                </Container>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h3' textAlign='left' content='Popular Food Choices' style={searchStyle}/>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:All" key="search1">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/K5ZJ6XB/hangryfix-logo-green-dark2.png'/>
                      <Header as='h4' style={iconMenu} content='All Foods'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Dessert" key="search2">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/WsnfD4j/hangryfix-logo-green-dark.png'/>
                      <Header as='h4' style={iconMenu} content='Dessert'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Fast Food" key="search3">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/NZsznSL/hangryfix-logo-green.png'/>
                      <Header as='h4' style={iconMenu} content='Fast Food'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Italian" key="search4">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/WsnfD4j/hangryfix-logo-green-dark.png'/>
                      <Header as='h4' style={iconMenu} content='Italian'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Japanese" key="search5">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/NZsznSL/hangryfix-logo-green.png'/>
                      <Header as='h4' style={iconMenu} content='Japanese'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Local" key="search6">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/hsbkrKT/hangryfix-logo-green2.png'/>
                      <Header as='h4' style={iconMenu} content='Local'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Pizza" key="search7">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/NZsznSL/hangryfix-logo-green.png'/>
                      <Header as='h4' style={iconMenu} content='Pizza'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Mexican" key="search8">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/hsbkrKT/hangryfix-logo-green2.png'/>
                      <Header as='h4' style={iconMenu} content='Mexican'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Tacos" key="search9">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/4tzvGFK/hangryfix-logo-green3.png'/>
                      <Header as='h4' style={iconMenu} content='Tacos'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Chinese" key="search1">
                      <Image rounded style={{ width: '100px' }}
                             src='https://i.ibb.co/K5ZJ6XB/hangryfix-logo-green-dark2.png'/>
                      <Header as='h4' style={iconMenu} content='Chinese'/>
                    </Item>
                  </Grid.Column>
                </Grid.Row>

              </Grid>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as='h2' textAlign='center'>Search Results for {cuisineName}</Header>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown placeholder='Sort' search selection/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Table style={{ width: '100%' }}>
                <Table.Body style={{ width: '100%' }}>
                  {!this.state.refreshPage ? (
                          this.getSearchResults(cuisineName).map((food, index) => <FoodRowSearchPage
                              key={index}
                              food={food}
                              reviews={this.props.reviews.filter(review => (review.foodId === food.key))}
                          />))
                      :
                      this.getSearchResults(cuisineName).map((food, index) => <FoodRowSearchPage
                          key={index}
                          food={food}
                          reviews={this.props.reviews.filter(review => (review.foodId === food.key))}
                      />)}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

Search.propTypes = {
  foods: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  // Get access to Stuff documents.
  const foodSubscription = Meteor.subscribe('Foods');
  const reviewSubscription = Meteor.subscribe('Reviews');
  const restaurantSubscription = Meteor.subscribe('Restaurants');

  return {
    foods: Foods.find({}).fetch(),
    restaurants: Restaurants.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: foodSubscription.ready() && reviewSubscription.ready() && restaurantSubscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(Search);
