import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { LayoutCustom } from './commons/LayoutCustom'
import { Layout } from 'antd';


function App() {
  return (
      <Layout>
        <LayoutCustom/>
      </Layout>
  );
}

export default App;
