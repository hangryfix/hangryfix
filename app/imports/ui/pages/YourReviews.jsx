import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Loader, Image } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react/dist/commonjs/modules/Tab';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class YourReviews extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        { menuItem: 'Favorites', render: () => <Tab.Pane>
            <Card.Group>
              <Card>
                <Image src='' />
                <Card.Content>
                  <Card.Header>FOOD NAME</Card.Header>
                  <Card.Meta>stuff</Card.Meta>
                  <Card.Description>stuff</Card.Description>
                </Card.Content>
                <Card.Content>
                  {this.props.stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
                </Card.Content>
              </Card>
              <Card>
                <Image src='' />
                <Card.Content>
                  <Card.Header>FOOD NAME</Card.Header>
                  <Card.Meta>stuff</Card.Meta>
                  <Card.Description>stuff</Card.Description>
                </Card.Content>
                <Card.Content>
                  stuff
                </Card.Content>
              </Card>
              <Card>
                <Image src='' />
                <Card.Content>
                  <Card.Header>FOOD NAME</Card.Header>
                  <Card.Meta>stuff</Card.Meta>
                  <Card.Description>stuff</Card.Description>
                </Card.Content>
                <Card.Content>
                  stuff
                </Card.Content>
              </Card>
              <Card>
                <Image src='' />
                <Card.Content>
                  <Card.Header>FOOD NAME</Card.Header>
                  <Card.Meta>stuff</Card.Meta>
                  <Card.Description>stuff</Card.Description>
                </Card.Content>
                <Card.Content>
                  stuff
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane> },

            { menuItem: 'Favorites', render: () => <Tab.Pane>
                <Card.Group>
                  <Card>
                    <Image src='' />
                    <Card.Content>
                      <Card.Header>FOOD NAME</Card.Header>
                      <Card.Meta>stuff</Card.Meta>
                      <Card.Description>stuff</Card.Description>
                    </Card.Content>
                    <Card.Content>
                      stuff
                    </Card.Content>
                  </Card>
                  <Card>
                    <Image src='' />
                    <Card.Content>
                      <Card.Header>FOOD NAME</Card.Header>
                      <Card.Meta>stuff</Card.Meta>
                      <Card.Description>stuff</Card.Description>
                    </Card.Content>
                    <Card.Content>
                      stuff
                    </Card.Content>
                  </Card>
                  <Card>
                    <Image src='' />
                    <Card.Content>
                      <Card.Header>FOOD NAME</Card.Header>
                      <Card.Meta>stuff</Card.Meta>
                      <Card.Description>stuff</Card.Description>
                    </Card.Content>
                    <Card.Content>
                      stuff
                    </Card.Content>
                  </Card>
                  <Card>
                    <Image src='' />
                    <Card.Content>
                      <Card.Header>FOOD NAME</Card.Header>
                      <Card.Meta>stuff</Card.Meta>
                      <Card.Description>stuff</Card.Description>
                    </Card.Content>
                    <Card.Content>
                      stuff
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Tab.Pane> }
    );
  }
}

/** Require an array of Stuff documents in the props. */
YourReviews.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(YourReviews);
