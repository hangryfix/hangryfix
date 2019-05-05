import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';
import Review from './Review';
import { Foods } from '/imports/api/food/food';
import { Restaurants } from '/imports/api/restaurant/restaurant';

class FoodRow extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getDefaultRating = this.getDefaultRating.bind(this);
  }

  onClick = () => Foods.remove(this.props.food._id, this.deleteCallback)

  getDefaultRating(price) {
      let stars = 0;
      if (price < 4) {
        stars = 1;
      } else if (price >= 4 && price < 8) {
        stars = 2;
      } else if (price >= 8 && price < 12) {
        stars = 3;
      } else if (price >= 12 && price < 16) {
        stars = 4;
      } else {
        stars = 5;
      }
      return stars;
  }

  render() {

    let averageRating = '';

    if (this.props.reviews) {
      averageRating =
          Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
              / (this.props.reviews.length));
    }

    return (
        <Table.Row>
          { /* Col 1: Image/Name */ }
          <Table.Cell style={{ width: '30%' }}>
            <Image floated='left' style={{ width: '40%' }} src={this.props.food.image} />
            <Header as='h3' textAlign='left'>
              {this.props.food.name}
            </Header>
          </Table.Cell>

            { /* Col 2: Info */ }
          <Table.Cell style={{ width: '20%' }}>
            <Icon name="map marker alternate" style={{ marginRight: '5px' }}/>
            {this.props.food.restaurant}
            { /* <div name="hours"> */ }
              { /* <Icon name="clock" style={{ marginRight: '5px' }} /> */ }
              { /* <Dropdown text={<a>Show hours</a>} pointing="left"> */ }
                { /* {restHours()} */ }
                        { /* <Dropdown.Menu>* / }
                          { /* <Dropdown.Header>{`Mon: ${hours[0]} - ${hours[1]}`}</Dropdown.Header> */ }
                          { /* <Dropdown.Divider/> */ }
                          { /* <Dropdown.Header>{`Tues: ${hours[2]} - ${hours[3]}`}</Dropdown.Header> */ }
                          { /* <Dropdown.Divider/> */ }
                          { /* <Dropdown.Header>{`Wed: ${hours[4]} - ${hours[5]}`}</Dropdown.Header> */ }
                          { /* <Dropdown.Divider/> */ }
                          { /* <Dropdown.Header>{`Thu: ${hours[6]} - ${hours[7]}`}</Dropdown.Header> */ }
                          { /* <Dropdown.Divider/> */ }
                          { /* <Dropdown.Header>{`Fri: ${hours[8]} - ${hours[9]}`}</Dropdown.Header> */ }
                          { /* <Dropdown.Divider/> */ }
                          { /* <Dropdown.Header>{`Sat: ${hours[10]} - ${hours[11]}`}</Dropdown.Header> */ }
                          { /* <Dropdown.Divider/> */ }
                          { /* <Dropdown.Header>{`Sun: ${hours[12]} - ${hours[13]}`}</Dropdown.Header> */ }
                        { /* </Dropdown.Menu> */ }
              { /* </Dropdown> */ }
            { /* </div> */ }
            <div><Icon name="dollar sign" />
            <Rating size="large"
                    icon="star"
                    defaultRating={this.getDefaultRating(this.props.food.price)}
                    maxRating={5}
                    disabled/></div>
          </Table.Cell>

          { /* Col 3: Reviews */ }
            <Table.Cell style={{ paddingBottom: '30px', width: '20%' }}>
              {this.props.reviews.length > 0 ? (
                  <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
              ) : (
                  'No ratings yet.'
              )
              }
              {this.props.reviews.length > 0 ? (
                  <Modal size='small' trigger={
                    <Button fluid>Show {this.props.reviews.length} ratings and reviews</Button>}>
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
                          {this.props.food.tags.map((tag, index) => {
                            let returnThis = '';
                            if ((typeof tag) === 'object') {
                              returnThis =
                                  <Label.Group tag>
                                    <Label style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                                      {tag.name}
                                    </Label>
                                    <Label tag style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                                      {tag.type}
                                    </Label>
                                  </Label.Group>;
                            } else {
                              returnThis =
                                  <Label tag style={{ backgroundColor: '#338D33', color: 'white' }} key={index}>
                                    {tag}
                                  </Label>;
                            }
                            return returnThis;
                          })}
                          {<Label tag style={{ backgroundColor: '#338D33', color: 'white' }}>
                            {this.props.food.category}
                          </Label>}
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
            </Table.Cell>

          { /* Col 4: tags */ }
          <Table.Cell style={{ width: '20%' }}>
            {this.props.food.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag}
            </Label>)}
          </Table.Cell>

          { /* Col 5: options */ }
          <Table.Cell>
            <Button.Group>
              <Button content='Delete' onClick={this.onClick}/>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
    );
  }
}

FoodRow.propTypes = {
  food: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  reviews: PropTypes.array.isRequired,
  restaurants: PropTypes.array.isRequired,
};

const FoodRows = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  restaurants: Restaurants.find({}).fetch(),
}))(FoodRow);

export default withRouter(FoodRows);
