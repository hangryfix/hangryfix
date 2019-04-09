import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Card, Image, Container, Header, Rating, Loader, Radio, Grid } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class YourFoods extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    const panes = [
      { menuItem: 'Favorites', render: () => <Tab.Pane fluid attached={false}>
          <Card.Group centered>
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
      { menuItem: 'Your Additions', render: () => <Tab.Pane attached={false}>
          <Card.Group centered>
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
    ];

    const spacing = { paddingTop: '10px' };
    return (
        <div className='search-sidebar'>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as='h2' content='Filters'/>
                <Header as='h3' content='Search For'/>
                <Container>
                  <div className='two-options-toggle'>
                    <div className='two-options-toggle-left'>
                      Foods
                    </div>
                    <div className='two-options-toggle-right'>
                      Reviews
                    </div>
                  </div>
                  <Radio
                      toggle label='Search Open Restaurants Only'
                      style={spacing}
                  />
                  <Header as='h3' content='Rating'/>
                  <Rating
                      icon='heart'
                      defaultRating={1}
                      maxRating={5}
                      size='massive'
                  />
                  <Header as='h3' content='Price'/>
                  <Rating
                      icon='star'
                      defaultRating={1}
                      maxRating={5}
                      size='massive'
                  />
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

YourFoods.propTypes = {
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
})(YourFoods);
