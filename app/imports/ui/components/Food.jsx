import React from 'react';
import { Card, Feed, Rating, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Food extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='left' style={{ width: '40%' }} src={this.props.food.image} />
            <Card.Header>{this.props.food.name}</Card.Header>
            <Card.Meta>
              {this.props.food.restaurant}
              <Rating icon='heart' defaultRating={this.props.food.averageRating} maxRating={5} size='huge' disabled />
            </Card.Meta>
            <Card.Description>
              Address: {this.props.food.address}
              Hours: {this.props.food.hours}
              Price: {this.props.food.price}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.reviews.map((review, index) => <Review key={index} review={review} />)}
            </Feed>
          </Card.Content>
        </Card>
    );
  }
}
Food.propTypes = {
  food: PropTypes.object.isRequired,
};

export default withRouter(Food);
