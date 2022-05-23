import React from 'react';

import ReactDOM from 'react-dom';

import { InteractiveArea } from './components/interactive-area';
import { PageLayout } from './components/layouts/page-layout';

const rootNode = document.getElementById('root');

ReactDOM.render(
  <PageLayout>
    <InteractiveArea />
  </PageLayout>,

  rootNode
);
