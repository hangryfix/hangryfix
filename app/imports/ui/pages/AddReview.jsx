import React from 'react';
import { Container, Form, Button, TextArea, Header, Grid, Rating } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders the Page for adding a document. */
class AddReview extends React.Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
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
                        <p>Bacon Cheeseburger</p>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Header as='h3' content='Restaurant Name'/>
                        <p>Mc Donald&rsquo;s</p>
                      </Grid.Column>
                      <Grid.Column width={6} textAlign='center'>
                        <Header as='h3' content='Add A Rating' textAlign='center'/>
                        <Rating icon='heart' defaultRating={1} maxRating={5} size='huge'/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form.Field
                      id='form-textarea-control-opinion'
                      control={TextArea}
                      label='Review'
                      placeholder='Type your review...'
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

export default AddReview;
