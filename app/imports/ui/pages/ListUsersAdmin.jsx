import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Table, Header, Loader, Grid, Segment, List } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { UserInfo } from '../../api/user-info/user-info';


import UserRow from '../components/UserRow';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUsersAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div style={{ padding: '20px' }} className="backgroundDef">
          <Grid style={{ marginBottom: '50px' }}>
            <Grid.Column width={3}>
              <Grid.Row/>
              <Segment fluid>
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
              <Grid.Row>
                <Header textAlign='center' inverted as='h1' content='Users'/>
              </Grid.Row>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Reviews</Table.HeaderCell>
                    <Table.HeaderCell>Foods</Table.HeaderCell>
                    <Table.HeaderCell>Tags</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {/* Sample User */}
                  {this.props.userInfo.map((userInfo, index) => <UserRow
                      key={index}
                      userInfo={userInfo}
                      reviews={this.props.reviews.filter(review => (review.user === userInfo.username))}
                      foods={this.props.foods}
                      userFoods={this.props.foods.filter(food => (food.owner === userInfo.username))}
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
ListUsersAdmin.propTypes = {
  foods: PropTypes.array.isRequired,
  userInfo: PropTypes.array.isRequired,
  reviews: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UserInfoAdmin');
  const subscription2 = Meteor.subscribe('Foods');
  const subscription3 = Meteor.subscribe('Reviews');
  return {
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    userInfo: UserInfo.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ListUsersAdmin);
