import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom/client';
import keplerGlReducer from 'kepler.gl/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import { Provider, useDispatch } from 'react-redux';
import KeplerGl, { Layer } from 'kepler.gl';
import { addDataToMap, toggleFullScreen, onLayerClick, ActionTypes } from 'kepler.gl/actions';
// import useSwr from 'swr';
import { latLngToCell } from 'h3-js';
import { H3Layer, LineLayer } from 'kepler.gl/layers';
// import {MapControlFactory} from './map/map-control';
import { connect } from 'react-redux';
// import { lineLayerConfig } from './lineLayerConfig';
// import { iconLayerConfig } from './iconLayerConfig';
// import {targetIconLayerConfig} from './targetIconLayerConfig';
import { updateMap } from 'kepler.gl/actions';
// import {StyledLayerPanelHeader} from 'kepler.gl/src/components/side-panel/layer-panel/layer-panel-header';
// import './Button.css';
import { func } from 'prop-types';
import { handleActions } from 'redux-actions';
// import { hexLayerConfigg } from './hexLayerConfig1';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { hexLayerConfig } from './hexLayerConfig';
import { hexLayerConfigg } from './hexLayerConfig1';
// import { pointLayerConfig } from './pointLayerConfig';

let updateOutside;
let check = {};

const selected = {
  fields:
  [
    { name: 'state', format: '', type: 'string' },
    // {name: 'source_lat', format: '', type: 'real'},
    // {name: 'source_lng', format: '', type: 'real'},
    // {name: 'icon', format:'', type:'string'},
    // {name: 'target_lat', format: '', type: 'real'},
    // {name: 'target_lng', format: '', type: 'real'},
    { name: 'hexagon_id', format: '', type: 'string' }
  ],
  rows: [
    // ['Srinagar','823d37fffffffff']
  ]
};

const moreData = {
  fields: [
    { name: 'state', format: '', type: 'string' },
    { name: 'lat', format: '', type: 'real' },
    { name: 'lng', format: '', type: 'real' },
  ],
  rows: [
    ['Haldwani', 29.2183, 79.5130]
  ]
};

const sampleTripData = {
  fields: [
    { name: 'state', format: '', type: 'string' },
    { name: 'source_lat', format: '', type: 'real' },
    { name: 'source_lng', format: '', type: 'real' },
    { name: 'icon', format: '', type: 'string' },
    { name: 'target_lat', format: '', type: 'real' },
    { name: 'target_lng', format: '', type: 'real' },
    { name: 'hexagon_id', format: '', type: 'string' }
  ],
  rows: [
    ['Delhi', 28.644800, 77.216721, 'car', 31.104605, 77.173424, '823da7fffffffff'],
    ['Shimla', 31.104605, 77.173424, 'place', 28.644800, 77.216721, '823d17fffffffff']
  ]
};

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
      // console.log(action.payload.info.object.id);
      // console.log(check);
      console.log(sampleTripData);
      // setHexId((hexId) => [...hexIds, hexId]);
      if (action.payload.info.object.id in check) {
        selected.rows = [];
        console.log(selected);
        console.log(sampleTripData);
        sampleTripData.rows = [sampleTripData.rows[0], ['Shimla', 31.104605, 77.173424, 'place', 28.644800, 77.216721, '823d17fffffffff']];
        check = {};
        updateOutside('');
      } else {
        updateOutside(action.payload.info.object.id);
        console.log(selected);
        console.log();
      }
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
  app: appReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  const [hexIds, setHexId] = useState('');
  useEffect(() => {
    /* Assign update to outside variable */
    updateOutside = setHexId;

    /* Unassign when component unmounts */
    return () => updateOutside = null;
  }, [hexIds]);
  // console.log('.....................Hex iD iiiiiiiiiiissss',hexIds);
  return (
    <Provider store={store}>
      <Map hexIds={hexIds} />
    </Provider>
  );
}

function Map(props) {
  // console.log(props);
  const { hexIds } = props;
  // function example(lat, lng) {
  //   return latLngToCell(lat, lng, 2);
  // }

  // console.log(example(26.4499, 74.797371));
  // console.log('here inside Map');
  const dispatch = useDispatch();

  if (hexIds) {
    selected.rows = [['Shimla', hexIds]];
    console.log(selected);
    sampleTripData.rows = [sampleTripData.rows[0]];
    // const temp = hex
    // check = {...check, ...check[hexIds] = 1};
    check[hexIds] = 1;
    // console.log(check);
    // updateOutside('');
  }
  console.log('Here after state update');
  console.log(sampleTripData);
  // console.log(selected);
  // console.log(selected);
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
      datasets: [
        {
          info: {
            label: 'Covid_19_srinagar',
            id: 'covid',
          },
          data: selected
        },
        {
          info: {
            label: 'Covid',
            id: 'covid_19'
          },
          data: moreData
        },
        {
          info: {
            label: 'Covid_19',
            id: 'covid_19_data',
          },
          data: sampleTripData
        },
      ],
      option: {
        centerMap: true,
      },
      config: {
        visState: {
          // layers: [pointLayerConfig, iconLayerConfig, hexLayerConfig, lineLayerConfig, hexLayerConfigg],
          layers: [hexLayerConfigg,hexLayerConfig],
        }
      }
    }));
  });

  console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
  return (
    <div style={{ position: 'absolute', width: '58%', height: '90%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            id="covid"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            width={width}
            height={height}
            appName="Grassdoor"
            version=""
          />
        )}
      </AutoSizer>
    </div>
  );
}

// const mapDispatchToProps=dispatch=>({
// addToCartHandler:data=>dispatch(addToCart(data))
// })

// export default connect(mapDispatchToProps)(App)

// export default connect(mapDispatchToProps)(App);

// export default App;
