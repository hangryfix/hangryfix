import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Header, Loader, Image, Search, Dropdown, Rating, Grid, Segment, List, Divider, Button } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
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
                    <Header as='h2' inverted textAlign='center' content='Search Results for Chicken'/>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown placeholder='Sort' search selection />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
                  {/*Chicken Katsu*/}
                  <Table.Row>
                    <Table.Cell>
                      <Image src='https://cdn.cpnscdn.com/static.coupons.com/ext/kitchme/images/recipes/600x400/chicken-katsu_18841.jpg'
                          style={{height: '70px'}}/>
                      <Header as='h3' textAlign='left' content='Chicken Katsu'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h3' textAlign='center' content='L&L Hawaiian'/>
                      <Header as='h5' textAlign='center' content='Price: $8.99'/>
                      <Header as='h5' textAlign='center' content='Hours: M-Su 9am-9pm'/>
                    </Table.Cell>
                    <Table.Cell singleLine>
                      <Rating icon='heart' defaultRating={3} maxRating={5} size='large'/>
                      <Divider/>
                      <Dropdown scrolling text='Show/Hide Reviews'>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Table>
                              <Table.Header>
                                <Table.Cell>Review</Table.Cell>
                                <Table.Cell>User</Table.Cell>
                              </Table.Header>
                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell>
                                    Super good deals for the portion size! Even a mini is huge!
                                  </Table.Cell>
                                  <Table.Cell>kturner44</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>My go to spot for chicken katsu.</Table.Cell>
                                  <Table.Cell>JohnDoe</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>I could eat a whole pan of this.</Table.Cell>
                                  <Table.Cell>T-Hud</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell>
                      Chicken, Plate Lunch, Japanese, Local
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>

                  {/*Shoyu Chicken*/}
                  <Table.Row>
                    <Table.Cell>
                      <Image src='https://s3-media3.fl.yelpcdn.com/bphoto/kxjtshtBeV6Y_hYDr7qDzw/o.jpg'
                             style={{height: '70px'}}/>
                      <Header as='h3' textAlign='left' content='Shoyu Chicken'/>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Header as='h3'  content='Rainbow Drive-In'/>
                      <Header as='h5' content='Price: $7.95'/>
                      <Header as='h5' content='Hours: M-Su 7am-9pm'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Rating icon='heart' defaultRating={3} maxRating={5} size='large'/>
                      <Divider/>
                      <Dropdown scrolling text='Show/Hide Reviews'>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                          <Table>
                            <Table.Header>
                              <Table.Cell>Review</Table.Cell>
                              <Table.Cell>User</Table.Cell>
                            </Table.Header>
                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>
                                  The best shoyu chicken you will find on island!
                                </Table.Cell>
                                <Table.Cell>AdminJo</Table.Cell>
                                <Table.Cell><Button icon='delete'/></Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Delicious.</Table.Cell>
                                <Table.Cell>JohnDoe</Table.Cell>
                                <Table.Cell><Button icon='delete'/></Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Hits the spot. So ono!</Table.Cell>
                                <Table.Cell>kturner44</Table.Cell>
                                <Table.Cell><Button icon='delete'/></Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell>
                      Chicken, Local, Plate Lunch
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>

                  {/*Pandas Teri Chicken*/}
                  <Table.Row>
                    <Table.Cell>
                      <Image
                          src='https://www.eatthis.com/wp-content/uploads/2018/10/panda-express-teriyaki-chicken-500x366.jpg'
                          style={{height: '70px'}}/>
                      <Header as='h3' textAlign='left' content='Teriyaki Chicken'/>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Header as='h3' content='Panda Express'/>
                      <Header as='h5' content='Price: $7.99'/>
                      <Header as='h5' content='Hours: M-Su 10am-9pm'/>
                    </Table.Cell>
                    <Table.Cell singleLine>
                      <Rating icon='heart' defaultRating={3} maxRating={5} size='large'/>
                      <Divider/>
                      <Dropdown scrolling text='Show/Hide Reviews'>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Table>
                              <Table.Header>
                                <Table.Cell>Review</Table.Cell>
                                <Table.Cell>User</Table.Cell>
                              </Table.Header>
                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell>So yummy. I love Pandas.</Table.Cell>
                                  <Table.Cell>JohnDoe</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>Not the greatest, but fast and convenient.</Table.Cell>
                                  <Table.Cell>kturner44</Table.Cell>
                                  <Table.Cell><Button icon='delete'/></Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell>
                      Chicken, Chinese, Fast Food
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
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('FoodAdmin');
  return {
    foods: Foods.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListUsersAdmin);
