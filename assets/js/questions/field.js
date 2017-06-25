import React, { Component } from 'react';

import Element from './element';

class Field extends Component {
    render() {
        return (
          <div className={`field-box ${this.props.field.name}`}>
          {this.props.field.label}

          {
            this.props.is_readonly ?
                <div className="readonly">this.props.contents</div> :
                this.props.hyperscript.map(
                    element => (
                        <Element {...element} />
                    )
                )
          }
          </div>
        )
    }
}

export default Field;