import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';
import Review from './Review';

class Food extends React.Component {
  render() {

    let averageRating = '';

    if (this.props.reviews) {
      averageRating =
          Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
              / (this.props.reviews.length));
    }

    const path = `/addReview/:${this.props.food._id}`;

    return (
        <Table.Row>
          {/*Col 1: Image/Name*/}
          <Table.Cell>
            <Image floated='left' style={{ width: '40%' }} src={this.props.food.image} />
            <Header as='h3' textAlign='left'>
              {this.props.food.name}
            </Header>
          </Table.Cell>

            {/*Col 2: Info*/}
          <Table.Cell>
            <Icon name="map marker alternate" style={{ marginRight: '5px' }}/>
            {this.props.food.restaurant}
            <Icon name="clock" style={{ marginRight: '5px' }} />
            {this.props.food.hours}
            <Icon name="dollar sign" />
            <Rating size="large" icon="star" defaultRating={this.props.food.price} maxRating={5} disabled/>
          </Table.Cell>

          {/*Col 3: Reviews*/}
            <Table.Cell style={{ paddingBottom: '30px' }}>
              {this.props.reviews.length > 0 ? (
                  <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
              ) : (
                  'No ratings yet.'
              )
              }

            </Table.Cell>

          {/*Col 4: tags*/}
          <Table.Cell>
            {this.props.food.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag.name}
            </Label>)}
          </Table.Cell>


          <Card.Content>
            {this.props.reviews.length > 0 ? (
                <Modal size='small' trigger={<Button fluid>Show {this.props.reviews.length} ratings and reviews</Button>}>
                  <Modal.Header>
                    <Card fluid>
                      <Card.Content>
                        <Image floated='left' style={{ width: '30%' }} src={this.props.food.image} />
                        <Card.Header style={{ fontSize: '30px' }}>
                          {this.props.food.name}
                        </Card.Header>
                        <Card.Meta style={{ paddingBottom: '30px' }}>
                          {this.props.reviews.length > 0 ? (
                              <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
                          ) : (
                              'No ratings yet.'
                          )
                          }
                        </Card.Meta>
                        <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
                          <Icon name="map marker alternate" style={{ marginRight: '5px' }}/>
                          {this.props.food.restaurant}
                        </Card.Meta>
                        <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
                          <Icon name="clock" style={{ marginRight: '5px' }} />
                          {this.props.food.hours}
                        </Card.Meta>
                        <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
                          <Icon name="dollar sign" />
                          <Rating size="large"
                                  icon="star"
                                  defaultRating={this.props.food.price}
                                  maxRating={5}
                                  disabled/>
                        </Card.Meta>
                        <Card.Description>
                          {this.props.food.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content>
                        {this.props.food.tags.map((tag, index) => <
                          Label tag
                                style={{ backgroundColor: '#338D33', color: 'white' }}
                                key={index}>
                          {tag.name}
                        </Label>)}
                      </Card.Content>
                    </Card>
                  </Modal.Header>
                  <Modal.Content scrolling>
                    {this.props.reviews.map((review, index) => <Review
                        key={index}
                        review={review}
                    />)}
                  </Modal.Content>
                </Modal>
            ) : (
                <Card.Header style={{ fontSize: '18px' }}>No reviews yet.</Card.Header>
            )
            }
          </Card.Content>
        </Table.Row>
    );
  }
}
Food.propTypes = {
  food: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  reviews: PropTypes.array.isRequired,
};

const FoodContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Food);

export default withRouter(FoodContainer);
