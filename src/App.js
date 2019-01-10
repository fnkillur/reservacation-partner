import React, {Component} from 'react';
import './App.scss';
import InputBox from "./components/InputBox";
import Button from "./components/Button";
import DaumPostcode from "./components/DaumPostcode";
import Map from "./components/Map";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

    handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState({address: fullAddress});
        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    onChange = (e) => {
        console.log(e);
    };

    render() {
        return (
            <div className={'app'}>
                <header className={'header'}>
                    <h1>제주도예약 - For Partner</h1>
                </header>
                <form>
                    <Map address={this.state.address}/>
                    <DaumPostcode onComplete={this.handleAddress}/>
                    <InputBox onChange={this.onChange} name={'company'} placeholder={'상호명입력'}/>
                    <InputBox onChange={this.onChange} name={'tel'} placeholder={'전화번호입력'} type={'tel'}/>
                    <InputBox name={'name'} placeholder={'성함'}/>
                    <Button type={'submit'} value={'등록'}/>
                </form>
            </div>
        );
    }
}

export default App;
