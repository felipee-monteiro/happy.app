import { BrowserRouter, Switch, Route} from 'react-router-dom';
import React from 'react';
import Landing from './pages/landing';
import OrfanateMap from './pages/orfanates';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import 'leaflet/dist/leaflet.css';


function Routes() {
    return (
         <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Landing}/>
              <Route path="/app" component={OrfanateMap} />

              <Route path="/orphanages/create" component={CreateOrphanage} />              
              <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
         </BrowserRouter>
    );
};

export default Routes;