import React, {Component} from 'react';
import './App.scss';
import InputBox from "./components/InputBox";
import Button from "./components/Button";
import DaumPostcode from "./components/DaumPostcode";

class App extends Component {
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

        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    render() {
        return (
            <div className={'app'}>
                <header className={'header'}>
                    <h1>제주도예약 - For Partner</h1>
                </header>
                <form>
                    <InputBox placeholder={'상호명입력'}/>
                    <InputBox placeholder={'전화번호입력'} type={'tel'}/>
                    <InputBox placeholder={'성함'}/>
                    <InputBox placeholder={'상호명입력'}/>
                    <DaumPostcode onComplete={this.handleAddress}/>
                    <Button type={'submit'} value={'등록'}/>
                </form>
            </div>
        );
    }
}

export default App;
