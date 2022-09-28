import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from "react-palm/tasks";
import {ActionTypes} from 'kepler.gl/actions';
import {handleActions} from 'redux-actions';
import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';
import {hexLayerConfigg} from "../hexLayerConfig1"



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
    [ActionTypes.LAYER_CLICK]: (state, action) => ({
      
    ...state,
    keplerGl: {
      ...state.keplerGl,
      covid: {
         ...state.keplerGl?.covid,
         visState: visStateUpdaters.layerClickUpdater(
          {
            // state,
            datasets:[
              {
                fields: 
                [
                  {name: 'state', format: '', type: 'string'},
                  {name: 'source_lat', format: '', type: 'real'},
                  {name: 'source_lng', format: '', type: 'real'},
                  {name: 'hexagon_id', format: '', type: 'string'}
                ],
                rows: [
                  ['Srinagar',34.0837,74.7973,'823d37fffffffff']
                ]
              }
            ],
          visState: {
            layers: [hexLayerConfigg],
          },
            action:{
            info: {
              label: "Covid srinagar",
              id: "covid"
              }
          }}
         )
      }
    }
    })
  },
  {}
);
const initialState = {};

const reducers = combineReducers({
    keplerGl: keplerReducer,
    app: appReducer
});


// export const store = createStore(
//     reducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// )

export const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));
