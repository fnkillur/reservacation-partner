import React, {Component} from 'react';
import './Button.scss';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type || 'button',
            className: props.className || 'btn basic',
            value: props.value || '확인',
        }
    }

    render() {
        return (
            <div className={'button-cover'}>
                <button type={this.state.type} className={this.state.className}>{this.state.value}</button>
            </div>
        );
    }
}

export default Button;