import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Loader, Grid, Header, Container, Button, Radio, Rating } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { UserInfo } from '/imports/api/user-info/user-info';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'underscore';
import moment from 'moment';
import Food from '../components/Food';


class YourAccount extends React.Component {

  filters = {
    rating: '',
    price: '',
    openRestaurants: '',
  }

  state =
      { checked:
            false,
        panes:
            [{ menuItem: 'Newest Foods', render: () => <Tab.Pane fluid>
                <Card.Group itemsPerRow={3}>
                  {this.props.foods.map((food, index) => <Food
                      key={index}
                      food={food}
                      reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                  />)}
                </Card.Group>
              </Tab.Pane> },
              { menuItem: 'Favorite Tags', render: () => <Tab.Pane fluid>
                <Card.Group itemsPerRow={3}>
                  {this.taggedFoods(this.props.foods)}
                </Card.Group>
              </Tab.Pane> }],
    }

  currentUserInfo = this.props.userInfo.filter(user => (user.username === this.props.currentUser));

  taggedFoods = (foods) => {
    const taggedFoodsArray = [];
    if (this.currentUserInfo.tags) {
      for (let i = 0; i < foods.length; i++) {
        for (let j = 0; j < this.currentUserInfo.tags.length; j++) {
          if (_.where(foods[i].tags, this.currentUserInfo.tags[j]).length > 0) {
            taggedFoodsArray.push(foods[i]);
          }
        }
      }
    }
    return (
        taggedFoodsArray.map((food, index) => <Food
            key={index}
            food={food}
            reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
        />)
    );
  };

  toggle = () => {
    this.setState({ checked: !this.state.checked });
    this.filters.openRestaurants = this.state.checked;
    // IF CHECKED, THEN EQUALS FALSE
  }

  heartRating = (e, { rating }) => {
    this.filters.rating = rating;
  }

  starRating = (e, { rating }) => {
    this.filters.price = rating;
  }

  handleClick = () => {
    let priceFiltered = '';
    let averageRating = '';
    let ratingFiltered = '';
    const consolidated = '';
    let filtersUsed = 0;
    const filtered = '';

    if (this.filters.price !== '') {
      priceFiltered = this.props.foods.filter(food => (food.price >= this.filters.price));
      if (priceFiltered !== '') {
        priceFiltered.map(food => (consolidated.push(food)));
        filtersUsed++;
      }
    }

    if (this.filters.rating !== '') {
      if (this.props.reviews) {
        averageRating =
            Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
                / (this.props.reviews.length));
        ratingFiltered = this.props.foods.filter(food => (food.rating >= averageRating));
      }
      if (ratingFiltered !== '') {
        ratingFiltered.map(food => (consolidated.push(food)));
        filtersUsed++;
      }
    }

    if (this.filters.openRestaurants === false) {
      /* FALSE MEANS THE TOGGLE IS ON */

    }

    if (consolidated !== '') {
      _.map(consolidated, function (outerFood) {
        let duplicates = 0;
        _.map(consolidated, function (innerFood) {
          if (innerFood === outerFood) {
            duplicates++;
          }
        });
        if (duplicates - 1 === filtersUsed) {
          filtered.push(outerFood);
        }
      });
    }

    if (filtered !== '') {
      this.setState({
        checked: this.state.checked,
        panes:
            [{ menuItem: 'Newest Foods', render: () => <Tab.Pane fluid>
                <Card.Group itemsPerRow={3}>
                  {filtered.map((food, index) => <Food
                      key={index}
                      food={food}
                      reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                  />)}
                </Card.Group>
              </Tab.Pane> },
              { menuItem: 'Newest Foods', render: () => <Tab.Pane fluid>
                  <Card.Group itemsPerRow={3}>
                    {this.taggedFoods(filtered)}
                  </Card.Group>
                </Tab.Pane> }] });

      this.render();
    }

  }


  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className='search-sidebar' style={{ backgroundColor: '#338D33', minHeight: '600px', paddingBottom: '60px' }}>
          <Grid>
            <Grid.Column width={4}>
              <div className='search-sidebar'>
                <Header as='h2' content='Filters'/>
                <Header as='h3' content='Search For'/>
                <Container>
                  <Button.Group fluid style={{ paddingBottom: '10px' }}>
                    <Button>Foods</Button>
                    <Button>Reviews</Button>
                  </Button.Group>
                  <Radio
                      toggle
                      label='Search Open Restaurants Only'
                      style={{ paddingTop: '10px' }}
                      onChange={this.toggle}
                      checked={this.state.checked}
                  />
                  <Header as='h3' content='Rating'/>
                  <Rating
                      icon='heart'
                      maxRating={5}
                      size='massive'
                      onRate={this.heartRating}
                  />
                  <Header as='h3' content='Price'/>
                  <Rating
                      icon='star'
                      maxRating={5}
                      size='massive'
                      onRate={this.starRating}
                  />
                  <Button onClick={this.handleClick} fluid style={{ backgroundColor: '#21BA45', color: 'white' }}>Go</Button>
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Foods');
  const subscription2 = Meteor.subscribe('Reviews');
  const subscription3 = Meteor.subscribe('UserInfo');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    userInfo: UserInfo.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(YourAccount);
