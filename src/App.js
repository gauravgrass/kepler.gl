import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl, {Layer} from "kepler.gl";
import { addDataToMap, toggleFullScreen } from "kepler.gl/actions";
import useSwr from "swr";
import { pointLayerConfig } from "./pointLayerConfig";
import {hexLayerConfig} from "./hexLayerConfig"
import {latLngToCell} from "h3-js";
import {clusterLayerConfig} from "./clusterLayerConfig"
import {H3Layer, LineLayer} from "kepler.gl/layers";
// import {MapControlFactory} from './map/map-control';
import {connect} from 'react-redux';
import {lineLayerConfig} from './lineLayerConfig';
import {iconLayerConfig} from './iconLayerConfig';
// import {targetIconLayerConfig} from './targetIconLayerConfig';
import {updateMap} from 'kepler.gl/actions'
// import {StyledLayerPanelHeader} from 'kepler.gl/src/components/side-panel/layer-panel/layer-panel-header';
import './Button.css';

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
const reducers = combineReducers({
  keplerGl: keplerReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));


export default function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

function Map() {
  const dispatch = useDispatch();
  // const { data } = useSwr("covid", async () => {
  //   const response = await fetch(
  //     "https://json.extendsclass.com/bin/7a09b5ee4f37"
  //   );
  //   const data = await response.json();
  //   console.log(data, response);
  //   return data;
  // });

  // function example(lat, lng) {
  //   const res = 2;
  //   return latLngToCell(lat, lng, res);
  // }

  // console.log(example(28.644800, 77.216721));
  // console.log(example(31.104605, 77.173424));

  const sampleTripData = {
    // fields: [
    //   {name: 'country', format: '', type: 'string'},
    //   {name: 'state', format: '', type: 'string'},
    //   {name: 'point_latitude', format: '', type: 'real'},
    //   {name: 'point_logitude', format: '', type: 'real'},
    //   {name: 'hexagon_id', format: '', type: 'string'}
    // ],
    // rows: [
    //   ['India','Delhi',28.644800,77.216721,'823da7fffffffff'],
    //   ['India', 'Shimla', 31.104605, 77.173424,'823d17fffffffff']
    // ],
    fields: [
      // {name: 'country', format: '', type: 'string'},
      {name: 'from_state', format: '', type: 'string'},
      {name: 'source_lat', format: '', type: 'real'},
      {name: 'source_lng', format: '', type: 'real'},
      {name: 'icon', format:'', type:'string'},
      {name: 'to_state', format: '', type: 'string'},
      {name: 'target_lat', format: '', type: 'real'},
      {name: 'target_lng', format: '', type: 'real'},
      {name: 'hexagon_id', format: '', type: 'string'},
      {name: 'lat', format: '', type: 'real'},
      {name: 'lng', format: '', type: 'real'},
    ],
    rows: [
      ['Delhi',28.644800,77.216721,"car",'Shimla', 31.104605, 77.173424,'823da7fffffffff',30.3165, 78.0322],
      ['Shimla', 31.104605, 77.173424,"place",'Delhi',28.644800,77.216721,'823d17fffffffff']
    ]
  };

  const mapStyles = [
    {
      id: 'my_dark_map',
      label: 'Dark Streets 9',
      url: 'mapbox://styles/mapbox/dark-v9',
      icon: `https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/icons/svg-icons.json`,
      // layerGroups: [
      //   {
      //     slug: 'label',
      //     filter: ({id}) => id.match(/(?=(label|place-|poi-))/),
      //     defaultVisibility: true
      //   },
      // ]
    }
  ];

  React.useEffect(() => {
    // console.log(data);
    if (sampleTripData) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "Covid_19",
              id: "covid_19_data"
            },
            data: sampleTripData,
          },
          option: {
            centerMap: false,
          },
          config: {
            visState: {
              layers: [iconLayerConfig ,hexLayerConfig, lineLayerConfig,pointLayerConfig],
          }
          }
        })
      );
    }
  }, []);

  return (
    <div>
      <button onClick={() => toggleFullScreen()}>
      click</button>
      <KeplerGl
      id="covid"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      width={window.innerWidth}
      height={window.innerHeight}
      appName="Grassdoor"
      version=""
      // mapStyles={mapStyles}
      // mapStylesReplaceDefault={true} 
    />
    </div>
    
  );
}
