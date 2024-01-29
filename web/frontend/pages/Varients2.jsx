import { Card, TextField, Stack, Button, Select, Label } from "@shopify/polaris";
import { useState,useCallback } from "react";
export const Variants2 = ({images, variants}) => {
    const [selected, setSelected] = useState('');
    console.log(images)
    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
      );
    // const options = [
    //     { key:1, label: 'Oval', value: 'Oval' },
    //     { key:2, label: 'Round', value: 'Round' },
    //     { key:3, label: 'Square', value: 'Square' },
    //     { key:4, label: 'Heart', value: 'Heart' },
    //     { key:5, label: 'Rectangle', value: 'Rectangle' },
    //     { key:6, label: 'Trapezium', value: 'Trapezium' },
    // ];
    return (
        <div >
           { variants && 
            <Card sectioned title="KattStoneShape" >
                {variants.map((variant,i) => (
                    <>
                    <Stack key={variant.id} >
                        <img src={images[i].src} 
                        width={"50px"} height={"50px"}
                        ></img>
                        
                        &nbsp;
                        <label   
                        value={variant.title}
                        type="text"
                    >{variant.title}</label>
                        
                    </Stack>
                    <br/>
                    </>
                ))}
            </Card>
                }
        </div>

    );
};
