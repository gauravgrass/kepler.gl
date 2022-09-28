import React ,{useEffect, useState} from "react";
import ReactDOM from 'react-dom/client';
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl, {Layer} from "kepler.gl";
import { addDataToMap, toggleFullScreen, onLayerClick } from "kepler.gl/actions";
import useSwr from "swr";
import { pointLayerConfig } from "./pointLayerConfig";
import {hexLayerConfig} from "./hexLayerConfig"
import {hexLayerConfigg} from "./hexLayerConfig1"
import {latLngToCell} from "h3-js";
import {H3Layer, LineLayer} from "kepler.gl/layers";
// import {MapControlFactory} from './map/map-control';
import {connect} from 'react-redux';
import {lineLayerConfig} from './lineLayerConfig';
import {iconLayerConfig} from './iconLayerConfig';
// import {targetIconLayerConfig} from './targetIconLayerConfig';
import {updateMap} from 'kepler.gl/actions'
// import {StyledLayerPanelHeader} from 'kepler.gl/src/components/side-panel/layer-panel/layer-panel-header';
import './Button.css';
import { func } from "prop-types";
import {ActionTypes} from 'kepler.gl/actions';
import {handleActions} from 'redux-actions';

let updateOutside;

const keplerReducer = keplerGlReducer.initialState({
  uiState: {
    activeSidePanel: null,
    currentModal: null,
    mapControls: {
      visibleLayers: {
        show: false
      },
      mapLegend: {
        show: false,
        active: false
      },
      toggle3d: {
        show: false
      },
      splitMap: {
        show: false
      }
    }
  }
});

const appReducer = handleActions(
  {
    // listen on kepler.gl map update action to store a copy of viewport in app state
    [ActionTypes.LAYER_CLICK]: (state, action) => {
      console.log(action.payload.info.object.id);
      // setHexId((hexId) => [...hexIds, hexId]);
      updateOutside(action.payload.info.object.id);
      return {
        ...state,
        viewport: action.payload
      };
    }
  },
  {}
);

const reducers = combineReducers({
  keplerGl: keplerReducer,
  app:appReducer
});

let store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  const [hexIds, setHexId] = useState('');
  useEffect(() => {
    /* Assign update to outside variable */
    updateOutside = setHexId

    /* Unassign when component unmounts */
    return () => updateOutside = null
  })
  console.log('.....................Hex iD iiiiiiiiiiissss',hexIds);
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

function Map() {
  
  // function example(lat, lng) {
  //   return latLngToCell(lat, lng, 2);
  // }

  // console.log(example(26.4499, 74.797371));
  const dispatch = useDispatch();
  const selected = {
    fields: 
    [
      {name: 'state', format: '', type: 'string'},
      {name: 'source_lat', format: '', type: 'real'},
      {name: 'source_lng', format: '', type: 'real'},
      // {name: 'icon', format:'', type:'string'},
      // {name: 'target_lat', format: '', type: 'real'},
      // {name: 'target_lng', format: '', type: 'real'},
      {name: 'hexagon_id', format: '', type: 'string'}
    ],
    rows: [
      // ['Srinagar',34.0837,74.7973,'823d37fffffffff']
    ]
  }
  const moreData ={
    fields: [
      {name: 'state', format: '', type: 'string'},
      {name: 'lat', format: '', type: 'real'},
      {name: 'lng', format: '', type: 'real'},
    ],
    rows: [
      ['Haldwani',29.2183,79.5130]
    ]
  }

  const sampleTripData = {
    fields: [
      {name: 'state', format: '', type: 'string'},
      {name: 'source_lat', format: '', type: 'real'},
      {name: 'source_lng', format: '', type: 'real'},
      {name: 'icon', format:'', type:'string'},
      {name: 'target_lat', format: '', type: 'real'},
      {name: 'target_lng', format: '', type: 'real'},
      {name: 'hexagon_id', format: '', type: 'string'}
    ],
    rows: [
      ['Delhi',28.644800,77.216721,"car", 31.104605, 77.173424,'823da7fffffffff'],
      ['Shimla', 31.104605, 77.173424,"place",28.644800,77.216721,'823d17fffffffff']
    ]
  };

  // const[selectedHex, setSelectedHex] = useState();

  React.useEffect(() => {
    // dispatch(
    //   onLayerClick({
    //     info: {
    //       label: "Covid_19",
    //       id: "covid_19_data",
    //     },
    //     visState: {
    //       layers: [pointLayerConfig,iconLayerConfig ,hexLayerConfig, lineLayerConfig, hexLayerConfigg],
    //   }
    //   })
    // )
    dispatch(addDataToMap({
      datasets:[
        // {
        //   info: {
        //     label: "Covid_19_srinagar",
        //     id: "covid",
        //   },
        //   data: selectedHex
        // },
        {
          info: {
          label: "Covid",
          id: "covid_19"
          },
          data: moreData
        },
        {
          info: {
            label: "Covid_19",
            id: "covid_19_data",
          },
          data: sampleTripData
        },
      ] ,
      option: {
        centerMap: true,
      },
      config: {
        visState: {
          layers: [pointLayerConfig,iconLayerConfig ,hexLayerConfig, lineLayerConfig, hexLayerConfigg],
      }
      }
    }))
    
  });


  return (
    <div>
      {/* <button onClick={() => toggleFullScreen()}>
      click</button> */}
      <KeplerGl
      id="covid"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      width={window.innerWidth}
      height={window.innerHeight}
      appName="Grassdoor"
      version=""
    />
    </div>
    
  );
}


// const mapDispatchToProps=dispatch=>({
  // addToCartHandler:data=>dispatch(addToCart(data))
// })

// export default connect(mapDispatchToProps)(App)

// export default connect(mapDispatchToProps)(App);

// export default App;