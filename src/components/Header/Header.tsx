import React from 'react'
import './Header.less'
import { Col, Layout, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import { ReactComponent as Grid } from '../../assets/icons/grid.svg';
import { ReactComponent as GridSmall } from '../../assets/icons/grid-small.svg';
import { ColumnsGridType } from '../../types/ui';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setColumnsGrid } from '../../store/uiStateSlice';

type Props = {}

const {Title} = Typography;
const gridVariants: ColumnsGridType[] = [6 , 8 , 12]

const Header: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { columnsGrid } = useAppSelector((state) => state.ui)
  const handleGridLayout = (event: RadioChangeEvent) => dispatch(setColumnsGrid(event.target.value))

  return (
    <div className="Header">
      <Row align="middle" justify="space-between">
        <Col span={12}>
          <div className="logo">
            <Title level={2}>OSUI</Title>
          </div>
        </Col>
        <Col span={12}>
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
