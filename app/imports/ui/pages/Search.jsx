import React from 'react';
import { Grid, Table, Header, Rating, Image, Dropdown } from 'semantic-ui-react';
import SearchSidebar from '../components/SearchSidebar';
import PropTypes from 'prop-types';
import { Reviews } from '/imports/api/review/review';
import { Foods } from '/imports/api/food/food';
import { Meteor } from 'meteor/meteor';
import { withTracker, NavLink } from 'meteor/react-meteor-data';
import FoodRowSearchPage from '../components/FoodRowSearchPage';

/** A simple static component to render some text for the landing page. */
class Search extends React.Component {
  render() {
    const searchStyle = { padding: '20px 0 0 0' };
    return (
        <Grid style={{ paddingBottom: '30px' }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <SearchSidebar/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h3' textAlign='left' content='Popular Food Choices' style={searchStyle}/>
              <Grid columns='equal'>
                <Grid.Column>
                  <Header as='h3' textAlign='center' content='Chicken'/>
                  <Image
                      src="https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201309-xl-filipino-grilled-chicken.jpg?itok=e9G7Zq9x"
                      size="small"
                      circular
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='center' content='Pizza'/>
                  <Image
                      src="https://cdn.vox-cdn.com/thumbor/mlXyzYbPGKaw8_A_Xa_xWs2pWdY=/0x0:5760x3240/1200x900/filters:focal(2647x851:3567x1771)/cdn.vox-cdn.com/uploads/chorus_image/image/59742091/Timber_Eater.1526406771.jpg"
                      size="small"
                      circular
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='center' content='Plate Lunch'/>
                  <Image
                      src="https://cdn.vox-cdn.com/thumbor/cpTJ3qW8N3xT9ecYcLGA8efyc0o=/0x0:960x640/1200x900/filters:focal(404x244:556x396)/cdn.vox-cdn.com/uploads/chorus_image/image/61052623/808_Grinds_Facebook.0.jpg"
                      size="small"
                      circular
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='center' content='Sushi'/>
                  <Image
                      src="http://www.waff.com/resizer/48q6DJnzCYur7xLlZIT-vMN6AzI=/1200x900/arc-anglerfish-arc2-prod-raycom.s3.amazonaws.com/public/VVA2G34J4RA6PETRDBHM7NKFVM.jpg"
                      size="small"
                      circular
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='center' content='Poke'/>
                  <Image
                      src="https://cdn.vox-cdn.com/thumbor/06_eStyQuHfhQtivupiu4K7Cxiw=/55x0:944x667/1200x900/filters:focal(55x0:944x667)/cdn.vox-cdn.com/uploads/chorus_image/image/51685971/shutterstock_466611347.0.0.jpg"
                      size="small"
                      circular
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' textAlign='center' content='Burgers'/>
                  <Image
                      src="https://cdn.vox-cdn.com/thumbor/lqxgW809E8TCIYVeWLU34uszqqc=/0x0:4145x2536/1200x900/filters:focal(1742x937:2404x1599)/cdn.vox-cdn.com/uploads/chorus_image/image/55807267/6040.0.jpg"
                      size="small"
                      circular
                  />
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as='h2' textAlign='center' content='Search Results for Chicken'/>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown placeholder='Sort' search selection />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Table style={{width: '100%'}}>
                <Table.Body style={{width: '100%'}}>
                  {this.props.foods.map((food, index) => <FoodRowSearchPage
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
