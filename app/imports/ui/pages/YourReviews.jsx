import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Sidebar, Button,
  Segment, Input, Menu, Dropdown, Label, Rating, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class YourReviews extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })

  handleShowClick = () => this.setState({ visible: true })

  handleFilterHide = () => this.setState({ visible: false })

  renderPage() {
    const { visible } = this.state;

    const minutes = [
      { value: '00', text: '00' },
      { value: '05', text: '05' },
      { value: '10', text: '10' },
      { value: '15', text: '15' },
      { value: '20', text: '20' },
      { value: '25', text: '25' },
      { value: '30', text: '30' },
      { value: '35', text: '35' },
      { value: '40', text: '40' },
      { value: '45', text: '45' },
      { value: '50', text: '50' },
      { value: '55', text: '55' },
    ];

    const hours = [
      { value: 1, text: '1' },
      { value: 2, text: '2' },
      { value: 3, text: '3' },
      { value: 4, text: '4' },
      { value: 5, text: '5' },
      { value: 6, text: '6' },
      { value: 7, text: '7' },
      { value: 8, text: '8' },
      { value: 9, text: '9' },
      { value: 10, text: '10' },
      { value: 11, text: '11' },
      { value: 12, text: '12' },
    ];

    const categories = [
      { value: 'Tacos', text: 'Tacos' },
      { value: 'Pizza', text: 'Pizza' },
      { value: 'Noodles', text: 'Noodles' },
      { value: 'Sushi', text: 'Sushi' },
      { value: 'Poke', text: 'Poke' },
    ];

    return (
        <div style={{ backgroundColor: '#338D33' }}>
          <Header inverted as='h1' textAlign='center' position='centered'>Your Foods</Header>
          <Sidebar.Pushable as={Segment} basic>
            <Sidebar
                as={Menu}
                animation='scale down'
                icon='labeled'
                onHide={this.handleFilterHide}
                vertical
                visible={visible}
                width='very wide'
            >
              <Menu.Item>
                <Label attached='top right' size='big'>Food Category</Label>
                <Dropdown fluid placeholder='Category' multiple selection options={categories} />
              </Menu.Item>
              <Menu.Item>
                <Label attached='top right' size='big'>Location</Label>
                <Input placeholder='Location' />
              </Menu.Item>
              <Menu.Item>
                <Label attached='top right' size='big'>Price Range</Label>
                <Input fluid type='text'>
                  <Label size='large' basic>$</Label>
                  <input placeholder='Min' />
                  <Label size='large' basic>to</Label>
                  <input placeholder='Max'/>
                </Input>
              </Menu.Item>
              <Menu.Item>
                <Label attached='top right' size='big'>Times</Label>
                <Input fluid type='text'>
                  <Label size='large' basic>From</Label>
                  <Dropdown fluid clearable placeholder='hour' search selection options={hours}/>
                  <Label size='large' basic>:</Label>
                  <Dropdown fluid clearable placeholder='minute' search selection options={minutes}/>
                  <Dropdown fluid clearable placeholder='AM/PM' search selection
                            options={[{ text: 'AM', value: 'AM' }, { text: 'PM', value: 'PM' }]} />
                </Input>
                <Input fluid type='text'>
                  <Label size='large' basic>To</Label>
                  <Dropdown fluid clearable placeholder='hour' search selection options={hours}/>
                  <Label size='large' basic>:</Label>
                  <Dropdown fluid clearable placeholder='minute' search selection options={minutes}/>
                  <Dropdown fluid clearable placeholder='AM/PM' search selection
                            options={[{ text: 'AM', value: 'AM' }, { text: 'PM', value: 'PM' }]} />
                </Input>
              </Menu.Item>
              <Menu.Item>
                <Label size='big' attached='top right'>Average Ratings</Label>
                <Rating icon="heart" position='left' defaultRating={1} maxRating={5} size='huge' />
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Button size='large' disabled={visible} onClick={this.handleShowClick}>
                Show Filter
              </Button>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
    );
  }
}

YourReviews.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(YourReviews);
