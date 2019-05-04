import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Loader, Grid, Header, Container, Button, Radio, Rating } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { UserInfo } from '/imports/api/user-info/user-info';
import { Restaurants } from '/imports/api/restaurant/restaurant';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'underscore';
import Food from '../components/Food';
import YourReviewPane from '../components/YourReviewPane';


class YourAccount extends React.Component {

  filters = {
    rating: '',
    price: '',
    openRestaurants: '',
    noRatings: '',
  }

  state =
      { restaurantChecked:
            false,
        ratingChecked:
            false,
        panes: [
            { menuItem: 'Favorite Tags', render: () => <Tab.Pane>
                <Card.Group itemsPerRow={3}>
                  {this.taggedFoods(this.props.foods)}
                </Card.Group>
              </Tab.Pane> },
            { menuItem: 'Your Reviews', render: () => <Tab.Pane>
                <Card.Group itemsPerRow={2}>
                  {this.props.reviews.filter(review => (review.user === this.props.currentUser))
                      .map((currentReview, index) => (
                          <YourReviewPane
                              key={index}
                              review={currentReview}
                              food={this.props.foods.filter(food => (food.key == currentReview.foodId))[0]}
                          />
                      ))}
                </Card.Group>
              </Tab.Pane> },
            { menuItem: 'New Foods', render: () => <Tab.Pane>
                <Card.Group itemsPerRow={3}>
                  {_.last(_.sortBy(this.props.foods, this.props.foods.key), 9)
                      .map((food, index) => <Food
                      key={index}
                      food={food}
                      reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                  />)}
                </Card.Group>
              </Tab.Pane> },
        ],
    };


  taggedFoods = (foods) => {
    const taggedFoodsArray = [];
    const currentUserInfo = this.props.userInfo.filter(user => (user.username === this.props.currentUser))[0];
    if (currentUserInfo.tags) {
      _.map(foods, function (food) {
        _.map(food.tags, function (foodTag) {
          _.map(currentUserInfo.tags, function (userTag) {
            if (foodTag === userTag && !_.contains(taggedFoodsArray, food)) {
              taggedFoodsArray.push(food);
            }
          });
        });
        _.map(currentUserInfo.tags, function (userTag) {
          if (food.category === userTag && !_.contains(taggedFoodsArray, food)) {
            taggedFoodsArray.push(food);
          }
        });
      });
    }
    return (
        taggedFoodsArray.map((food, index) => <Food
            key={index}
            food={food}
            reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
        />)
    );
  };


  toggleRestaurant = () => {
    this.setState({ restaurantChecked: !this.state.restaurantChecked });
    this.filters.openRestaurants = this.state.restaurantChecked;
  }


  toggleRating = () => {
    this.setState({ ratingChecked: !this.state.ratingChecked });
    this.filters.noRatings = this.state.ratingChecked;
  }


  heartRating = (e, { rating }) => {
    this.filters.rating = rating;
  }


  starRating = (e, { rating }) => {
    this.filters.price = rating;
  }

  handleClick = () => {
    const priceConversion = (price) => {
      let stars = 0;
      if (price < 4) {
        stars = 1;
      } else if (price >= 4 && price < 8) {
        stars = 2;
      } else if (price >= 8 && price < 12) {
        stars = 3;
      } else if (price >= 12 && price < 16) {
        stars = 4;
      } else {
        stars = 5;
      }
      return stars;
    };
    const priceFiltered = [];
    const ratingFiltered = [];
    const restaurantFiltered = [];
    const consolidated = [];
    let filtersUsed = 0;
    const filtered = [];

    if (this.filters.price !== '') {
      this.props.foods
          .map(food => (priceConversion(food.price) <= this.filters.price ? (priceFiltered.push(food)) : ''));
      if (priceFiltered.length > 0) {
        priceFiltered.map(food => (consolidated.push(food)));
        filtersUsed++;
      }
    }

    if (this.filters.rating !== '') {
      this.props.foods
          .filter(food => (food.averageRating && food.averageRating >= this.filters.rating ?
              (ratingFiltered.push(food)) : ''));
      if (this.filters.noRatings === false) {
        this.props.foods.filter(food => (!food.averageRating ? (ratingFiltered.push(food)) : ''));
      }
      if (ratingFiltered !== '') {
        ratingFiltered.map(food => (consolidated.push(food)));
        filtersUsed++;
      }
    }

    if (this.filters.noRatings === false && this.filters.rating === '') {
      this.props.foods.filter(food => (!food.averageRating ? (ratingFiltered.push(food)) : ''));
      if (ratingFiltered) {
        ratingFiltered.map(food => (consolidated.push(food)));
        filtersUsed++;
      }
    }

    if (this.filters.openRestaurants === false) {
      let restaurant = '';
      let openHour = '';
      let closeHour = '';
      let nowHour = '';
      let sameMeridiem = false;
      for (let i = 0; i < this.props.foods.length; i++) {
        for (let j = 0; j < this.props.restaurants.length; j++) {
          if (this.props.foods[i].restaurant === this.props.restaurants[j].name) {
            restaurant = this.props.restaurants[j];
            break;
          }
        }
        const stringTimeToInt = (stringTime) => {
          let intTime = '';
          intTime = stringTime.slice(0, stringTime.indexOf(' '));
          const splitIntTime = intTime.split(':');
          intTime = parseInt(splitIntTime.join(''), 10);
          return intTime;
        };
        openHour = restaurant.hours[(new Date().getDay() * 2) - 2];
        closeHour = restaurant.hours[((new Date().getDay() * 2) + 1) - 2];
        if ((closeHour.includes('pm') && openHour.includes('pm'))
            || (closeHour.includes('am') && openHour.includes('am'))) {
          sameMeridiem = true;
        } else {
          sameMeridiem = false;
        }
        if (openHour.includes('pm')) {
          openHour = 1200 + stringTimeToInt(openHour);
        } else {
          openHour = stringTimeToInt(openHour);
        }
        if (closeHour.includes('pm')) {
          closeHour = 1200 + stringTimeToInt(closeHour);
        } else {
          closeHour = stringTimeToInt(closeHour);
        }
        nowHour = (new Date().getHours()) * 100 + new Date().getMinutes();
        if ((openHour <= nowHour && closeHour > nowHour)
            || (openHour <= nowHour && sameMeridiem === true)
            || (openHour - closeHour === 0)) {
          for (let k = 0; k < this.props.foods.length; k++) {
            if (restaurant.name === this.props.foods[k].restaurant) {
              restaurantFiltered.push(this.props.foods[k]);
            }
          }
        }
      }
      if (restaurantFiltered.length > 0) {
        restaurantFiltered.map(food => (consolidated.push(food)));
        filtersUsed++;
      }
    }

    for (let i = 0; i < consolidated.length; i++) {
      let duplicates = 1;
      for (let j = 0; j < consolidated.length; j++) {
        if (filtersUsed === 1) {
          filtered.push(consolidated[j]);
          consolidated.splice(j, 1);
          j--;
        } else if (consolidated[i] === consolidated[j] && i !== j) {
          duplicates++;
          if (duplicates === filtersUsed) {
            filtered.push(consolidated[j]);
          }
          consolidated.splice(j, 1);
          j--;
        }
      }
      if (filtersUsed > 1) {
        consolidated.splice(i, 1);
        i--;
      }
    }

    console.log(this.props.foods);
    console.log(filtered);

    if (filtered.length > 0) {
      this.filters = {
        rating: '',
        price: '',
        openRestaurants: '',
        noRatings: '',
      };
      this.setState({
        restaurantChecked: false,
        ratingChecked: false,
        panes: [
          { menuItem: 'Favorite Tags', render: () => <Tab.Pane>
              <Card.Group itemsPerRow={3}>
                {this.taggedFoods(filtered)}
              </Card.Group>
            </Tab.Pane> },
            { menuItem: 'New Foods', render: () => <Tab.Pane>
                <Card.Group itemsPerRow={3}>
                  {filtered.map((food, index) => <Food
                      key={index}
                      food={food}
                      reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                  />)}
                </Card.Group>
              </Tab.Pane> },
            ] });
    } else if (
        filtered.length === 0
        && (this.filters.rating === '' || this.filters.rating === 0)
        && (this.filters.price === '' || this.filters.price === 0)
        && (this.filters.openRestaurants === '' || this.filters.openRestaurants)
        && (this.filters.noRatings === '' || this.filters.noRatings)) {
      this.filters = {
        rating: '',
        price: '',
        openRestaurants: '',
        noRatings: '',
      };
      this.setState({
        restaurantChecked: false,
        ratingChecked: false,
        panes: [
              { menuItem: 'Favorite Tags', render: () => <Tab.Pane>
                  <Card.Group itemsPerRow={3}>
                    {this.taggedFoods(this.props.foods)}
                  </Card.Group>
                </Tab.Pane> },
                { menuItem: 'New Foods', render: () => <Tab.Pane>
                <Card.Group itemsPerRow={3}>
                  {this.props.foods.map((food, index) => <Food
                      key={index}
                      food={food}
                      reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                  />)}
                </Card.Group>
              </Tab.Pane> }] });
    } else {
      this.filters = {
        rating: '',
        price: '',
        openRestaurants: '',
        noRatings: '',
      };
      this.setState({
        restaurantChecked: false,
        ratingChecked: false,
        panes: [
          { menuItem: 'Favorite Tags', render: () => <Tab.Pane /> },
          { menuItem: 'New Foods', render: () => <Tab.Pane /> },
        ],
      });
    }

  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  renderPage() {
    return (
        <div
            className='search-sidebar'
            style={{ backgroundColor: '#338D33', minHeight: '600px', paddingBottom: '60px' }}>
          <Grid>
            <Grid.Column width={4}>
              <div className='search-sidebar'>
                <Header as='h2' content='Filters'/>
                <Container>
                  <Header as='h3' content='Restaurant'/>
                  <Radio
                      toggle
                      label='Search Open Restaurants Only'
                      style={{ paddingTop: '10px' }}
                      onChange={this.toggleRestaurant}
                      checked={this.state.restaurantChecked}
                  />
                  <Header as='h3' content='Rating'/>
                  <Rating
                      icon='heart'
                      maxRating={5}
                      size='massive'
                      onRate={this.heartRating}
                      clearable
                  />
                  <Radio
                    toggle
                    label='Include Foods with No Ratings'
                    style={{ paddingTop: '10px' }}
                    onChange={this.toggleRating}
                    checked={this.state.ratingChecked}
                  />
                  <Header as='h3' content='Price'/>
                  <Rating
                      icon='star'
                      maxRating={5}
                      size='massive'
                      onRate={this.starRating}
                      clearable
                  />
                  <Button
                      onClick={this.handleClick}
                      style={{ backgroundColor: '#21BA45', color: 'white', marginTop: '60px' }}>
                    Go
                  </Button>
                </Container>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <Tab panes={this.state.panes} />
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}


YourAccount.propTypes = {
  foods: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  userInfo: PropTypes.array.isRequired,
  restaurants: PropTypes.array.isRequired,
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};


export default withTracker(() => {
  const subscription = Meteor.subscribe('Foods');
  const subscription2 = Meteor.subscribe('Reviews');
  const subscription3 = Meteor.subscribe('UserInfo');
  const subscription4 = Meteor.subscribe('Restaurants');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    userInfo: UserInfo.find({}).fetch(),
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(YourAccount);
