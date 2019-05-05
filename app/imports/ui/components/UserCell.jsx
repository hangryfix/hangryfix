import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class UserCell extends React.Component {

  render() {

    return (
        <div>
          <Header as='h4'>
            {this.props.foods.name}
          </Header>
          <Header as='h5'>
            {this.props.foods.restaurant}
          </Header>
        </div>
    );
  }
}

UserCell.propTypes = {
  foods: PropTypes.array.isRequired,
};

export default withRouter(UserCell);
