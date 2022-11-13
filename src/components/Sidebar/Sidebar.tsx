import React from 'react'
import { Checkbox, Layout, Menu } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import './Sidebar.less'

const {Sider} = Layout;

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const items = [
  {
    label: 'Status', key: crypto.randomUUID(),
    children:
      [
        {label: <Checkbox onChange={onChange}>Buy Now</Checkbox>, key: crypto.randomUUID()},
        {label: <Checkbox>On Auction</Checkbox>, key: crypto.randomUUID()},
      ]
  },
  {label: 'Price', key: crypto.randomUUID(), children: [{label: 'Inner', key: crypto.randomUUID()}]},
  {label: 'Quantity', key: crypto.randomUUID(), children: [{label: 'Inner', key: crypto.randomUUID()}]},
  {label: 'Collections', key: crypto.randomUUID(), children: [{label: 'Inner', key: crypto.randomUUID()}]},
  {label: 'Chains', key: crypto.randomUUID(), children: [{label: 'Inner', key: crypto.randomUUID()}]},
];

const Sidebar: React.FC = () => {
  return (
    <Sider
      className="Sidebar"
      breakpoint="md"
      collapsible
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{height: '100%', borderRight: 0}}
        items={items}
      />
    </Sider>
  )
}

export default React.memo(Sidebar)