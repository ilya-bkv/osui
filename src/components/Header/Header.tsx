import React from 'react'
import './Header.less'
import { Button, Col, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import { ReactComponent as Grid } from '../../assets/icons/grid.svg';
import { ReactComponent as GridSmall } from '../../assets/icons/grid-small.svg';
import { ReactComponent as Dropdown } from '../../assets/icons/dd.svg';
import { ColumnsGridType } from '../../types/ui';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setColumnsGrid, setSideBarOpen } from '../../store/commonStateSlice';

type Props = {}

const {Title} = Typography;
const gridVariants: ColumnsGridType[] = [6, 8, 12]

const Header: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const {columnsGrid, sideBarOpen} = useAppSelector((state) => state.common)

  const handleGridLayout = React.useCallback(
    (event: RadioChangeEvent) => dispatch(setColumnsGrid(event.target.value)
    ), [dispatch])

  const handleToggleMenu = React.useCallback(() => {
    dispatch(setSideBarOpen(!sideBarOpen))
  }, [dispatch, sideBarOpen])

  return (
    <div className="Header">
      <Row align="middle" justify="space-between" className="top-panel">
        <Col span={12}>
          <div className="logo">
            <Title level={2}>OSUI</Title>
          </div>
        </Col>
      </Row>
      <Row align="middle" className="bottom-panel">
        <Col>
          <Button type="ghost" icon={<Dropdown/>} size="large" onClick={handleToggleMenu} className="icon-button"/>
          <Radio.Group value={columnsGrid} onChange={handleGridLayout}>
            {gridVariants.map((val, idx) => (
              <Radio.Button key={idx} value={val}>
                {{
                  6: <Grid/>,
                  8: <GridSmall/>,
                  12: <Grid/>
                }[val]}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(Header)
