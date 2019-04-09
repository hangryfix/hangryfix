import React from 'react';
import { Header, Container, Grid, Image, Input, Segment, Card, Feed } from 'semantic-ui-react';
import MainImage from '../../../doc/lb-lava-bowl.jpg';
import FroyoImage from '../../../doc/froyo.jpg';
import NachosImage from '../../../doc/kalua-nachos.jpg';
import OkonoImage from '../../../doc/okonomiyaki.jpg';
// import Food from '/imports/ui/components/Food';
// import Foods from '../../api/food/food'

/** A component to render the landing page. */
class Landing extends React.Component {
  render() {
    const searchStyle = {
      width: '80%',
      color: '#045604'
    }
    return (
        <div>
          <Container>
            <Grid columns={2} verticalAlign='middle'>
              <Grid.Column>
                <Image class='medium' src={MainImage}/>
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
          </Container>
          <Container>
            <Segment>
            <Header as='h3'>Recent Reviews</Header>
              <Card.Group>
                <Card centered>
                  <Card.Content>
                    <Image floated='left' size='small' src={FroyoImage} />
                    <Card.Header>Froyo from Tutti Frutti</Card.Header>
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
                    <Image floated='left' size='small' src={NachosImage} />
                    <Card.Header>Kalua Pig Nachos from Bay View Bar & Bistro</Card.Header>
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
              </Card.Group>
            </Segment>
            <Segment>
            <Header>About Us</Header>
            Are you hangry? Craving a particular type of food or specific food item, but dont know
            where to get it? HangryFix is the app for you! Search by food genre or food name to find
            the best, cheapest, or closest places to get that food to cure your hangriness. Create a
            free account now to start saving your favorite foods and leaving reviews to help others cure
            their hangriness.
            </Segment>
          </Container>
        </div>
    );
  }
}
export default Landing;
