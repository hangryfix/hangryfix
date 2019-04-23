import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Loader, Grid } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';
import { UserInfo } from '/imports/api/user-info/user-info';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'underscore';
import SearchSidebar from '../components/SearchSidebar';
import Food from '../components/Food';


class YourAccount extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    const currentUserInfo = this.props.userInfo.filter(user => (user.username === this.props.currentUser));

    const filteredFoods = () => {
      const filtering = [];
      for (let i = 0; i < this.props.foods.length; i++) {
        for (let j = 0; j < currentUserInfo[1].tags.length; j++) {
          if (_.where(this.props.foods[i].tags, currentUserInfo[1].tags[j]).length > 0) {
            filtering.push(this.props.foods[i]);
          }
        }
      }
      return (
          filtering.map((food, index) => <Food
          key={index}
          food={food}
          reviews={this.props.reviews.filter(review => (review.foodId === food._id))}
      />)
      );
    };

    const panes = [
      { menuItem: 'Newest Foods', render: () => <Tab.Pane fluid>
          <Card.Group itemsPerRow={2}>
            {this.props.foods.map((food, index) => <Food
                key={index}
                food={food}
                reviews={this.props.reviews.filter(review => (review.foodId === food._id))}
            />)}
          </Card.Group>
        </Tab.Pane> },
      { menuItem: 'Favorite Tags', render: () => <Tab.Pane fluid>
          <Card.Group itemsPerRow={2}>
            {filteredFoods()}
          </Card.Group>
        </Tab.Pane> },
    ];

    return (
        <div className='search-sidebar' style={{ backgroundColor: '#338D33', minHeight: '600px', paddingBottom: '60px' }}>
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
  currentUser: PropTypes.string,
  userInfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Foods');
  const subscription2 = Meteor.subscribe('Reviews');
  const subscription3 = Meteor.subscribe('UserInfo');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    userInfo: UserInfo.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(YourAccount);
