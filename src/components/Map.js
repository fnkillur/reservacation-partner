/* eslint-disable no-useless-constructor,no-loop-func */
/*global daum*/

import React, {Component} from 'react';

let map;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address,
            isMobile: window.innerWidth <= 400
        };
    }

    renderMarket = (position) => {
        //positions에는 데이터 넣는부분. DB에서 가지고오면 됨.
        let positions = [
            {
                latlng: new daum.maps.LatLng(position[0].y, position[0].x)
            }
        ];

        for (let i = 0; i < positions.length; i ++) {
            let marker = new daum.maps.Marker({
                map: map,
                position: positions[i].latlng
            });

            let overlay = new daum.maps.CustomOverlay({
                map: map,
                position: marker.getPosition()
            });

            (function(marker, overlay) {
                daum.maps.event.addListener(marker, 'click', function() {
                    overlay.setMap(map);
                });
            })(marker, overlay);
        }
    };

    showPosition = (position, status) => {
        let latitude = position[0].y;
        let longitude = position[0].x;
        this.props.changePosition(position);
        let mapContainer = document.getElementById('map'),
            mapOption = {
                center: new daum.maps.LatLng(latitude, longitude),
                level: 3
            };

        map = new daum.maps.Map(mapContainer, mapOption);

        this.renderMarket(position);
    };


    componentDidMount() {
        var geocoder = new daum.maps.services.Geocoder();

        geocoder.addressSearch(this.state.address, this.showPosition);
    };


    render() {
        return (
            <div>
                <div id="map" style={{ height: this.state.isMobile ? '150px' : '355px', width: this.state.isMobile ? '100%' : '480px'}}/>
            </div>
        )
    };
}

export default Map;