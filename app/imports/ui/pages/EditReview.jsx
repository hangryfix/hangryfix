/* eslint-disable */
import React from 'react';
import {
  Container,
  Form,
  Button,
  TextArea,
  Header,
  Grid,
  Rating,
  Loader,
  Image,
  Popup,
  Input
} from 'semantic-ui-react';
import { Reviews, ReviewSchema } from '/imports/api/review/review';
import { Foods } from '/imports/api/food/food';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { withTracker, NavLink } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

/** Renders the Page for adding a document. */
class EditReview extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = {
      image: '', review: '', rating: -1, redirectToHome: false, imageChanged: false, reviewChanged: false,
      ratingChanged: false
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  handleChange(event, type) {
    let s = {};
    s[type] = event.target.value;

    if (type === 'image') {
      s['imageChanged'] = true;
    }
    if (type === 'review') {
      s['reviewChanged'] = true;
    }
    this.setState(s);
  }

  handleChangeRating(e, { rating }) {
    let s = {};
    s['rating'] = rating;
      s['ratingChanged'] = true;

    this.setState(s);
  }

  submit(username, id, reviewKey, review, rating, image) {

    console.log(id + " " + review + " " + rating );
    let docId = id;
    Reviews.update(
        { _id: docId },
        {$set: {
            image: image,
            rating: rating,
            review: review,
          }
        }, this.insertCallback);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      setTimeout(() => {
        this.setState({ error: '', redirectToHome: true });
      }, 100);
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.foodsReady) ? this.renderPage() :
        <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/youraccount' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToHome) {
      return <Redirect to={from}/>;
    }
    let stringURL = this.props.location.pathname;
    let URLarray = stringURL.split('/:');
    let id = parseInt(URLarray[1]);
    let reviewObjArray = this.props.reviews.filter(review => (review.key === id));
    let reviewObj = reviewObjArray[0];
    let foodId = reviewObj.foodId;
    let foodIdInt = parseInt(foodId);
    const foodObjArray = this.props.foods.filter(food => (food.key === foodIdInt));
    const foodObj = foodObjArray[0];

    return (
        <Container className='add-food'>
          <Header as='h1' content='Edit Your Review' textAlign='center'/>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={3} textAlign='center'>
                <Container className='upload-image'>
                  <Image src={(this.state.imageChanged ? this.state.image : reviewObj.image)} fluid/>
                </Container>
                <Popup
                    trigger={
                      <Button
                          icon="upload"
                          label={{
                            basic: true,
                            content: 'Upload Image'
                          }}
                          labelPosition="right"
                      />
                    }
                    content={
                      <div>
                        <Input
                            placeholder='Enter Url...'
                            onChange={(event) => {
                              this.handleChange(event, "image")
                            }}
                        />
                      </div>
                    }
                    on='click'
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Form>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <Header as='h3' content='Item Name'/>
                        <p>{foodObj.name}</p>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Header as='h3' content='Restaurant Name'/>
                        <p>{foodObj.restaurant}</p>
                      </Grid.Column>
                      <Grid.Column width={6} textAlign='center'>
                        <Header as='h3' content='Add A Rating' textAlign='center'/>
                        <Rating icon='heart'
                                defaultRating={reviewObj.rating}
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
                      defaultValue={reviewObj.review}
                      onChange={(event) => {
                        this.handleChange(event, "review")
                      }}
                  />
                  <Form.Group>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Submit'
                        onClick={() => {
                          let review = this.state.reviewChanged ? this.state.review : reviewObj.review;
                          let rating = this.state.ratingChanged ? this.state.rating : reviewObj.rating;
                          let image = this.state.imageChanged ? this.state.image : reviewObj.image;
                          this.submit(this.props.currentUser,  reviewObj._id, foodId, review, rating, image)
                        }}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Cancel'
                        onClick={() => {
                          setTimeout(() => {
                            this.setState({ error: '', redirectToHome: true });
                          }, 100);
                        }}
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
/* eslint-enable */
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
