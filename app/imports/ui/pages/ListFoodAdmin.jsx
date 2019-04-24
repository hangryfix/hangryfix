import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Header, Loader, Image, Search, Dropdown, Rating, Grid, Segment, List, Divider, Button } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Food from '../components/Food';
import FoodRow from '../components/FoodRow';
import Review from '../components/Review';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListFoodAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div style={{padding: '20px'}} className="backgroundDef">
          <Header textAlign='center' inverted as='h1'>Admin Food List</Header>
          <Divider/>
          <Grid style={{marginBottom: '50px'}}>
            <Grid.Column width={3}>
              <Segment>
              <Header h2>View Table by</Header>
                <List>
                  <List.Item as={ NavLink } activeClassName="active" exact to="/adminFood"
                             key="adminFoods">Foods</List.Item>
                  <List.Item as={ NavLink } activeClassName="active" exact to="/adminUsers"
                             key="adminUsers">Users</List.Item>
                </List>
              </Segment>
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid container>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Search fluid placeholder='Search...' />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as='h2' inverted textAlign='center' content='Search Results for Chicken'/>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown placeholder='Sort' search selection />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              {/*Food Table*/}
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Food</Table.HeaderCell>
                    <Table.HeaderCell>Info</Table.HeaderCell>
                    <Table.HeaderCell>Reviews</Table.HeaderCell>
                    <Table.HeaderCell>Tags</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.foods.map((food, index) => <FoodRow
                        key={index}
                        food={food}
                        reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                    />)}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListFoodAdmin.propTypes = {
  foods: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('FoodAdmin');
  const subscription2 = Meteor.subscribe('Foods');
  const subscription3 = Meteor.subscribe('Reviews');
  return {
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ListFoodAdmin);
