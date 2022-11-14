import React from 'react'
import { Checkbox, Layout, Menu } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppSelector } from '../../hooks/redux';
import './Sidebar.less'
import { useDispatch } from 'react-redux';
import { setFilters } from '../../store/commonStateSlice';

const {Sider} = Layout;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const {sideBarOpen, filters} = useAppSelector((state) => state.common)

  const onChange = React.useCallback((event: CheckboxChangeEvent) => {
    dispatch(setFilters({[`${event.target.name}`]: event.target.checked}))
  }, [dispatch])

  const items = [
    {
      label: 'Status', key: 1,
      children:
        [
          {
            mode: 'inline',
            label: <Checkbox
              onChange={onChange}
              checked={filters['Human']}
              name="Human">Species: Human</Checkbox>
          },
          {
            mode: 'inline',
            label:
              <Checkbox onChange={onChange}
                        checked={filters['Hacker']}
                        name="Hacker">
                Talent: Hacker</Checkbox>
          },
        ]
    },
    {label: 'Price', key: crypto.randomUUID()},
    {label: 'Quantity', key: crypto.randomUUID()},
    {label: 'Collections', key: crypto.randomUUID()},
    {label: 'Chains', key: crypto.randomUUID()},
  ];
  return (
    <Sider
      className="Sidebar"
      trigger={null}
      collapsedWidth={0}
      collapsible
      collapsed={!sideBarOpen}
    >
      <Menu
        mode="inline"
        items={items}
        defaultOpenKeys={['1']}
        style={{height: '100%', borderRight: 0}}
      />
    </Sider>
  )
}

export default React.memo(Sidebar)
