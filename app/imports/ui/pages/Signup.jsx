import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Tags } from '../../api/tag/tag';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', username: '', email: '', password: '', tags: '', error: '', redirectToHome: false };
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
    const { firstName, lastName, username, email, password } = this.state;
    Accounts.createUser({ username, email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToHome: true });
        // browserHistory.push('/youraccount');
      }
    });
    UserInfo.insert({ firstName, lastName, username, email, tags }, this.insertCallback);
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/youraccount' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToHome) {
      return <Redirect to={from}/>;
    }
    let tagOptions = this.props.tags.map((tag) => {
      return {key: tag.id, text: tag.name, value: tag.name};
    });

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
                               options={tagOptions}
                               placeholder='Get started with food tags!'
                               type="array"
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

/** Require an array of Tags documents in the props. */
Signup.propTypes = {
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Tags documents.
  const subscription = Meteor.subscribe('Tags');
  return {
    tags: Tags.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Signup);