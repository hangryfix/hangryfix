import React from 'react';
import { Card, Rating, Image, Button, Icon, Modal, Label, Table, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Review from './Review';
import { Foods } from '/imports/api/food/food';
import { Reviews } from '/imports/api/review/review';

class FoodRowSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getDefaultRating = this.getDefaultRating.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  onClick = () => Foods.remove(this.props.food._id, this.deleteCallback)

  /** Notify the user of the results of the delete. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Food Deleted' });
    }
  }

  getAverageRating(reviews) {
    let total = 0;

    for (let rev of reviews) {
      total += rev.rating;
    }

    return Math.round(total / reviews.length);

  }

  getReviews() {
    let reviewArray = [];
    this.props.reviews.map(review => {
      if (parseInt(review.foodId) === parseInt(this.props.food.key)) {
        reviewArray.push(review);
      }
    });

    console.log(reviewArray);
    return reviewArray;
  }

  getDefaultRating(price) {
    let stars = 0
    if (price < 4) {
      stars = 1;
    } else
      if (price >= 4 && price < 8) {
        stars = 2;
      } else
        if (price >= 8 && price < 12) {
          stars = 3;
        } else
          if (price >= 12 && price < 16) {
            stars = 4;
          } else {
            stars = 5;
          }
    return stars;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {


    let reviews = this.getReviews();
    const averageRating = this.getAverageRating(reviews);

    return (
        <Table.Row style={{ width: '100%' }}>
          {/*Col 1: Image/Name*/}
          <Table.Cell style={{ width: '20%' }}>
            <Header as='h3' textAlign='center' style={{ width: '100%' }}>
              {this.props.food.name}
            </Header>
            <Image floated='left' style={{ width: '100%' }} src={this.props.food.image}/>
          </Table.Cell>

          {/*Col 2: Info*/}
          <Table.Cell style={{ width: '20%' }}>
            <div style={{ width: '100%' }}>
              <Icon name="map marker alternate" style={{ marginRight: '5px' }}/>
              {this.props.food.restaurant}
            </div>
            <div style={{ width: '100%' }}>
              <Icon name="clock" style={{ marginRight: '5px' }}/>
              {this.props.food.hours}
            </div>
            <Icon name="dollar sign"/>
            <Rating size="large" icon="star" defaultRating={this.getDefaultRating(this.props.food.price)} maxRating={5}
                    disabled/>
          </Table.Cell>

          {/*Col 3: Reviews*/}
          <Table.Cell style={{ paddingBottom: '20px', width: '20%' }}>
            {this.props.reviews.length > 0 ? (
                <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
            ) : (
                'No ratings yet.'
            )
            }
            {reviews.length > 0 ? (
                <Modal size='small' trigger={<Button fluid>Show {reviews.length} ratings and reviews</Button>}>
                  <Modal.Header>
                    <Card fluid>
                      <Card.Content>
                        <Image floated='left' style={{ width: '30%' }} src={this.props.food.image}/>
                        <Card.Header style={{ fontSize: '30px' }}>
                          {this.props.food.name}
                        </Card.Header>
                        <Card.Meta style={{ paddingBottom: '30px' }}>
                          {reviews.length > 0 ? (
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
                          <Icon name="clock" style={{ marginRight: '5px' }}/>
                          {this.props.food.hours}
                        </Card.Meta>
                        <Card.Meta style={{ fontSize: '16px', padding: '2px' }}>
                          <Icon name="dollar sign"/>
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
                    {reviews.map((review, index) => <Review
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

          {/*Col 4: tags*/}
          <Table.Cell style={{ width: '40%' }}>
            {this.props.food.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag}
            </Label>)}
          </Table.Cell>

        </Table.Row>
    );
  }
}

FoodRowSearchPage.propTypes = {
  food: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  reviews: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('FoodAdmin');
  const subscription2 = Meteor.subscribe('Foods');
  const subscription3 = Meteor.subscribe('Reviews');

  return {
    foods: Foods.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(FoodRowSearchPage);
