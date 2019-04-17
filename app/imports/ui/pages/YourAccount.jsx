import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Loader, Grid } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
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
      { menuItem: 'Favorite Tags', render: () => <Tab.Pane fluid>
          <Card.Group>
            {this.props.foods.map((food, index) => <Food key={index} food={food} />)}
          </Card.Group>
        </Tab.Pane> },
      { menuItem: 'Your Reviews', render: () => <Tab.Pane fluid>
          <Card.Group>
          </Card.Group>
        </Tab.Pane> },
    ];

    return (
        <div className='search-sidebar'>
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Food');
  return {
    foods: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(YourAccount);
