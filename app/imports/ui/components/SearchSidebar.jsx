import React from 'react';
import { Container, Header, Radio, Rating, Button } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class SearchSidebar extends React.Component {

  filters = {
    rating: '',
    price: '',
    openRestaurants: '',
  }

  state = { checked: false }

  toggle = () => {
    this.setState({ checked: !this.state.checked });
    this.filters.openRestaurants = this.state.checked;
    // IF CHECKED, THEN EQUALS FALSE
  }

  heartRating = (e, { rating }) => {
    this.filters.rating = rating;
  }

  starRating = (e, { rating }) => {
    this.filters.price = rating;
  }

  render() {

    const spacing = { paddingTop: '10px' };

    return (
        <div className='search-sidebar'>
          <Header as='h2' content='Filters'/>
          <Header as='h3' content='Search For'/>
          <Container>
            <Button.Group fluid style={{ paddingBottom: '10px' }}>
              <Button>Foods</Button>
              <Button>Reviews</Button>
            </Button.Group>
            <Radio
                toggle
                label='Search Open Restaurants Only'
                style={spacing}
                onChange={this.toggle}
                checked={this.state.checked}
            />
            <Header as='h3' content='Rating'/>
            <Rating
                icon='heart'
                maxRating={5}
                size='massive'
                onRate={this.heartRating}
            />
            <Header as='h3' content='Price'/>
            <Rating
                icon='star'
                maxRating={5}
                size='massive'
                onRate={this.starRating}
            />
            <Button onClick={''} fluid style={{ backgroundColor: '#21BA45', color: 'white' }}>Go</Button>
          </Container>
        </div>
    );
  }
}

SearchSidebar.propTypes = {
  foods: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Foods');
  return {
    foods: Foods.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchSidebar);
