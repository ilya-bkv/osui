import React from 'react'
import axios from 'axios';
import { Nft } from '../../types/nft.gen';
import { Button, Card, Typography, Row, Col, Skeleton } from 'antd';
import notFoundImg from '../../assets/img404.webp'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setNftList } from '../../store/commonStateSlice';
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg';
import TimeAgo from 'react-timeago'
import './List.less'

const API_KEY = 'ia9jmNMBVFbOjJt0UZhx6UcKJPUK8o7w'
const QUERY_METHOD = 'getNFTsForCollection'
const BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/${QUERY_METHOD}/`;
const COLLECTION = '0x892848074ddeA461A15f337250Da3ce55580CA85';

const {Meta} = Card;
const {Title, Text} = Typography;

const List: React.FC = () => {
  const dispatch = useAppDispatch()
  const {columnsGrid, filters, nftList} = useAppSelector((state) => state.common)
  const [filteredNfts, setFilteredNfts] = React.useState<Nft[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [lastUpdateTime, setLastUpdateTime] = React.useState<Date | undefined>(undefined)

  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = notFoundImg;
  }

  const get = async (initial?: boolean) => {
    setLoading(true)
    await axios.get(BASE_URL, {
      params: {
        contractAddress: COLLECTION,
        limit: 140,
        tokenUriTimeoutInMs: 2000,
        withMetadata: true
      }
    })
      .then((response) => {
        setLoading(false)
        dispatch(setNftList(response.data.nfts))
        if (initial) setFilteredNfts(response.data.nfts)
        const currentTime = new Date()
        setLastUpdateTime(currentTime)
        console.log('NFT List:', response)
      })
      .catch((error) => {
        setLoading(false)
        alert('Loading error')
        console.log(error)
      });
  }

  const handleRefresh = React.useCallback(() => {
    setLoading(true)
    get(false).then(() => {
      if (Object.keys(filters).length > 0) {
      } else {
        setFilteredNfts(nftList)
        console.log('!!! nftList:', nftList)
      }
      setLoading(false)
    })
  }, [get, loading])

  React.useEffect(() => {
    if (filters.Human || filters.Hacker) {
      const value = filters.Human ? 'Human' : 'Hacker'
      const filtered = nftList.filter(card => card.metadata.attributes.some(type => type.value === value))
      setFilteredNfts(filtered);
    } else {
      setFilteredNfts(nftList)
    }
  }, [filters])

  React.useEffect(() => {
    get( true)
    return
  }, [])
  return (
    <div className="List">
      {filteredNfts.length > 1 && (
        <Row className="update">
          <div className="action">
            <Button type="ghost" disabled={loading} icon={<Refresh/>} size="large" onClick={handleRefresh} className="icon-button"/>
            <Typography.Title level={5} type="secondary" style={{margin: 0}}>
              {loading ? 'Loading items...' : <TimeAgo date={lastUpdateTime as Date}/> }
            </Typography.Title>
          </div>
          {!loading && <Typography.Title level={5} style={{margin: 0}}>{filteredNfts.length} items</Typography.Title>}
        </Row>
      )}
      <Row gutter={[16, 16]}>
        {loading && Array(columnsGrid * 2).fill(0).map((item, idx) =>
          <Col span={columnsGrid ?? 8} key={idx}>
            <Card
              key={item}
              className="nft-card"
              cover={<Skeleton.Image active style={{width: '100%', height: 'unset', aspectRatio: '3/4'}}/>}
            >
              <Skeleton title={{width: '60%'}} paragraph={{rows: 1, width: '100%', style: {margin: '14px 0 0',}}} active/>
            </Card>
          </Col>
        )}
        {!loading && filteredNfts.map((item) => (
          <Col span={columnsGrid ?? 8} key={item.id.tokenId}>
            <Card
              hoverable
              className="nft-card"
              cover={<img onError={imageOnErrorHandler} alt={item.metadata.name} src={item.media[0].gateway}/>}
            >
              <Meta
                title={
                  <Title level={5} style={{marginBottom: 0}}>
                    {item.metadata.name}
                  </Title>
                }
                description={
                  <>
                    <Title level={4} style={{marginBottom: 0}}>
                      {item.contractMetadata?.openSea.floorPrice} ETH
                    </Title>
                    <Text type="secondary">
                      <small>
                        {item.metadata.attributes[0].value} / {item.metadata.attributes[1].value}
                      </small>
                    </Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      {/*<Button type="primary" onClick={get}>Test</Button>*/}
    </div>
  )
}

export default React.memo(List)
