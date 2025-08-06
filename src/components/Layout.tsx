import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout, Menu } from 'antd';

const { Header, Content } = AntLayout;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/sessions">Sessions</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/exercises">Exercises</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 24 }}>{children}</div>
      </Content>
    </AntLayout>
  );
};

export default Layout;