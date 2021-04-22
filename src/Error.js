import React from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Dang.</h1>
        <h2>{this.props.error}</h2>
      </>
    );
  }
}

export default Error;
