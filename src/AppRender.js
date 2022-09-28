import React ,{useState, useEffect} from "react";
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App'
function AppRender(){
    const[hexId,setHexId] = useState('');
    useEffect(()=>{
        console.log('redered UseEffect')
    },[])
console.log(hexId);
// console.log(store.getState());
    return(
        // <Provider store={store}>
            <App setHexId={setHexId} />
        // </Provider>  
    )
}

export default AppRender;