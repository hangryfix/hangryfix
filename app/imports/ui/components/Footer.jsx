import React from 'react';
import { Container, Header, List, Grid } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const headerStyle = { color: 'white' };
    return (
        <footer className='footer'>
          <Container>
            <Grid columns={3} stackable>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Header as='h3' content='Contact Us' textAlign='center' style={headerStyle}/>
                  <hr/>
                  <List inverted>
                    <List.Item>
                      <List.Icon name='instagram'/>
                      <List.Content><a href="https://www.instagram.com/hangryfix_the_app/">Instagram</a></List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='mail'/>
                      <List.Content>
                        <a href='mailto:jack@semantic-ui.com'>contact@hangryFIX.com</a>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' content='Restaurants' textAlign='center' style={headerStyle}/>
                  <hr/>
                  <Grid style={{ paddingTop: '7px' }}>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <List inverted>
                          <List.Item><a href="https://daspot.net/">Da Spot</a></List.Item>
                          <List.Item><a href="https://www.dunkindonuts.com/en">Dunkin&rsquo; Donuts</a></List.Item>
                          <List.Item><a href="https://www.iskconhawaii.com/foodtruck">Govinda&rsquo;s</a></List.Item>
                          <List.Item><a href="https://holohologrill.com/">Holoholo Grill</a></List.Item>
                          <List.Item><a href="http://manoa.hawaii.edu/food/hotTacos.php">Hot Tacos</a></List.Item>
                          <List.Item><a href="http://www.kamitokuramen.com/">Kamitoku Ramen</a></List.Item>
                          <List.Item><a href="https://www.hawaiianbarbecue.com/">L&L Hawaiian Barbecue</a></List.Item>
                        </List>
                      </Grid.Column>
                      <Grid.Column>
                        <List inverted>
                          <List.Item><a href="http://lasoonhawaii.com/">Lasoon</a></List.Item>
                          <List.Item><a href="https://www.lecrepecafe.com/">Le Crêpe Cafe</a></List.Item>
                          <List.Item><a href="https://www.pandaexpress.com/">Panda Express</a></List.Item>
                          <List.Item><a href="https://www.peacecafehawaii.com/">Peace Cafe</a></List.Item>
                          <List.Item><a href="http://manoa.hawaii.edu/food/punchbowl.php">Punchbowl Cafe</a></List.Item>
                          <List.Item><a href="http://manoa.hawaii.edu/food/sistahTruck.php">Sistah Truck</a></List.Item>
                          <List.Item><a href="http://manoa.hawaii.edu/food/beanCounter.php">The Bean Counter</a></List.Item>
                        </List>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' content='The hangryFIX Team' textAlign='center' style={headerStyle}/>
                  <hr/>
                  <List inverted>
                    <List.Item><a href="https://christina-chen-cco2.github.io">Christina Chen</a></List.Item>
                    <List.Item><a href="https://jhutch42.github.io">James Hutchison</></List.Item>
                    <List.Item><a href="https://katrinaturner.github.io/">Katrina Johnson Turner</a></List.Item>
                    <List.Item>
                      <List.Icon name='copyright'/>
                      <List.Content>Copyright 2019</List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </footer>
    );
  }
}

export default Footer;
