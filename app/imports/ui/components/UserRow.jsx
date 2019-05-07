import React from 'react';
import { Card, Rating, Button, Modal, Label, Table, Header, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'underscore';
import Review from './Review';
import FoodRow from '../components/FoodRowAdminPage';


class UserRow extends React.Component {
  render() {

    let averageRating = '';

    if (this.props.reviews) {
      averageRating =
          Math.round((_.reduce(this.props.reviews, function (memo, review) { return memo + review.rating; }, 0))
              / (this.props.reviews.length));
    }

    return (
        <Table.Row>
          {/* Col 1: User */}
          <Table.Cell style={{ width: '20%' }}>
            <Header as='h3' textAlign='left'>
              {this.props.userInfo.firstName} {this.props.userInfo.lastName}
            </Header>
            <Header as='h5' textAlign='left'>
              {this.props.userInfo.username}
            </Header>
            <Header as='h5' textAlign='left'>
              {this.props.userInfo.email}
            </Header>
          </Table.Cell>

          {/* Col 2: Reviews */}
            <Table.Cell style={{ paddingBottom: '30px', width: '30%' }}>
              {this.props.reviews.length > 0 ? (
                  <Rating size="huge" icon="heart" defaultRating={averageRating} maxRating={5} disabled/>
              ) : (
                  'No ratings yet.'
              )
              }
              {this.props.reviews.length > 0 ? (
                  /* eslint-disable-next-line */
                  <Modal size='small' trigger={<Button fluid>Show {this.props.reviews.length} ratings and reviews</Button>}>
                    <Modal.Header>
                      <Header as='h1'>
                        {this.props.userInfo.username} says...
                      </Header>
                    </Modal.Header>
                    <Modal.Content scrolling>
                      <Grid>
                        <Grid.Row>
                      {this.props.reviews.map((review, index) => <Review
                          key={index}
                          review={review}
                      />)}
                        </Grid.Row>
                      </Grid>
                    </Modal.Content>
                  </Modal>
              ) : (
                  <Card.Header style={{ fontSize: '18px' }}>No reviews yet.</Card.Header>
              )
              }
            </Table.Cell>

          {/* Col 3: Foods */}
          <Table.Cell style={{ paddingBottom: '30px', width: '30%' }}>

            {this.props.userFoods.length > 0 ? (
                <Modal size='small' trigger={<Button fluid>Show {this.props.userFoods.length} foods </Button>}>
                  <Modal.Header>
                    <Header as='h1'>
                      {this.props.userInfo.username} added these foods...
                    </Header>
                  </Modal.Header>
                  <Modal.Content scrolling>
                    <Table>
                      {/* eslint-disable */}
                    {this.props.userFoods.map((food, index) => <FoodRow
                      key={index}
                      food={food}
                      reviews={this.props.reviews.filter(review => (review.foodId == food.key))}
                  />)}
                      {/* eslint-enable */}
                    </Table>
                  </Modal.Content>
                </Modal>

            ) : (
                <Card.Header style={{ fontSize: '18px' }}>No foods added yet.</Card.Header>
            )
            }
          </Table.Cell>

          {/* Col 4: tags */}
          <Table.Cell style={{ width: '30%' }}>
            {this.props.userInfo.tags.map((tag, index) => <Label tag
                                                             style={{ backgroundColor: '#338D33', color: 'white' }}
                                                             key={index}>
              {tag}
            </Label>)}
          </Table.Cell>

        </Table.Row>
    );
  }
}

UserRow.propTypes = {
  foods: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  userInfo: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  userFoods: PropTypes.array.isRequired,
};

const UserRows = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',

}))(UserRow);

export default withRouter(UserRows);
