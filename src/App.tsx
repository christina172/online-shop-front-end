import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import {store} from "store";

import Layout from 'components/layout.component';
import ErrorBoundaryComp from "components/error-boundary.component";
import AppRoutes from "App.routes";


function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
          <Layout>
            <AppRoutes/>
          </Layout>
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;
