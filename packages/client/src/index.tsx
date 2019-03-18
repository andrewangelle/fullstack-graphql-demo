export * from './types';
export * from './utils';
export * from './store';
export * from './setupTests'
export * from './components';

import * as React from 'react';
import { render } from 'react-dom';

import { Root } from 'components/';

import 'antd/dist/antd.css'
import './styles/index.css';


render(
  <Root />,
  document.getElementById('root') as HTMLElement
);


