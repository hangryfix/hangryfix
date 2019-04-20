import React from 'react';
import { Grid, Search, Table, Header, Rating, Image, Dropdown } from 'semantic-ui-react';
import SearchSidebar from '../components/SearchSidebar';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
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
                    <Search
                        fluid
                        placeholder='Search...'
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as='h2' textAlign='center' content='Search Results for Chicken'/>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown placeholder='Sort' search selection />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Table singleLine>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Image
                          src='https://cdn.cpnscdn.com/static.coupons.com/ext/kitchme/images/recipes/600x400/chicken-katsu_18841.jpg'
                          size='small'/>
                    </Table.Cell>
                    <Table.Cell singleLine>
                      <Header as='h3' textAlign='center' content='Chicken Katsu'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Rating icon='heart' defaultRating={3} maxRating={5} size='large'/>
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Header as='h3' textAlign='center' content='L&L Hawaiian'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h3' textAlign='center' content='Price: $8.99'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Image
                          src='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/2/1/0/AI0207-1_Shoyu-Chicken_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432472001346.jpeg'
                          size='small'/>
                    </Table.Cell>
                    <Table.Cell singleLine>
                      <Header as='h3' textAlign='center' content='Shoyu Chicken'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Rating icon='heart' defaultRating={5} maxRating={5} size='large'/>
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Header as='h3' textAlign='center' content='Holoholo Grill'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h3' textAlign='center' content='Price: $10.00'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Image
                          src='https://www.eatthis.com/wp-content/uploads/2018/10/panda-express-teriyaki-chicken-500x366.jpg'
                          size='small'/>
                    </Table.Cell>
                    <Table.Cell singleLine>
                      <Header as='h3' textAlign='center' content='Teriyaki Chicken'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Rating icon='heart' defaultRating={5} maxRating={5} size='large'/>
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                      <Header as='h3' textAlign='center' content='Panda Express'/>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h3' textAlign='center' content='Price: $7.99'/>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Landing;
