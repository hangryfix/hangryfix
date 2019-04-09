import React from 'react';
import { Header, Container, Grid, Image, Input, Segment, Card, Feed } from 'semantic-ui-react';
// import Food from '/imports/ui/components/Food';
// import Foods from '../../api/food/food'

/** A component to render the landing page. */
class Landing extends React.Component {
  render() {
    const searchStyle = {
      width: '80%',
      color: '#045604',
    };
    return (
        <div className="landingMid">
            <Grid columns={2} verticalAlign='middle'>
              <Grid.Column>
                <Image src='https://i.ibb.co/wQKyMDK/lb-lava-bowl.jpg'/>
              </Grid.Column>
              <Grid.Column>
                <Input
                    class='color-primary-0'
                    action={{ color: 'green', content: 'Search' }}
                    actionPosition='right'
                    icon='search'
                    iconPosition='left'
                    placeholder='Hangry??? What are you craving?'
                    style={searchStyle}/>
              </Grid.Column>
            </Grid>
          <Container style={{ paddingTop: '20px' }}>
            <Header as='h2' class='color-primary-3'>Recent Reviews</Header>
              <Card.Group>
                <Card centered>
                  <Card.Content>
                    <Image floated='left' style={{ width: '40%' }}
                           src='https://i.ibb.co/r2Cp0TK/froyo.jpg' />
                    <Card.Header>Froyo</Card.Header>
                    <Card.Meta>from Tutti Frutti</Card.Meta>
                    <Card.Meta>700 Keeaumoku St #102, Honolulu HI 96814</Card.Meta>
                    <Card.Description>
                      Hours: M-Su 10am-10pm
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Feed>
                      <Header as='h4'>Review from kturner44</Header>
                      <p>Love the froyo here! Lots of flavors and toppings to choose from!</p>
                    </Feed>
                  </Card.Content>
                </Card>
                <Card centered>
                  <Card.Content>
                    <Image floated='left' style={{ width: '40%' }}
                           src='https://i.ibb.co/8cJFSLv/kalua-nachos.jpg' />
                    <Card.Header>Kalua Pig Nachos</Card.Header>
                    <Card.Meta>from Bay View Bar & Bistro</Card.Meta>
                    <Card.Meta>45-285 Kaneohe Bay Dr, Kaneohe HI 96744</Card.Meta>
                    <Card.Description>
                      Hours: M-Su 11am-7pm
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Feed>
                      <Header as='h4'>Review from kturner44</Header>
                      <p>These nachos are huge for only $13. Super ono and plenty to share if you
                        get as an appetizer.  Or if you dont want to share, makes a good meal.</p>
                    </Feed>
                  </Card.Content>
                </Card>
                <Card centered>
                  <Card.Content>
                    <Image floated='left' style={{ width: '40%' }}
                           src='https://i.ibb.co/n05BzTg/okonomiyaki.jpg' />
                    <Card.Header>Okonomiyaki</Card.Header>
                    <Card.Meta>from Waikiki Yokocho</Card.Meta>
                    <Card.Meta>2250 Kalakaua Ave, Honolulu HI 96815</Card.Meta>
                    <Card.Description>
                      Hours: M-Su 11am-12am
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Feed>
                      <Header as='h4'>Review from kturner44</Header>
                      <p>A little pricey, but some of the best Okonomiyaki you can find on the island.</p>
                    </Feed>
                  </Card.Content>
                </Card>
              </Card.Group>
            <div className='aboutUs'>
            <Header inverted>About Us</Header>
            <p style={{color: 'white'}}>
              Are you hangry? Craving a particular type of food or specific food item, but dont know
            where to get it? HangryFix is the app for you! Search by food genre or food name to find
            the best, cheapest, or closest places to get that food to cure your hangriness. Create a
            free account now to start saving your favorite foods and leaving reviews to help others cure
              their hangriness.</p>
            </div>
          </Container>
        </div>
    );
  }
}
export default Landing;
