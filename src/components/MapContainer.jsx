/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
} from 'google-maps-react';
import PropTypes from 'prop-types';
import main from '../assets/css/main.css';

const mapStyles = {
  width: '100%',
  height: '400px',
};

/**
 * @class MapContainer
 * @returns {HTMLElement} Google maps
 */
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or the shows the infoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the infoWindow to the selected place upon a marker
  };

  /**
   * @param {object} props
   * @param {object} marker
   * @param {object} e
   * @returns {HTMLElement} info window
   */
  onMarkerClick = (props, marker, e) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  /**
   * @param {object} props
   * @returns {state} close
   */
  onClose = (props) => {
    const { showingInfoWindow } = this.state;
    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  /**
   * @method render
   * @returns {HTMLElement} map
   */
  render() {
    const { google, longitude, latitude } = this.props;
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state;
    return (
      <div className={main.map}>
        <Map
          google={google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: latitude,
            lng: longitude,
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name="Kenyatta International Convention Centre"
          />
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>

    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,

};

MapContainer.defaultProps = {
  latitude: 6.5244,
  longitude: 3.3792,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCjW4nSpjzeITCEi-_p-8zth1A9RmCyPwE',
})(MapContainer);
