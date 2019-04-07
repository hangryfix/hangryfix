import React from 'react';
import { Container, Form, Button, TextArea, Header, Grid } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders the Page for adding a document. */
class AddFood extends React.Component {

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
                      content: 'Upload Image'
                    }}
                    labelPosition="right"
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Form>
                  <Form.Field
                      id='form-textarea-control-opinion'
                      control={TextArea}
                      label='Opinion'
                      placeholder='Opinion'
                  />
                  <Form.Field
                      id='form-button-control-public'
                      control={Button}
                      content='Confirm'
                      label='Label with htmlFor'
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default AddFood;
