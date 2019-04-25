import React from 'react';
import { Restaurants } from '/imports/api/restaurant/restaurant';
import { Keys } from '/imports/api/keys/keys';
import { Foods, FoodSchema } from '/imports/api/food/food';
import { Tags } from '/imports/api/tag/tag';
import { Container, Form, Button, TextArea, Header, Grid, Select, Loader, Popup, Input, Image } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import AddRestaurantForm from '../components/AddRestaurantForm';

/** Renders the Page for adding a document. */
class AddFood extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = { key: '', image: '', name: '', restaurant: '', category: '', tags: [], price: 0, description: '' };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      let foodKey = this.props.keys[0].foods + 1;
      Keys.update({ _id: this.props.keys[0]._id }, { $set: { foods: foodKey } });
    }
  }

  handleChange(event, type) {
    let s = {};
    s[type] = event.target.value;
    this.setState(s);
  }

  handleChangeDropdown(e, { value, name }) {
    let s = {};
    s[name] = value;
    this.setState(s);
  }

  handleClick() {
    alert('File Upload not currently supported.');
  }

  /** On submit, insert the data. */
  submit(username, foodKey) {
    Foods.insert({
      key: foodKey,
      image: this.state.image,
      name: this.state.name,
      restaurant: this.state.restaurant,
      tags: this.state.tags,
      timestamp: Date(),
      price: this.state.price,
      category: this.state.category,
      description: this.state.description,
      owner: username,
    }, this.insertCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.restaurantsReady && this.props.tagsReady && this.props.categoriesReady && this.props.keysReady) ? this.renderPage() :
        <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {

    let restaurantOptions = this.props.restaurants.map((restaurant) => {
      return { key: restaurant.id, text: restaurant.name, value: restaurant.name };
    });

    let tags = _.where(this.props.tags, { type: 'ingredient' });
    let tagOptions = tags.map((tag) => {
      return { key: tag.id, text: tag.name, value: tag.name };
    });

    let categories = _.where(this.props.tags, { type: 'cuisine' });
    let categoryOptions = categories.map((category) => {
      return { key: category.id, text: category.name, value: category.name };
    });

    return (
        <Container className='add-food'>
          <Header as='h1' content='Add A Food' textAlign='center'/>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={3} textAlign='center'>
                <Container className='upload-image'>
                  <Image src={this.state.image} fluid/>
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
                  <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        label='Food Name'
                        placeholder='Food Name'
                        name='name'
                        onChange={(event) => {
                          this.handleChange(event, "name")
                        }}
                    />
                    <Form.Field
                        control={Select}
                        label='Restaurant'
                        options={restaurantOptions}
                        placeholder='Choose a Restaurant'
                        name='restaurant'
                        onChange={this.handleChangeDropdown}
                    />
                    <Form.Field>
                      <Popup
                          trigger={<Button color='green' icon='flask' content='Add A Restaurant'/>}
                          content={<AddRestaurantForm/>}
                          position='bottom right'
                          label='Your Restaurant Missing'
                          on='click'
                          style={{ margin: '10px 0 0 0 ' }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        label='Category'
                        options={categoryOptions}
                        placeholder='Choose a Category...'
                        name='category'
                        search={true}
                        onChange={this.handleChangeDropdown}
                    />
                    <Form.Field>
                      <Form.Field
                          control={Select}
                          label='Tags'
                          options={tagOptions}
                          placeholder='Select Tags...'
                          name='tags'
                          multiple={true}
                          search={true}
                          onChange={this.handleChangeDropdown}
                      />
                    </Form.Field>

                    <Form.Input
                        fluid
                        label='Price'
                        placeholder='Price'
                        name='price'
                        onChange={(event) => {
                          this.handleChange(event, "price")
                        }}
                    />
                  </Form.Group>
                  <Form.Field
                      id='form-textarea-control-opinion'
                      control={TextArea}
                      label='Description'
                      placeholder='Description'
                      name='description'
                      onChange={(event) => {
                        this.handleChange(event, "description")
                      }}
                  />
                  <Form.Group>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Submit'
                        onClick={() => {
                          this.submit(this.props.currentUser, this.props.keys[0].foods)
                        }}
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

/** Require an array of Stuff documents in the props. */
AddFood.propTypes = {
  restaurants: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  restaurantsReady: PropTypes.bool.isRequired,
  tagsReady: PropTypes.bool.isRequired,
  categoriesReady: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  // Get access to Stuff documents.
  const restaurantSubscription = Meteor.subscribe('Restaurant');
  const tagSubscription = Meteor.subscribe('Tag');
  const categorySubscription = Meteor.subscribe('Category');
  const keySubscription = Meteor.subscribe('Keys');

  return {
    restaurants: Restaurants.find({}).fetch(),
    tags: Tags.find({}).fetch(),
    categories: Tags.find({}).fetch(),
    keys: Keys.find({}).fetch(),
    restaurantsReady: restaurantSubscription.ready(),
    tagsReady: tagSubscription.ready(),
    categoriesReady: categorySubscription.ready(),
    keysReady: keySubscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(AddFood);
