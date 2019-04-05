import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import {  Header, Container,  Menu,  Grid,  Icon,  Dropdown,  List,  Image,  Input,  Button,  Segment, Divider, Select } from 'semantic-ui-react';

import MainImage from './docs/lb-lava-bowl.jpg'


class LargePic extends React.Component {
  render() {
    const searchStyle = {
      width: '80%',
      color: '#045604'
    }

    return (
        <Container>
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Column>
            <Image class='medium' src={ MainImage }/>
          </Grid.Column>
          <Grid.Column>
            <Input
                class='color-primary-0'
                action={{ color: 'green', content: 'Search' }}
                actionPosition='right'
                icon='search'
                iconPosition='left'
                placeholder='Hangry??? What are you craving?'
                style={ searchStyle }/>
          </Grid.Column>
        </Grid>
        </Container>
    );
  }
}

class FoodCards extends React.Component {
  render() {
    return (
        <Header>Food Cards</Header>
    );
  }
}

class AboutUs extends React.Component {
  render() {
    return (
        <Header>About Us</Header>
    );
  }
}

class CenterComponent extends React.Component {

  render() {
    return (
        <div>
          <LargePic/>
          <FoodCards/>
          <AboutUs/>
        </div>
    );
  }
}

ReactDOM.render(
<CenterComponent/>
    , document.getElementById('root'));