import { Layout, LegacyCard } from '@shopify/polaris'
import React from 'react'

export const Cart = ({ title, data, product, collections, orderCard, fulfilledCard, remainsCard }) => {
  return (
    <>
      {/* <Layout.Section oneThird>
            <LegacyCard title={title} sectioned>
                    {product && data}

                    {collections && data}
                    {orderCard && data}
                    {fulfilledCard && data}
                    {remainsCard && data}
            </LegacyCard>
        </Layout.Section> */}
      <div class="productcard">
        <LegacyCard title={title} sectioned>
          <h3>{product && data}</h3>
          {collections && data}
          {orderCard && data}
          {fulfilledCard && data}
          {remainsCard && data}
        </LegacyCard>
      </div>
    </>
  )
}
