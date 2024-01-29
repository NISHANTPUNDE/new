import {Card,IndexTable,TextField,Grid, Button} from "@shopify/polaris";
const ProductVarient = () => {
  return (
    <Card sectioned title="Variants"> 
    <div className="flex">
    <input width={'10px'} height={'10px'} type="checkbox"/>
    <TextField label="Product Varient Id"></TextField>  
    <TextField label="Product Varient Name"></TextField>   
    <TextField label="Product Varient price"></TextField> 
      </div>   
      <Button>ADD</Button>   
    {/* <input width={'10px'} height={'10px'} type="checkbox"/>
      <Grid>
        
        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 4, lg: 4, xl: 4 }}>
        <TextField label="Product Varient Id"></TextField>     
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 4, lg: 4, xl: 4 }}>
        <TextField label="Product Varient Name"></TextField> 
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 4, lg: 4, xl: 4 }}>
        <TextField label="Product Varient price"></TextField> 
        </Grid.Cell> 
      </Grid> */}
    </Card>
  )
}
export default ProductVarient;