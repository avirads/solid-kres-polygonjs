import { render } from 'solid-js/web';
import { Selo } from "krestianstvo";
import App from './App.jsx'

render(() => (
    <Selo
        nodeID={"instance_name"}
        seloID={"world_name"}
        component={App}
        reflectorHost={"http://localhost:3001"}
    />

), document.getElementById('root'));