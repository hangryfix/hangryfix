import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Header, Loader, Search, Dropdown, Grid, Segment, List, Divider, Button } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { UserInfo } from '../../api/user-info/user-info';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUsersAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div style={{padding: '20px'}} className="backgroundDef">
          <Header textAlign='center' inverted as='h1'>Admin User List</Header>
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
                    <Header as='h2' inverted textAlign='center' content='Search Results for kturner'/>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown placeholder='Sort' search selection />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Reviews</Table.HeaderCell>
                    <Table.HeaderCell>Tags</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {/*Sample User*/}
                  <Table.Row>
                    <Table.Cell>
                      <Header as='h3' textAlign='left' content='Katrina Turner'/>
                      <Header as='h5' textAlign='left' content='kturner44'/>
                      <Header as='h5' textAlign='left' content='katrina@foo.com'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown scrolling text='Show/Hide Reviews'>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Table>
                              <Table.Header>
                                <Table.Cell>Review</Table.Cell>
                                <Table.Cell>Food</Table.Cell>
                              </Table.Header>
                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell>
                                    Super good deals for the portion size! Even a mini is huge!
                                  </Table.Cell>
                                  <Table.Cell>Chicken Katsu from L & L</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>The best shoyu chicken you will find on island!</Table.Cell>
                                  <Table.Cell>Shoyu Chicken from Rainbow Drive-In</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>Not the greatest, but fast and convenient.</Table.Cell>
                                  <Table.Cell>Teriyaki Chicken from Panda Express</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell>
                      Japanese, Local, Pizza, Sushi
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
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
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Food and User documents.
  const subscription = Meteor.subscribe('FoodAdmin');
  const subscription2 = Meteor.subscribe('UserAdmin');
  return {
    foods: Foods.find({}).fetch(),
    user: UserInfo.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ListUsersAdmin);
