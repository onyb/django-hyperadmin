import React, { Component } from 'react';

import Fieldset from './fieldset';

class QuestionsAdmin extends Component {
    componentWillMount() {
        this.setState({fieldsets: _Y_.hadmin})
    }

    render() {
        return (
          <div>
            {
                this.state.fieldsets.map(
                    fieldset => (
                        <Fieldset {...fieldset}/>
                    )
                )
            }
          </div>
        )
    }
}

export default QuestionsAdmin;