import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', username: '', email: '', password: '', tags: '', error: '' };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { firstName, lastName, username, email, password, tags } = this.state;
    Accounts.createUser({ firstName, lastName, username, email, password, tags }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
      }
    });
  }

  /** Display the signup form. */
  render() {
    const tags = [
      {
        key: 'pizza',
        text: 'pizza',
        value: 'pizza',
      },
      {
        key: 'poke',
        text: 'poke',
        value: 'poke',
      },
      {
        key: 'chinese',
        text: 'chinese',
        value: 'chinese',
      },
      {
        key: 'nachos',
        text: 'nachos',
        value: 'nachos',
      },
      {
        key: 'tacos',
        text: 'tacos',
        value: 'tacos',
      },
    ];
    return (
        <div className='backgroundDef'>
        <Container className='register'>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header inverted as="h2" textAlign="center">
                Register your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='First name'
                                name="firstName"
                                type="string"
                                placeholder='First name'
                                onChange={this.handleChange} />
                    <Form.Input fluid label='Last name'
                                name="lastName"
                                type="string"
                                placeholder='Last name'
                                onChange={this.handleChange}/>
                    <Form.Input
                        label="Username"
                        icon="user"
                        iconPosition="left"
                        name="username"
                        type="string"
                        placeholder="Username (to display)"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                  <Form.Input fluid
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input fluid
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  </Form.Group>
                  <Form.Dropdown fluid multiple search selection
                               className='tagDropdown'
                               label='Favorite Foods'
                               name="tags"
                               options={tags}
                               placeholder='Get started with food tags!'
                               type="object"
                               onChange={this.handleChange}/>
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}
