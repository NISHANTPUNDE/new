// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

//read shop information

app.get("/api/store/info",async(req,res)=>{
  let storeInfo=await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  })

  res.status(200).send(storeInfo);
})


app.get("/api/products", async (_req, res) => {
  const countData = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

//read collection data
app.get("/api/collections/count", async (_req, res) => {
  const countData = await shopify.api.rest.CustomCollection.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

//read orders
app.get("/api/orders/all", async (_req, res) => {
  const orderData = await shopify.api.rest.Order.all({
    session: res.locals.shopify.session,
    status:"any"
  });
  res.status(200).send(orderData);
});


app.post("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

 

  const {title,bodyHtml}=_req.body
  
  // const variants = [
  //   { price: 10.99, name: "Small", id: "small-variant" },
  //   { price: 15.99, name: "Medium", id: "medium-variant" },
  //   { price: 20.99, name: "Large", id: "large-variant" },
  // ];

  try {
    await productCreator(res.locals.shopify.session,{title,bodyHtml});
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
