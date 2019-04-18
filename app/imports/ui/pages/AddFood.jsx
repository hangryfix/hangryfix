import React from 'react';
import { Restaurants } from '/imports/api/restaurant/restaurant';
import { Container, Form, Button, TextArea, Header, Grid, Select, Loader } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


/** Renders the Page for adding a document. */
class AddFood extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
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
   handleClick() {
    alert('File Upload not currently supported.');
   }

  /** On submit, insert the data. */
  submit(data) {
    const { name, quantity, condition } = data;
    Foods.insert({ name, quantity, condition }, this.insertCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {

    let restaurantOptions = this.props.restaurants.map((restaurant) => {
      return {key:restaurant.id, text: restaurant.name, value: restaurant.name};
    });

    return (
        <Container className='add-food'>
          <Header as='h1' content='Add A Food' textAlign='center'/>
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
                      content: 'Upload Image'
                    }}
                    labelPosition="right"
                    onClick = {this.handleClick}
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Form>
                  <Form.Input
                      fluid label='Food Name'
                      placeholder='Food Name'/>
                  <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        label='Food Category'
                        options={restaurantOptions}
                        placeholder='Select a Category'
                    />
                    <Form.Field
                        control={Select}
                        label='Restaurant'
                        options={restaurantOptions}
                        placeholder='Choose a Restaurant'
                    />
                    <Form.Input
                        fluid label='Cost'
                        placeholder='Cost'/>
                  </Form.Group>
                  <Form.Field
                      id='form-textarea-control-opinion'
                      control={TextArea}
                      label='Description'
                      placeholder='Description'
                  />
                  <Form.Group>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Submit'
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
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AddFood);
