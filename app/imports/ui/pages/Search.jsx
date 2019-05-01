import React from 'react';
import { Grid, Table, Header, Image, Dropdown, Item, Container, Radio, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Reviews } from '/imports/api/review/review';
import { Foods } from '/imports/api/food/food';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import FoodRowSearchPage from '../components/FoodRowSearchPage';

/** A simple static component to render some text for the landing page. */
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { refreshPage: false, rating: 0 };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  isOpen(food) {

  }

  getAverageRating(reviews) {
    let total = 0;

    for (let rev of reviews) {
      total += rev.rating;
    }
    return reviews.length > 0 ? Math.round(total / reviews.length) : 1;

  }

  getReviews(food) {
    console.log(food);
    let reviewArray = [];
    this.props.reviews.map(review => {
      if (parseInt(review.foodId) === parseInt(food.key)) {
        reviewArray.push(review);
      }
    });
    return reviewArray;
  }

  getSearchResults(cuisine) {
    let results = [];
    if (cuisine === 'All') {
      this.props.foods.map(food => {
        let avgRating = this.getAverageRating(this.getReviews(food));
        if (avgRating >= this.state.rating ) {
          results.push(food);
        }
      });
    } else {
      this.props.foods.map(food => {
        if (food.category === cuisine) {
          let avgRating = this.getAverageRating(this.getReviews(food));
          if (avgRating >= this.state.rating) {
            results.push(food);
          }
        }
      });
    }
    return results;
  }

  handleChangeRating(e, { rating }) {
    let s = {};
    s['rating'] = rating;
    s['refreshPage'] = !this.state.refreshPage;
    this.setState(s);
  }

  handleRadioChange(e, data) {
    alert(data.checked);
  }

  render() {

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
                </Grid.Row>

                <Grid.Row>
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
  foodsReady: PropTypes.bool.isRequired,
  reviews: PropTypes.array.isRequired,
  reviewsReady: PropTypes.bool.isRequired,
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

  return {
    foods: Foods.find({}).fetch(),
    foodsReady: foodSubscription.ready(),
    reviews: Reviews.find({}).fetch(),
    reviewsReady: reviewSubscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(Search);
