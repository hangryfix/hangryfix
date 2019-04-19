import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Loader, Grid } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SearchSidebar from '../components/SearchSidebar';
import Food from '../components/Food';

class YourAccount extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [
      { menuItem: 'Your Foods', render: () => <Tab.Pane fluid>
          <Card.Group>
            {this.props.foods.map((food, index) => <Food
                key={index}
                food={food}
                review={this.props.reviews.filter(review => (review.foodId === food._id))}
            />)}
          </Card.Group>
        </Tab.Pane> },
      { menuItem: 'Favorite Tags', render: () => <Tab.Pane fluid>
          <Card.Group>
            {this.props.foods.map((food, index) => <Food
                key={index}
                food={food}
                review={this.props.reviews.filter(review => (review.foodId === food._id))}
            />)}          </Card.Group>
        </Tab.Pane> },
      { menuItem: 'Your Reviews', render: () => <Tab.Pane fluid>
          <Card.Group>
            {this.props.foods.map((food, index) => <Food
                key={index}
                food={food}
                review={this.props.reviews.filter(review => (review.foodId === food._id))}
            />)}
          </Card.Group>
        </Tab.Pane> },
    ];

    return (
        <div className='search-sidebar' style={{ backgroundColor: '#338D33', minHeight: '600px' }}>
          <Grid>
            <Grid.Column width={4}>
              <SearchSidebar/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Tab panes={panes} />
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

YourAccount.propTypes = {
  foods: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
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
})(YourAccount);
