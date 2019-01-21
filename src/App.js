import React, {Component} from 'react';
import './App.scss';
import InputBox from "./components/InputBox";
import Button from "./components/Button";
import DaumPostcode from "./components/DaumPostcode";
import Map from "./components/Map";
import ReactFullpage from '@fullpage/react-fullpage';
import coverImage from './asset/jeju-cover.jpg';
import reportImage from './asset/report.svg';
import mapImage from './asset/placeholder.svg';
import networkImage from './asset/networking.svg';
import * as partnerApi from './services/partner.service';

class App extends Component {
    constructor(props) {
        super(props);
        this.myRef = null;
        this.state = {
            address: '',
            detail_address: '',
            latitude: '',
            longitude: '',
            email: '',
            sms: '',
            imgSrc: '',
            ceo_name: '',
            store_name: '',
            store_description: '',
            showMe: false,
        };
        this.postAction = partnerApi.postAction;
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
        this.setState({[e.target.name]: e.target.value});
    };

    toggleShow = () => {
        this.setState({showMe: !this.state.showMe, address: ''});
    };

    submit = (e) => {
        e.preventDefault();
        for (let state in this.state) {
            if (!['imgSrc', 'store_description', 'store_name'].includes(state) && this.state[state] === '') {
                alert('필드값을 전부 입력해주세요');
                return;
            }
        }
        this.postAction(this.state)
            .then(res => {
                alert('성공적으로 등록되었습니다. \n 빠른시일내에 연락 드리겠습니다.');
            })
    };


    render() {
        return (
            <div id={'app'} className={'app'}>
                <header className={'header'}>
                    <h1>Reservacation For Partner</h1>
                </header>

                <article ref={ref => {
                    this.myRef = ref
                }} className={'description'}>
                    <ReactFullpage
                        render={({state, fullpageApi}) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    <section className={'section step1'}>
                                        <img width={'100%'} src={coverImage}/>
                                    </section>
                                    <section className={'section step2'}>
                                        <div className={'image-field'}>
                                            <article>
                                                <img width={'100%'} src={mapImage}/>
                                                <div className={'description'}>
                                                    위치를 찾을 필요없이
                                                    <br/>
                                                    Reservacation에서
                                                    <br/>
                                                    위치제공
                                                </div>
                                            </article>
                                            <article>
                                                <img width={'100%'} src={networkImage}/>
                                                <div className={'description'}>
                                                    많은 사용자를 보유한
                                                    <br/>
                                                    Reservacation의
                                                    <br/>
                                                    네트워크
                                                </div>
                                            </article>
                                            <article>
                                                <img width={'100%'} src={reportImage}/>
                                                <div className={'description'}>
                                                    보고서를 통해
                                                    <br/>
                                                    현재 매출 조회
                                                    <br/>
                                                    잠재고객 재방문고객 확인
                                                </div>
                                            </article>
                                        </div>
                                    </section>
                                    <section className={'section step3'}>
                                        <article className={'infoSection'}>
                                            {
                                                !this.state.address ||
                                                <Map changePosition={position => this.setState({longitude: position[0].x, latitude: position[0].y})}
                                                     address={this.state.address}/>
                                            }
                                            <form className={`formFields ${this.state.address || 'alone'}`} onSubmit={this.submit}>
                                                {
                                                    this.state.showMe ? <DaumPostcode onComplete={this.handleAddress}/> :
                                                        <div className={'address-field'} onClick={this.toggleShow}>{this.state.address || '주소입력'}</div>
                                                }
                                                {
                                                    !this.state.address ||
                                                    <InputBox onChange={this.onChange} name={'detail_address'} placeholder={'상세주소 입력'}/>
                                                }
                                                <InputBox onChange={this.onChange} name={'store_name'} placeholder={'상호명'}/>
                                                <InputBox onChange={this.onChange} name={'ceo_name'} placeholder={'성함'}/>
                                                <InputBox onChange={this.onChange} name={'email'} placeholder={'이메일'}/>
                                                <InputBox onChange={this.onChange} name={'sms'} placeholder={'핸드폰번호'}/>
                                                <Button type={'submit'} value={'등록'}/>
                                            </form>
                                            <section className={'footer'}>
                                                Copyright © Reservacation Corp. All rights reserved.
                                            </section>
                                        </article>
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
