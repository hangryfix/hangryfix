import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container, Grid, Image, Input, Card, Feed, Loader } from 'semantic-ui-react';
import Food from '../components/Food';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { _ } from 'underscore';

/** A component to render the landing page. */
class Landing2 extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    const searchStyle = {
      width: '80%',
      height: '50px',
      color: '#045604',
    };

    return (
        <div className="landingMid" id='landing-page-id'>

          {/*Main Image/Search Bar  */}
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

          {/*Recent Reviews*/}
          <Container style={{ paddingTop: '20px' }}>
            <Header as='h2' class='color-primary-3'>Recent Reviews</Header>
            <Card.Group itemsPerRow={4}>
              {this.props.foods.map((food, index) => <Food
                  key={index}
                  food={food}
                  reviews={this.props.reviews.filter(review => (review.foodId === food._id))}
              />)}
            </Card.Group>

            {/*About Us Section*/}
            <div className='aboutUs'>
              <Grid columns={2} verticalAlign='middle'>
               <Grid.Row>
                <Grid.Column>
            <Header as='h2' style={{color: '#045604'}}>Our Mission</Header>
            <p>
              Our Mission here at hangryFIX is to help end hangriness one college student at a time.
              Are you hangry? Craving a particular type of food or specific food item, but dont know
            where to get it? HangryFIX is the app for you! Search by food genre or food name to find
            the best, cheapest, or closest place to get that food to cure your hangriness NOW.</p>
                </Grid.Column>
                <Grid.Column>
                  <Image src="http://c3.thejournal.ie/media/2013/09/eating-chips-390x285.jpg"/>
                </Grid.Column>
               </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Image style={{width: '70%'}}
                        src="http://www.1worldglobalgifts.com/images/Paperweights/blue_green_crystal_globe_paperweight_sm.jpg" />
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h2' style={{color: '#045604'}}>Member Perks</Header>
                    <p>
                      Help contribute to the cause by creating an account with us! As a member you can help others with
                      their hangry problems by adding new foods and reviewing foods. You can also look back at your
                      past reviews so you can always find the name of
                      that one place you got that really good poke from that one time.  And of course, member accounts
                      are FREE.  So what are you waiting for?  Sign up to end hangriness now!
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Container>
        </div>
    );
  }
}

Landing2.propTypes = {
  foods: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Food & Review documents.
  const subscription = Meteor.subscribe('Foods');
  const subscription2 = Meteor.subscribe('Reviews');
  return {
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(Landing2);
