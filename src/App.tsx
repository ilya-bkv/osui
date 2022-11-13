import React from 'react';
import './App.less';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import List from './components/List';
import Header from './components/Header';

const { Content } = Layout;
const App: React.FC = () => {

  return (
    <Layout className="wrapper">
      <Header/>
      <Layout>
        <Sidebar/>
        <Layout style={{padding: '0 24px 24px'}}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <List/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
};

export default App;
