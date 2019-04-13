import React from 'react';
import { Card, Feed, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Button } from 'react-router-dom';

class Food extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='left' style={{ width: '40%' }} src={this.props.food.image} />
            <Card.Header>{this.props.food.name}</Card.Header>
            <Card.Meta>from {this.props.food.location}</Card.Meta>
            <Card.Meta>{this.props.food.address}</Card.Meta>
            <Card.Description>
              Hours: {this.props.food.hours}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              <Header as='h4'>Review from kturner44</Header>
              <p>Love the froyo here! Lots of flavors and toppings to choose from!</p>
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <Button>Edit Review</Button>
          </Card.Content>
        </Card>
    );
  }
}
Food.propTypes = {
  food: PropTypes.object.isRequired,
};

export default withRouter(Food);
