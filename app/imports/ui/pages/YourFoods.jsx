import React from 'react';
import { Tab, Card, Image, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class YourFoods extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [
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
        </Tab.Pane> },
      { menuItem: 'Your Additions', render: () => <Tab.Pane>
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
        </Tab.Pane> },
    ];
    const TabExampleBasic = () => <Tab panes={panes} />;
    return (
        TabExampleBasic()
    );
  }
}

YourFoods.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default YourFoods;
