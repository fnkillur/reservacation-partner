import React, {Component} from 'react';
import './App.scss';
import InputBox from "./components/InputBox";
import Button from "./components/Button";
import DaumPostcode from "./components/DaumPostcode";
import Map from "./components/Map";
import ReactFullpage from '@fullpage/react-fullpage';

class App extends Component {
    constructor(props) {
        super(props);
        this.myRef = null;
        this.state = {
            address: '',
            showMe: false
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
        this.setState({address: fullAddress, showMe: !this.state.showMe});
    };

    onChange = (e) => {
        console.log(e);
    };

    toggleShow = () => {
        this.setState({showMe: !this.state.showMe});
    };

    render() {
        return (
            <div id={'app'} className={'app'}>
                <header className={'header'}>
                    <h1>제주도예약 - For Partner</h1>
                </header>

                <article ref={ref => {
                    this.myRef = ref
                }} className={'description'}>
                    <ReactFullpage
                        render={({state, fullpageApi}) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    <section className={'section step1'}>

                                    </section>
                                    <section className={'section step2'}>

                                    </section>
                                    <section className={'section step3'}>
                                        <form className={'formFields'}>
                                            {
                                                !this.state.address || <Map address={this.state.address}/>
                                            }
                                            {
                                                this.state.showMe ? <DaumPostcode onComplete={this.handleAddress}/> :
                                                    <div className={'address-field'} onClick={this.toggleShow}>주소입력</div>
                                            }
                                            <InputBox onChange={this.onChange} name={'company'} placeholder={'상호명입력'}/>
                                            <InputBox onChange={this.onChange} name={'tel'} placeholder={'전화번호입력'}
                                                      type={'tel'}/>
                                            <InputBox onChange={this.onChange} name={'name'} placeholder={'성함'}/>
                                            <Button type={'submit'} value={'등록'}/>
                                        </form>
                                    </section>
                                </ReactFullpage.Wrapper>
                            );
                        }}
                    />

                </article>
            </div>
        );
    }
}

export default App;
