import React from 'react';
import { Container, Form, Button, TextArea, Header, Grid, Rating, Loader } from 'semantic-ui-react';
import { Reviews, ReviewSchema } from '/imports/api/review/review';
import { Foods } from '/imports/api/food/food';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { withTracker, NavLink } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class EditReview extends React.Component {


  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = { review: '', rating: -1 };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  handleChange(event, type) {
    let s = {};
    s[type] = event.target.value;
    this.setState(s);
  }

  handleChangeRating(e, { rating }) {
    let s = {};
    s['rating'] = rating;
    this.setState(s);
  }

  submit(username, id) {
    Reviews.insert({
      review: this.state.review,
      rating: this.state.rating,
      foodId: id,
      createdAt: Date(),
      user: username,
    }, this.insertCallback);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.foodsReady) ? this.renderPage() :
        <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    let stringURL = this.props.location.pathname;
    let URLarray = stringURL.split('/:');
    let id = URLarray[1];
    let reviewObj = this.props.reviews.filter(review => (review._id === id));
    reviewObj = reviewObj[0];
    const foodObj = this.props.reviews.filter(food => (food._id === reviewObj.foodId));

    return (
        <Container className='add-food'>
          <Header as='h1' content='Write A Review' textAlign='center'/>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={3} textAlign='center'>
                <Container className='upload-image'>
                  <p>Add Image</p>
                </Container>
                <Button
                    icon="upload"
                    label={{
                      basic: true,
                      content: 'Upload Image',
                    }}
                    labelPosition="right"
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Form>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <Header as='h3' content='Item Name'/>
                        <p>{ foodObj.name }</p>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Header as='h3' content='Restaurant Name'/>
                        <p>{ foodObj.restaurant }</p>
                      </Grid.Column>
                      <Grid.Column width={6} textAlign='center'>
                        <Header as='h3' content='Add A Rating' textAlign='center'/>
                        <Rating icon='heart'
                                defaultRating={1}
                                maxRating={5}
                                size='huge'
                                name='rating'
                                onRate={this.handleChangeRating}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form.Field
                      id='form-textarea-control-opinion'
                      control={TextArea}
                      label='Review'
                      placeholder='Type your review...'
                      onChange={(event) => {
                        this.handleChange(event, "review")
                      }}
                  />
                  <Form.Group>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Submit'
                        onClick={ () => {
                          this.submit(this.props.currentUser, id)
                        } }
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Cancel'
                    />
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

EditReview.propTypes = {
  foods: PropTypes.array.isRequired,
  foodsReady: PropTypes.bool.isRequired,
  reviews: PropTypes.array.isRequired,
  reviewsReady: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  // Get access to Stuff documents.
  const foodSubscription = Meteor.subscribe('Foods');
  const reviewSubscription = Meteor.subscribe('Reviews');

  return {
    foods: Foods.find({}).fetch(),
    foodsReady: foodSubscription.ready(),
    reviews: Reviews.find({}).fetch(),
    reviewsReady: reviewSubscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(EditReview);
