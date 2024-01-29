import { Layout, LegacyCard } from '@shopify/polaris'
import React from 'react'

export const OrderDetails = () => {
  return (
    <> 
    <Layout>
        <Layout.Section>
            <LegacyCard title="Order Details" sectioned>
                <p className='text-medium'>
                    Order Details
                </p>
            </LegacyCard>
        </Layout.Section>
    </Layout>
    
    </>
  )
}

