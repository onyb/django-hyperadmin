import React, { Component } from 'react';

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.attributes.value};
    }

    render() {
        let attributes = this.props.attributes;
        attributes.className = attributes.class
        attributes.maxLength = attributes.maxlength;

        delete attributes.maxlength;
        delete attributes.class;

        attributes.value = this.state.value;
        attributes.onChange = (event) => this.setState({value: event.target.value})

        return React.createElement(
            this.props.tag, attributes
        );
    }
}

export default Element;