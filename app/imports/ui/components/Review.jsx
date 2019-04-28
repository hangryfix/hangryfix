import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, Button, Rating, Icon, Image, Modal, Divider } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Reviews } from '/imports/api/review/review';

class Review extends React.Component {

  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  state = { showModal: false };

  handleDeleteClick() {
    Reviews.remove(this.props.review._id, this.deleteCallback);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  render() {
    const path = `/editReview/:${this.props.review.key}`;
    return (
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ fontSize: '16px' }}>
              <Rating
                  icon='heart'
                  defaultRating={this.props.review.rating}
                  maxRating={5}
                  size='large'
                  disabled
                  style={{ marginRight: '5px' }}/>
              {this.props.review.title}
            </Card.Header>
            <Card.Meta>
              <Icon name="user" style={{ marginRight: '5px', marginTop: '5px' }} />
              {this.props.review.user} says . . .
            </Card.Meta>
            <Divider />
            <Card.Description style={{ marginTop: '12px' }}>{this.props.review.review}</Card.Description>
            <Image
                floated="right"
                style={{ maxWidth: '100%', maxHeight: '100%', width: '120px', height: '120px', paddingTop: '15px' }}
                src={this.props.review.image} />
          </Card.Content>
          <Card.Content extra textAlign="right">
            Last updated: {this.props.review.createdAt.toLocaleDateString('en-US')}
          </Card.Content>
          { Meteor.user() && this.props.review.user === Meteor.user().username ? (
              <Button.Group>
                <Button
                    as={ NavLink }
                    activeClassName="active"
                    exact to={path}
                    key="editReview">
                  <Icon name="edit" /> Edit
                </Button>
                <Modal
                    open={this.state.showModal}
                    size="tiny"
                    trigger={<Button onClick={() => this.setState({ showModal: true })}><Icon name="trash" /> Delete</Button>}>
                  <Modal.Header>Delete Review</Modal.Header>
                  <Modal.Content>Are you sure you want to delete this review?</Modal.Content>
                  <Modal.Actions>
                    <Button compact onClick={() => this.setState({ showModal: false })}><Icon name="remove" /> No</Button>
                    <Button compact onClick={this.handleDeleteClick}>
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Button.Group>
          ) : ''
          }
        </Card>
    );
  }
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default withRouter(Review);
