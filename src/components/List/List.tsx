import React from 'react'
import axios from 'axios';
import { Nft } from '../../types/nft.gen';
import { Button, Card, Typography, Row, Col } from 'antd';
import notFoundImg from '../../assets/img404.webp'
import { ColumnsGridType } from '../../types/ui'
import './List.less'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const API_KEY = 'ia9jmNMBVFbOjJt0UZhx6UcKJPUK8o7w'
const BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTsForCollection/`;
const COLLECTION = '0x892848074ddeA461A15f337250Da3ce55580CA85';

const {Meta} = Card;
const {Title, Text} = Typography;

const List: React.FC = () => {
  const { columnsGrid } = useAppSelector((state) => state.ui)
  const [nfts, setNfts] = React.useState<Nft[]>([])
  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = notFoundImg;
  }
  // TODO: filter Incumbant or Human
  const get = async () => {
    await axios.get(BASE_URL, {
      params: {
        contractAddress: COLLECTION,
        limit: 40,
        tokenUriTimeoutInMs: 2000,
        withMetadata: true
      }
    })
      .then((response) => {
        console.log('!!! response:', response)
        setNfts(response.data.nfts)
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="List">
      <Row gutter={[16, 16]}>
      {nfts.map((item) => (
        <Col span={columnsGrid ?? 8} key={item.id.tokenId}>
          {/*// @ts-ignore*/}
          {item.metadata?.attributes[1].value}
          <Card
            hoverable
            className="nft-card"
            cover={<img onError={imageOnErrorHandler} alt={item.metadata?.name} src={item.media[0].gateway}/>}
          >
            <Meta
              title={
                <Title level={5} style={{marginBottom: 0}}>
                  {item.metadata?.name}
                </Title>
              }
              description={
                <>
                  <Title level={4} style={{marginBottom: 0}}>
                    {item.contractMetadata?.openSea.floorPrice} ETH
                  </Title>
                  <Text type="secondary">
                    {item?.contractMetadata?.openSea.collectionName}
                  </Text>
                </>
              }
            />
          </Card>
        </Col>
      ))}
      </Row>
      <Button type="primary" onClick={get}>Test</Button>
    </div>
  )
}

export default React.memo(List)
