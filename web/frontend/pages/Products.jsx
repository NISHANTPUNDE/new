import { useEffect, useState } from "react";
import { Button, Card, Collapsible, FormLayout, Stack, TextField } from "@shopify/polaris";
import {  useNavigate } from "@shopify/app-bridge-react";
import ProductVarient from "../pages/ProductVarient";
import { useAuthenticatedFetch } from "../hooks";

const Products = () => {
  const [showVarient, setShowVarient] = useState(false);
  const navigate = useNavigate();
  let fetch=useAuthenticatedFetch()

  const [preview, setPreview] = useState('https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png');
  const [selectedFile, setSelectedFile] = useState();
  const [productData, setProductData] = useState({
    title: "",
    description: ""
    // Add other product properties as needed
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) return;

    var tem = URL.createObjectURL(selectedFile);
    setPreview(tem);

    return () => URL.revokeObjectURL(tem);
  }, [selectedFile]);

  // const createProduct = async () => {
  //   try {
  //     const accessToken = "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";
  //     const shop = "amitstoreapp-dev";
  //     const apiUrl = "/api/products/create";

  //     const formData = new FormData();
  //     formData.append("product[title]", productData.title);
  //     formData.append("product[body_html]", productData.description);
  //     // Add other product properties to the formData as needed

  //     // if (selectedFile) {
  //     //   formData.append("product[images][][attachment]", selectedFile);
  //     // }

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "X-Shopify-Access-Token": accessToken,
  //         "Content-Type": "application/json",
            
  //       },
  //       body: formData
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("Product created successfully:", responseData.product);
  //       // Add any additional logic or state updates as needed
  //     } else {
  //       console.error("Failed to create product:", response.statusText);
  //       // Handle error scenarios
  //     }
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };
  const create = async () => {
    try {
  
      const apiUrl = "/api/products/create";
    
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productData.title,
          bodyHtml: productData.description,
          
        }),
      });

      if (response.ok) {
              const responseData = await response.json();
              alert("Product created successfully:", responseData.product);
              // Add any additional logic or state updates as needed
            } else {
              console.error("Failed to create product:", response.statusText);
              // Handle error scenarios
            }
  
    } catch (error) {
  
      console.log(error)
    }
  }
 


  return (
    <Card primaryFooterAction={{
      content: "View in admin",
      onAction: () => navigate({ name: "Product" }, { target: "new" })
    }} >
      <Stack spacing="extraloose" >
        <Stack.Item>
          <div className="box">
            <img src={preview} width="250px" height="180px" alt="Product Preview" />
          </div>
          <label htmlFor="imageUpload" className='custom-file-input' onChange={handleFileChange}>Choose File</label>
          <input className="hidden" id="imageUpload" name="image" type="file" accept="image/*" onChange={handleFileChange} />
        </Stack.Item>
        <Stack.Item fill>
          <FormLayout>
            <TextField
              label="Product Variant Title"
              value={productData.title}
              onChange={(value) => setProductData({ ...productData, title: value })}
            ></TextField>
            <TextField
              multiline={4}
              label="Product Variant Description"
              value={productData.description}
              onChange={(value) => setProductData({ ...productData, description: value })}
            ></TextField>
            <Button onClick={() => setShowVarient((prev) => !prev)}>Show Variant</Button>
            <Collapsible open={showVarient}>
              <ProductVarient />
            </Collapsible>
            <Button primary onClick={create}>Create Product</Button>
          </FormLayout>
        </Stack.Item>
      </Stack>
    </Card>
  );
};

export default Products;
