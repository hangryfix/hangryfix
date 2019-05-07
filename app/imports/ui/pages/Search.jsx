import React from 'react';
import { Grid, Table, Header, Image, Item, Container, Radio, Rating, Loader } from 'semantic-ui-react';
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
    this.state = { refreshPage: false, rating: 0, price: 10000, onlyOpen: false };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleChangeRatingPrice = this.handleChangeRatingPrice.bind(this);
  }


  isOpen(food) {
    const d = new Date();
    const restaurantName = food.restaurant;
    let restaurant = null;
    this.props.restaurants.map(rest => {
      if (rest.name === restaurantName) {
        restaurant = rest;
      }
      return 0;
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
      default:
        break;
    }

    const openTimeString = restaurant.hours[open];
    const closeTimeString = restaurant.hours[close];

    const openTokens = openTimeString.split(':');
    const openHours = openTokens[0];
    const openTokens2 = openTokens[1].split(' ');
    const openMinutes = openTokens2[0];
    const openAP = openTokens2[1];

    const closeTokens = closeTimeString.split(':');
    const closeHours = closeTokens[0];
    const closeTokens2 = closeTokens[1].split(' ');
    const closeMinutes = closeTokens2[0];
    const closeAP = closeTokens2[1];

    let isOpenNow = false;

    let closeValue = 0;
    let openValue = 0;

    if (closeAP === 'pm') {
      closeValue += parseInt(closeHours, 10) + 12;
    } else {
      closeValue += parseInt(closeHours, 10);
    }

    if (openAP === 'pm') {
      openValue += parseInt(openHours, 10) + 12;
    } else {
      openValue += parseInt(openHours, 10);
    }


    if (closeValue > d.getHours()) {
      if (openValue < d.getHours()) {
        isOpenNow = true;
      } else if (openValue === d.getHours() && openMinutes > d.getMinutes) {
        isOpenNow = true;
      }
    } else if (closeValue === d.getHours() && closeMinutes < d.getMinutes()) {
      isOpenNow = true;
    }

    return isOpenNow;

  }

  getAverageRating(reviews) {
    let total = 0;
    total += reviews.map(rev => rev.rating);
    return reviews.length > 0 ? Math.round(total / reviews.length) : 1;
  }

  getReviews(food) {
    const reviewArray = [];
    this.props.reviews.map(review => {
      if (parseInt(review.foodId, 10) === parseInt(food.key, 10)) {
        reviewArray.push(review);
      }
      return 0;
    });
    return reviewArray;
  }

  getSearchResults(cuisine) {

    const results = [];
    if (cuisine === 'All') {
      this.props.foods.map(food => {
        const avgRating = this.getAverageRating(this.getReviews(food));
        if (avgRating >= this.state.rating && food.price <= this.state.price) {
          if (!this.state.onlyOpen) {
            results.push(food);
          } else if (this.isOpen(food) && !this.state.onlyOpen) {
              results.push(food);
          }
        }
        return 0;
      });
    } else {
      this.props.foods.map(food => {
        if (food.category === cuisine) {
          const avgRating = this.getAverageRating(this.getReviews(food));
          if (avgRating >= this.state.rating && food.price <= this.state.price) {
            if (!this.state.onlyOpen) {
              results.push(food);
            } else if (this.isOpen(food) && !this.state.onlyOpen) {
                results.push(food);
            }
          }
        }
        return 0;
      });
    }

    return results;
  }

  handleChangeRating(e, { rating }) {
    const s = {};
    s.rating = rating;
    s.refreshPage = !this.state.refreshPage;
    this.setState(s);
  }

  handleChangeRatingPrice(e, { rating }) {
    const s = {};
    s.price = rating * 4;
    s.refreshPage = !this.state.refreshPage;
    this.setState(s);
  }

  handleRadioChange(e, data) {
    const s = {};
    s.onlyOpen = data.checked;
    s.refreshPage = !this.state.refreshPage;
    this.setState(s);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const stringURL = this.props.location.pathname;
    const URLarray = stringURL.split(':');
    const cuisineName = URLarray[1];

    const spacing = { paddingTop: '10px' };

    const searchStyle = { padding: '20px 0 0 0' };
    const iconMenu = {
      color: '#045604',
    };

    return (
        <Grid style={{ padding: '0 20px 30px 0' }}>
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
                  <Header as='h3' content='Minimum Rating'/>
                  <Rating
                      icon='heart'
                      defaultRating={0}
                      maxRating={5}
                      size='massive'
                      onRate={this.handleChangeRating}
                  />
                  <Header as='h3' content='Maximum Price Range'/>
                  <Rating
                      icon='star'
                      defaultRating={0}
                      maxRating={5}
                      size='massive'
                      onRate={this.handleChangeRatingPrice}
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
                      <Image rounded style={{ width: '120px' }}
                             src='https://s3-media1.fl.yelpcdn.com/bphoto/gvO4mp1EDNb-6q75YNZoIQ/ls.jpg'/>
                      <Header as='h4' style={iconMenu} content='All Foods'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Dessert" key="search2">
                      <Image rounded style={{ width: '120px' }}
                             src='https://www.tasteofhome.com/wp-content/uploads/2017/10
                             /Double-Chocolate-Espresso-Cheesecake_exps49582_THCA1917912A03_24_2bC_RMS-696x696.jpg'/>
                      <Header as='h4' style={iconMenu} content='Dessert'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Fast Food" key="search3">
                      <Image rounded style={{ width: '120px' }}
                             src='https://encrypted-tbn0.gstatic.com/
                             images?q=tbn:ANd9GcSJtdxBqNBichv5Kbg6tWmHZn9bSUGKoZw6iKk_mSWyS9sgu92O'/>
                      <Header as='h4' style={iconMenu} content='Fast Food'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Italian" key="search4">
                      <Image rounded style={{ width: '120px' }}
                             src='http://billsoffbroadway.net/wp-content/uploads/2018/11/Spaghetti-Square-2.jpg'/>
                      <Header as='h4' style={iconMenu} content='Italian'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Japanese" key="search5">
                      <Image rounded style={{ width: '120px' }}
                             src='https://s3-media1.fl.yelpcdn.com/bphoto/gaiFmlWmGBIc8v5oyJKDNg/348s.jpg'/>
                      <Header as='h4' style={iconMenu} content='Japanese'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Local" key="search6">
                      <Image rounded style={{ width: '120px' }}
                             src='https://i1.wp.com/www.tastyislandhawaii.com/images10/plates/plate_asahi_kalbi.jpg'/>
                      <Header as='h4' style={iconMenu} content='Local'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Pizza" key="search7">
                      <Image rounded style={{ width: '120px' }}
                             src='https://s3-media3.fl.yelpcdn.com/bphoto/hNcUIivw4ZszIeW-VDRbfQ/ls.jpg'/>
                      <Header as='h4' style={iconMenu} content='Pizza'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Mexican" key="search8">
                      <Image rounded style={{ width: '120px' }}
                             src='https://www.tasteofhome.com/wp-content/uploads/2018/01/
                             Chicken-Tamales_EXPS_HC17_50905_C12_16_2b-1-696x696.jpg'/>
                      <Header as='h4' style={iconMenu} content='Mexican'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Tacos" key="search9">
                      <Image rounded style={{ width: '120px' }}
                             src='https://pinchofyum.com/wp-content/uploads/Chicken-Tinga-Tacos-1-2.jpg'/>
                      <Header as='h4' style={iconMenu} content='Tacos'/>
                    </Item>
                  </Grid.Column>
                  <Grid.Column>
                    <Item as={NavLink} activeClassName="active" exact to="/search/:Chinese" key="search1">
                      <Image rounded style={{ width: '120px' }}
                             src='https://247wallst.files.wordpress.com/2017/12/chinese-food-square.jpg?w=775&h=775'/>
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
                  <Grid.Column width={4} />
                </Grid.Row>
              </Grid>
              <Table style={{ width: '100%' }}>
                <Table.Body style={{ width: '100%' }}>
                  {!this.state.refreshPage ? (
                          this.getSearchResults(cuisineName).map((food, index) => <FoodRowSearchPage
                              key={index}
                              food={food}
                              reviews={this.props.reviews.filter(review => (review.foodId === parseInt(food.key, 10)))}
                          />))
                      :
                      this.getSearchResults(cuisineName).map((food, index) => <FoodRowSearchPage
                          key={index}
                          food={food}
                          reviews={this.props.reviews.filter(review => (review.foodId === parseInt(food.key, 10)))}
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
  restaurants: PropTypes.array.isRequired,
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
