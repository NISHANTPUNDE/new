import React from 'react'
import { Card, DataTable, Thumbnail, TextStyle, Page, Layout } from '@shopify/polaris'
import { useAuthenticatedFetch } from "../hooks";
import { useEffect, useState } from "react";
const OrderDetail = ({ orderData }) => {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    let fetch = useAuthenticatedFetch();
    useEffect(() => {
        fetchOrders()
        fetchProducts()
    }, [])
    async function fetchProducts() {
        try {
            let request = await fetch("api/products")
            let response = await request.json()
            console.log(response)
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function fetchOrders() {
        try {
            let request = await fetch("/api/orders")
            let response = await request.json()
            setOrders(response.data)
            console.log("orders:", response)
        } catch (error) {

            console.log(error)
        }
    }

    console.log("order", orders)
    const order = orders.map((item, index) => {
        console.log(item?.line_items[0]?.product_id)
        return item?.line_items[0]?.product_id
    })
    // console.log("11", order)

    // console.log("products", products)
    var src1 = [];
    // var src2 = [];
    var src2 = src1.reverse();
    console.log("src1", src1)
    console.log("src2", src2)
    const src = products.map(product => {
        const hasProductInOrder = orders.some(order => order.line_items.some(item => item.product_id === product.id));
        if (hasProductInOrder) {
            src1.push(product.image.src);
        } else {
            return '0';
        }
    });


    // console.log("src1", src1);

    const rows = orders.map((item, index) => {
        return [

            <Thumbnail
                key={index}
                source={src2[index] || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'}
                alt={item.image?.alt || "image"}
            />,
            <TextStyle key={index} variation="strong">{item.line_items[0].title}</TextStyle>,
            <TextStyle key={index} variation="positive">$ {item.total_price}</TextStyle>,
            <TextStyle key={index} variation="positive"> {item?.line_items[0]?.variant_title}</TextStyle>,

            // <Button
            //     key={index}
            //     onClick={() => item.variants.length > 1 && handleShowVariants(index)} >
            //     Show Variants
            // </Button>,
            // <Collapsible key={index} open={showVariants[index]} >
            //     <Variants
            //         images={item.images}
            //         variants={item.variants}
            //         updateVariant={updateVariant}
            //         ProductID={item.id}
            //         isUpdating={isUpdating}
            //     />
            // </Collapsible>,
        ];
    });
    return (
        <>
            <Layout sectioned>
                <Card>
                    <div style={{ width: "90vw", overflowY: 'auto', scrollBehavior: "smooth" }}>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'text',
                                'text'
                            ]}
                            headings={[
                                'Image',
                                'Product Name',
                                'Price',
                                'varients'
                            ]}
                            rows={rows}
                        />
                    </div>
                </Card>
            </Layout>
        </>
    )
}

export default OrderDetail