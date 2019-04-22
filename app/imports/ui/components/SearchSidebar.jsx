import React from 'react';
import { Container, Header, Radio, Rating, Button } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class SearchSidebar extends React.Component {
  render() {
    const spacing = { paddingTop: '10px' };
    return (
        <div className='search-sidebar'>
          <Header as='h2' content='Filters'/>
          <Header as='h3' content='Search For'/>
          <Container>
            <Button.Group fluid style={{ paddingBottom: '6px' }}>
              <Button>Foods</Button>
              <Button>Reviews</Button>
            </Button.Group>
            <Radio
                toggle label='Search Open Restaurants Only'
                style={spacing}
            />
            <Header as='h3' content='Rating'/>
            <Rating
                icon='heart'
                maxRating={5}
                size='massive'
            />
            <Header as='h3' content='Price'/>
            <Rating
                icon='star'
                maxRating={5}
                size='massive'
            />
          </Container>
        </div>
    );
  }
}

SearchSidebar.propTypes = {
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Foods');
  const subscription2 = Meteor.subscribe('Reviews');
  return {
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(SearchSidebar);
