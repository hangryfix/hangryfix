import React from 'react';
import { Container, Header, Radio, Rating } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class SearchSidebar extends React.Component {
  render() {
    const spacing = { paddingTop: '10px' };
    return (
        <div className='search-sidebar'>
          <Header as='h2' content='Filters'/>
          <Container>
            <Radio
                toggle label='Search Open Restaurants Only'
                style={spacing}
            />
            <Header as='h3' content='Rating'/>
            <Rating
                icon='heart'
                defaultRating={1}
                maxRating={5}
                size='massive'
            />
            <Header as='h3' content='Price'/>
            <Rating
                icon='star'
                defaultRating={1}
                maxRating={5}
                size='massive'
            />
          </Container>
        </div>
    );
  }
}

export default SearchSidebar;
