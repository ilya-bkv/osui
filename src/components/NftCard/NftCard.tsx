import React from 'react'
import './NftCard.scss'
import { Nft } from '../../types/nft.gen'

type Props = Nft

const NftCard: React.FC<Props> = (props) => {
  return (
    <div className="NftCard">

    </div>
  )
}

export default React.memo(NftCard)
