import { Layout, LegacyCard, LegacyStack, TextField, Button, Collapsible, Checkbox, Thumbnail, TextStyle, DataTable, Divider, Card } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Variants } from "./Varients";
// import { Description } from './Description';
export const ProductCard = ({ data }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    // const [showVariants, setShowVariants] = useState(false);
    const [showVariants, setShowVariants] = useState(Array(data.length).fill(false));
    const [variants, setVariants] = useState([]);
    const onUpdate = async () => {
        setIsUpdating(true);
    };
    const updateVariant = () => {
        console.log("update variant")
    };
    const handleShowVariants = (index) => {
        let newShowVariants = [...showVariants];
        newShowVariants[index] = !newShowVariants[index];
        setShowVariants(newShowVariants);
    };
    const rows = data.map((item, index) => {
        return [

            <Thumbnail
                key={index}
                source={item.image?.src || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'}
                alt={item.title}
            />,
            <TextStyle key={index} variation="strong">{item.title}</TextStyle>,
            <TextStyle key={index} variation="positive">$ {item.variants[0].price}</TextStyle>,

            <Button
                key={index}
                onClick={() => item.variants.length > 1 && handleShowVariants(index)} >
                Show Variants
            </Button>,
            <Collapsible key={index} open={showVariants[index]} >
                <Variants
                    images={item.images}
                    variants={item.variants}
                    updateVariant={updateVariant}
                    ProductID={item.id}
                    isUpdating={isUpdating}
                />
            </Collapsible>,
        ];
    });
    return (
        <>
            <Card >
                <div style={{ width: "90vw", overflowY: 'auto', scrollBehavior: "smooth", padding: "0px 1rem 0px 2rem" }}>
                    <DataTable
                        columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'numeric',

                        ]}
                        headings={[
                            'Image',
                            'Product Name',
                            'Price',

                        ]}
                        rows={rows}
                    />
                </div>
            </Card>
        </>
    )
}
