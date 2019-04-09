import React from 'react';
import { Container, Form, Button, TextArea, Header, Grid, Select } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';

const restaurantOptions = [
  { key: '1', text: 'Da Spot', value: 'daspot' },
  { key: '2', text: 'Dominos', value: 'dominos' },
];

const typeOptions = [
  { key: '1', text: 'Chicken', value: 'chicken' },
  { key: '2', text: 'Sandwich', value: 'Sandwich' },
];

/** Renders the Page for adding a document. */
class AddFood extends React.Component {
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
                      content: 'Upload Image',
                    }}
                    labelPosition="right"
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Form>
                  <Form.Input
                      fluid label='Food Name'
                      placeholder='Food Name'/>
                  <Form.Group widths='equal'>
                    <Form.Field control={Select} label='Food Category' options={typeOptions}
                                placeholder='Select a Category'/>
                    <Form.Field control={Select} label='Restaurant' options={restaurantOptions}
                                placeholder='Choose a Restaurant'/>
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

export default AddFood;
