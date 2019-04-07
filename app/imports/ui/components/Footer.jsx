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
                      <List.Icon name='facebook'/>
                      <List.Content>Facebook</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='instagram'/>
                      <List.Content>Instagram</List.Content>
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
                  <List inverted>
                    <List.Item>Da Spot</List.Item>
                    <List.Item>Dunkin&rsquo; Donuts</List.Item>
                    <List.Item>Govinda&rsquo;s</List.Item>
                    <List.Item>Holoholo Grill</List.Item>
                    <List.Item>Hot Tacos</List.Item>
                    <List.Item>Kamitoku Ramen</List.Item>
                    <List.Item>L&L Hawaiian Barbecue</List.Item>
                    <List.Item>Lasoon</List.Item>
                    <List.Item>Le Crêpe Café</List.Item>
                    <List.Item>Panda Express</List.Item>
                    <List.Item>Peace Cafe</List.Item>
                    <List.Item>Punchbowl</List.Item>
                    <List.Item>Sistah Truck</List.Item>
                    <List.Item>The Bean Counter</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3' content='The hangryFIX Team' textAlign='center' style={headerStyle}/>
                  <hr/>
                  <List inverted>
                    <List.Item>Christina Chen</List.Item>
                    <List.Item>James Hutchison</List.Item>
                    <List.Item>Katrina Johnson Turner</List.Item>
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
