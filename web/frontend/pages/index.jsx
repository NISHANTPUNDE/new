import {
  Layout,
  Page,
  LegacyCard,
  Box,
  Grid,
  Card,
  Button,
  Thumbnail,
  Collapsible
} from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";
import { NavLink } from "react-router-dom"
import { Variants2 } from "./Varients2";


import { OrderDetails, ProductCard, Cart } from "../components";
import { useEffect, useState } from "react";
import ProductVarient from "./ProductVarient";


export default function HomePage() {
  let fetch = useAuthenticatedFetch();
  let [products, setProducts] = useState([])
  let [collections, setCollections] = useState(0)
  let [orders, setOrders] = useState([])
  let [fulfilled, setFulFilled] = useState(0)
  let [remains, setRemains] = useState(0)
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
  async function fetchCollections() {
    try {

      let request = await fetch("api/collections/count")
      let response = await request.json()

      setCollections(response.count)

    } catch (error) {

      console.log(error)
    }
  }


  async function fetchOrders() {
    try {

      let request = await fetch("/api/orders/all")
      let response = await request.json()

      console.log("orders", response)
      setOrders(response.data.length)
      let fulfillOrders = response.data.filter(item => item.fulfillment_status === 'fulfilled')
      setFulFilled(fulfillOrders.length)
      setRemains(response.data.length - fulfillOrders.length)

    } catch (error) {

      console.log(error)
    }
  }
  console.log(products)
  const [showVariants, setShowVariants] = useState(Array(products.length).fill(false));

  const handleShowVariants = (index) => {
    let newShowVariants = [...showVariants];
    newShowVariants[index] = !newShowVariants[index];
    setShowVariants(newShowVariants);
  };

  useEffect(() => {
    fetchProducts()
    // fetchCollections()
    // fetchOrders()
  }, [])


  return (
    <Page fullWidth>
      <div className="home-section">
        <div className="graphs-section">
          {/* <OrderGraphs />  */}
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Cart title="Total Orders" data={orders.length} orderCard />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Cart title="Total Products" data={products.length} product />
            </Grid.Cell>
          </Grid>
          <br />


        </div>

        <div className="cards-section">

          <Layout fullWidth>
            <ProductCard data={products} />
            {/* <Card title="Fulfilled Order" data={fulfilled} fulfilledCard />
                    <Card title="Remain Order" data={remains}  remainsCard/> */}
            {/* <Card title="Total Collections" data={collections}  collections/>   */}
          </Layout>

        </div>
        <div className="order-details-section">
          {/* <OrderDetails /> */}
        </div>
      </div>
    </Page>
  );
}
