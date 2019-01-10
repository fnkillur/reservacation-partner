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
            name: props.name || ''
        }
    }

    handleChange = (e) => {
        this.props.onChange(e);
    };

    render() {
        return (
            <div className={'tag-cover'}>
                <input onChange={this.handleChange} name={this.state.name} className={this.state.className} type={this.state.type} placeholder={this.state.placeholder}/>
            </div>
        );
    }

}

export default InputBox;