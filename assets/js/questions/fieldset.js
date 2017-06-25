import React, { Component } from 'react';

import Field from './field';

class Fieldset extends Component {
    render() {
        return (
          <fieldset className={`module aligned ${this.props.classes}`}>
             {this.props.name ? <h2>this.props.name</h2>: null}
             {this.props.description ? <div className="description">{this.props.description}</div>:null}

             <div className="form-row">
                {
                    this.props.fields.map(
                        field => <Field {...field} />
                    )
                }
             </div>
          </fieldset>
        )
    }
}

export default Fieldset;