import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Image, Loader, Feed, Header, Grid } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SearchSidebar from '../components/SearchSidebar';


class YourAccount extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    const panes = [
      { menuItem: 'Your Foods', render: () => <Tab.Pane fluid>
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
        </Tab.Pane> },
      { menuItem: 'Favorites', render: () => <Tab.Pane>
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
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(YourAccount);
