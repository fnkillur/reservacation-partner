import React, {Component} from 'react';
import './InputBox.scss';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type || 'text',
            placeholder: props.placeholder || '',
            className: props.className || 'input basic',
            label: props.label || '',
        }
    }

    render() {
        return (
            <div className={'tag-cover'}>
                <input className={this.state.className} type={this.state.type} placeholder={this.state.placeholder}/>
            </div>
        );
    }

}

export default InputBox;