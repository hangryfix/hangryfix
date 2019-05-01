import React from 'react';
import { Form, Select, Header, Button, Loader } from 'semantic-ui-react';
import { Restaurants, RestaurantSchema } from '/imports/api/restaurant/restaurant';
import { Keys } from '/imports/api/keys/keys';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class AddRestaurantForm extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: 'street, city, zip',
      hours: ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
    };
    this.handleChangeDropdownRestaurant = this.handleChangeDropdownRestaurant.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.submitNewRestaurant = this.submitNewRestaurant.bind(this);
  }

  submitNewRestaurant() {
    let hoursComplete = true;
    this.state.hours.map(hours => {
      if (hours === '') {
        hoursComplete = false;
        console.log("hours-empty");
      }
      let tokenizeHours = hours.split(':');
      if (!(parseInt(tokenizeHours[0]) > 0 && parseInt(tokenizeHours[0]) < 13)) {
        hoursComplete = false;
      }
      if (tokenizeHours.length > 1) {
        let tokenizeMinutes = tokenizeHours[1].split(' ');
        if (!(parseInt(tokenizeMinutes[0]) === 0 || parseInt(tokenizeMinutes[0]) === 30)) {
          hoursComplete = false;
        }
        if (!(tokenizeMinutes[1] === 'am' || (tokenizeMinutes[1]) === 'pm')) {
          hoursComplete = false;
        }
      }
    });

    let addressComplete = true;
    let tokenizeAddress = this.state.address.split(',');
    tokenizeAddress.map(token => {
      if (token === 'street' || token === 'city' || token === 'zip') {
        addressComplete = false;
      }
    });

    let nameComplete = this.state.name !== null;

    if (nameComplete && addressComplete && hoursComplete) {
      Restaurants.insert({
        key: this.props.keys[0].restaurants,
        name: this.state.name,
        address: this.state.address,
        hours: this.state.hours
      });
      let restaurantKey = this.props.keys[0].restaurants + 1;
      Keys.update({ _id: this.props.keys[0]._id }, { $set: { restaurants: restaurantKey } });
      alert("successfully added a new restaurant");
    } else {
      alert("Form Not Completed");
    }
  }

  handleChangeText(event, name) {
    let s = {};
    let tokenizedAddress = this.state.address.split(',');
    if (name === 'name') {
      this.state.name = event.target.value;
    } else
      if (name === 'street') {
        tokenizedAddress[0] = event.target.value;
      } else
        if (name === 'city') {
          tokenizedAddress[1] = ` ${event.target.value}`;
        } else
          if (name === 'zip') {
            tokenizedAddress[2] = ` ${event.target.value}`;
          }

    this.state.address = tokenizedAddress.join(',');
    this.setState(s);
  }

  handleChangeDropdownRestaurant(e, { value, name }) {

    if (value < 10) {
      value = '0' + value;
    }
    let s = {};
    let index = -1;
    let tokenizedArray = name.split('-');
    console.log(tokenizedArray);

    switch (tokenizedArray[0]) {
      case 'monday':
        index = 0;
        break;
      case 'tuesday':
        index = 2;
        break;
      case 'wednesday':
        index = 4;
        break;
      case 'thursday':
        index = 6;
        break;
      case 'friday':
        index = 8;
        break;
      case 'saturday':
        index = 10;
        break;
      case 'sunday':
        index = 12;
        break;
    }

    if (tokenizedArray[1] === 'close') {
      index++;
    }

    let emptyString = false;
    let currentString = this.state.hours[index];
    if (currentString == null) {
      emptyString = !emptyString;
    }

    switch (tokenizedArray[2]) {
      case 'hours':
        if (emptyString) {
          currentString = `${value}:00 nn`;
        } else {
          let splitString = currentString.split(':');
          splitString[0] = value;
          currentString = splitString.join(':');
        }
        break;
      case 'minutes':
        if (emptyString) {
          currentString = `00:${value} nn`;

        } else {
          let splitString = currentString.split(':');
          splitString[1] = value;
          currentString = splitString.join(':');
        }
        break;
      case 'am':
        if (emptyString) {
          currentString = `00:00 ${value}`;
        } else {
          let splitString = currentString.split(' ');
          splitString[1] = value;
          currentString = splitString.join(' ');
        }
        break;
    }

    this.state.hours[index] = currentString;
    console.log(currentString);
    this.setState(s);
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i);
    }

    let hourOptions = hours.map((hour) => {
      return { key: hour, text: hour, value: hour };
    });

    let minutes = [];
    for (let i = 0; i <= 30; i += 30) {
      minutes.push(i);
    }

    let minuteOptions = minutes.map((min) => {
      return { key: min, text: min, value: min };
    });

    const ampmOptions = [
      { key: 0, text: 'am', value: 'am' },
      { key: 1, text: 'pm', value: 'pm' }
    ];

    return (
        <div className='add-restaurant-form'>
          <Form>
            <Form.Field
                size='small'>
              <Form.Input
                  label='Restaurant Name'
                  placeholder='name...'
                  name='name'
                  onChange={(event) => {
                    this.handleChangeText(event, 'name')
                  }}
              />
              <Form.Group>
                <Form.Input
                    label='Street Address'
                    placeholder='Address...'
                    name='street'
                    width={8}
                    onChange={(event) => {
                      this.handleChangeText(event, 'street')
                    }}
                />
                <Form.Input
                    label='City'
                    placeholder='City...'
                    name='city'
                    width={4}
                    onChange={(event) => {
                      this.handleChangeText(event, 'city')
                    }}
                />
                <Form.Input
                    label='Zip Code'
                    placeholder='zip code...'
                    name='zip'
                    width={3}
                    onChange={(event) => {
                      this.handleChangeText(event, 'zip')
                    }}
                />
              </Form.Group>
              <Form.Field>
                <Header
                    as="h5"
                    content="Monday"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>Open</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='monday-open-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='monday-open-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    placeholder="am/pm"
                    name='monday-open-am-pm'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>Close</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='monday-close-hours'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='monday-close-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    name='monday-close-am-pm'
                    placeholder="am/pm"
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
              </Form.Group>
              <Form.Field>
                <Header
                    as="h5"
                    content="Tuesday"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>Open</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='tuesday-open-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='tuesday-open-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    placeholder="am/pm"
                    name='tuesday-open-am-pm'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>Close</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='tuesday-close-hours'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='tuesday-close-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    name='tuesday-close-am-pm'
                    placeholder="am/pm"
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
              </Form.Group>
              <Form.Field>
                <Header
                    as="h5"
                    content="Wednesday"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>Open</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='wednesday-open-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='wednesday-open-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    placeholder="am/pm"
                    name='wednesday-open-am-pm'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>Close</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='wednesday-close-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='wednesday-close-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    name='wednesday-close-am-pm'
                    placeholder="am/pm"
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
              </Form.Group>
              <Form.Field>
                <Header
                    as="h5"
                    content="Thursday"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>Open</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='thursday-open-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='thursday-open-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    placeholder="am/pm"
                    name='thursday-open-am-pm'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>Close</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='thursday-close-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='thursday-close-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    name='thursday-close-am-pm'
                    placeholder="am/pm"
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
              </Form.Group>
              <Form.Field>
                <Header
                    as="h5"
                    content="Friday"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>Open</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='friday-open-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='friday-open-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    placeholder="am/pm"
                    name='friday-open-am-pm'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>Close</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='friday-close-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='friday-close-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    name='friday-close-am-pm'
                    placeholder="am/pm"
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
              </Form.Group>
              <Form.Field>
                <Header
                    as="h5"
                    content="Saturday"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>Open</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='saturday-open-hours'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='saturday-open-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    placeholder="am/pm"
                    name='saturday-open-am-pm'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>Close</Form.Field>
                <Form.Field
                    control={Select}
                    placeholder='hr'
                    options={hourOptions}
                    name='saturday-close-hours'
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
                <Form.Field>
                  <Header
                      as="h3"
                      content=":"
                      style={{ padding: '5px 0 0 0 ' }}
                  />
                </Form.Field>
                <Form.Field
                    control={Select}
                    options={minuteOptions}
                    placeholder='min'
                    name='saturday-close-minutes'
                    width={2}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />

                <Form.Field
                    control={Select}
                    options={ampmOptions}
                    name='saturday-close-am-pm'
                    placeholder="am/pm"
                    width={3}
                    fluid
                    onChange={this.handleChangeDropdownRestaurant}
                />
              </Form.Group>
              <Form.Field/>
              <Header
                  as="h5"
                  content="Sunday"
              />
            </Form.Field>
            <Form.Group>
              <Form.Field>Open</Form.Field>
              <Form.Field
                  control={Select}
                  placeholder='hr'
                  options={hourOptions}
                  name='sunday-open-hours'
                  width={2}
                  fluid
                  onChange={this.handleChangeDropdownRestaurant}
              />
              <Form.Field>
                <Header
                    as="h3"
                    content=":"
                    style={{ padding: '5px 0 0 0 ' }}
                />
              </Form.Field>
              <Form.Field
                  control={Select}
                  options={minuteOptions}
                  placeholder='min'
                  name='sunday-open-minutes'
                  width={2}
                  fluid
                  onChange={this.handleChangeDropdownRestaurant}
              />

              <Form.Field
                  control={Select}
                  options={ampmOptions}
                  placeholder="am/pm"
                  name='sunday-open-am-pm'
                  width={3}
                  fluid
                  onChange={this.handleChangeDropdownRestaurant}
              />
              <Form.Field>Close</Form.Field>
              <Form.Field
                  control={Select}
                  placeholder='hr'
                  options={hourOptions}
                  name='sunday-close-hours'
                  width={2}
                  fluid
                  onChange={this.handleChangeDropdownRestaurant}
              />
              <Form.Field>
                <Header
                    as="h3"
                    content=":"
                    style={{ padding: '5px 0 0 0 ' }}
                />
              </Form.Field>
              <Form.Field
                  control={Select}
                  options={minuteOptions}
                  placeholder='min'
                  name='sunday-close-minutes'
                  width={2}
                  fluid
                  onChange={this.handleChangeDropdownRestaurant}
              />
              <Form.Field
                  control={Select}
                  options={ampmOptions}
                  placeholder="am/pm"
                  name='sunday-close-am-pm'
                  width={3}
                  fluid
                  onChange={this.handleChangeDropdownRestaurant}
              />
            </Form.Group>
            <Form.Field
                id='form-button-control-public'
                control={Button}
                content='Submit'
                onClick={this.submitNewRestaurant}
            />
          </Form>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AddRestaurantForm.propTypes = {
  keys: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {

  // Get access to Stuff documents.
  const keySubscription = Meteor.subscribe('Keys');

  return {
    keys: Keys.find({}).fetch(),
    ready: keySubscription.ready(),
  };
})(AddRestaurantForm);

