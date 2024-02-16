import {
  Card,
  Grid,
  TextField,
  LegacyStack,
  Button,
  Select,
  Label,
  LegacyCard,
  Tabs,
  Page
} from "@shopify/polaris";
import axios from 'axios'
import React from 'react';
import { useState, useCallback, useEffect } from "react";


export const Variants = ({ images, variants, updateVariant, ProductID, isUpdating }) => {
  const [selected, setSelected] = useState(0);

  const [deletecheck, setDeletecheck] = useState([]);

  // const [dummyvariants, setDummyvariants] = useState([...variants])


  console.log(images);
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const [checkedIndices, setCheckedIndices] = useState([]);

  const tabs = [
    {
      id: 0,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r10.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      accessibilityLabel: "All customers",
      panelID: "ring-1",
    },
    {
      id: 1,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r1.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      panelID: "ring-2",
    },
    {
      id: 2,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r2.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      accessibilityLabel: "All customers",
      panelID: "ring-3",
    },
    {
      id: 3,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r3.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      panelID: "ring-4",
    },
    {
      id: 4,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r4.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      accessibilityLabel: "All customers",
      panelID: "ring-5",
    },
    {
      id: 5,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r5.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      panelID: "ring-6",
    },
    {
      id: 6,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r6.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      accessibilityLabel: "All customers",
      panelID: "ring-7",
    },
    {
      id: 7,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r7.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      panelID: "ring-8",
    },
    {
      id: 8,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r8.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      accessibilityLabel: "All customers",
      panelID: "ring-9",
    },
    {
      id: 9,
      content: (
        <img
          width="50px"
          height="45px"
          src={
            "../images/r9.png" ||
            "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png"
          }
        />
      ),
      panelID: "ring-10",
    },
  ];


  const handleCheckboxChange = (index) => {
    const isChecked = checkedIndices.includes(index);
    if (isChecked) {
      setCheckedIndices(checkedIndices.filter((i) => i !== index));
    } else {
      setCheckedIndices([...checkedIndices, index]);
    }
  };

  const handleDeleteCheckboxChange = (index) => {
    const isChecked = deletecheck.includes(index);
    if (isChecked) {
      setDeletecheck(deletecheck.filter((i) => i !== index));
    } else {
      setDeletecheck([...deletecheck, index]);
    }
  };
  const handleSave = async () => {
    if (checkedIndices) {
      try {
        await Promise.all(checkedIndices.map(async (index, i) => {
          const selectedTab = tabs[selected];
          const selectedVariant = variants[index];
          const postData = {
            ShapeId: selectedTab.id,
            ShapeImage: selectedTab.panelID,
            ShapeName: selectedTab.panelID,
            ProductId: ProductID,
            VarientId: index,
          };
          const response = await axios.post('https://skyvisionshopify.in/KattDiamondApi', postData);
          console.log('API Response:', response.data);
          getData();
          setCheckedIndices([])
        }));
      } catch (error) {
        console.error('Error in API request:', error);
      }
    }
  };

  const [fetchData, setFetchData] = useState([])
  const getData = async () => {
    try {

      const response = await axios.get(`https://skyvisionshopify.in/KattDiamondApi/${ProductID}`);

      console.log('API database:', response.data.data);

      setFetchData(response.data.data)

    } catch (error) {
      console.error('Error in API request:', error);

    }
  }

  const handleDelete = async () => {
    if (deletecheck.length > 0) {
      try {
        await Promise.all(
          deletecheck.map(async (item) => {
            const selectedTab = tabs[selected];
            const deleteData = {
              VarientId: item,
            };
            const response = await axios.delete(
              'https://skyvisionshopify.in/KattDiamondApi',
              { data: deleteData }
            );
            console.log('API Delete Response:', response);
          })
        );
        setDeletecheck([])
      } catch (error) {
        console.error('Error in API request:', error);
      }
    }
  };


  useEffect(() => {
    getData()
  }, [])

  console.log("fetchdata is", fetchData)
  useEffect(() => {
    getData()
  }, [handleDelete])

  var a = 0;
  var b = "no_data"
  function filtervarient(VarientId) {
    variants.map((item, i) => {
      if (item.id === VarientId) {
        a = i;
        b = item.title
      }
      return item.src;
    }
    )
  }

  useEffect(() => {
    setCheckedIndices([]);
    setDeletecheck([])
  }, [selected])


  function Checkvariants(varid) {
    if (!fetchData)
      return
    var a = 0
    console.log("code working")
    fetchData.map((item, i) => {
      if (item.VarientId == varid)
        a = 1;
    })
    if (a)
      return false
    else
      return true
  }

  useEffect(() => {
    setCheckedIndices([]);
  }, [])



  return (
    <div className="varientsresponsive">
      <div className="varients" >
        <br />
        <br />
        <br />

        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>

          <Page fullWidth>

            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 12, lg: 6, xl: 6 }}>
                <LegacyCard.Section>
                  <LegacyCard sectioned title="Stones">
                    <div className="card1" style={{ display: "flex", overflowX: "auto" }}>

                      {variants && variants.map((variant, i) => (
                        <div key={i} >
                          {Checkvariants(variant.id) ? (<LegacyStack gap="500" key={variant.id}>
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >

                              <div style={{ marginRight: "30px" }}>

                                <img
                                  src={images[i + 1]?.src || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'}
                                  width={"50px"}
                                  height={"50px"}
                                ></img>
                              </div>

                              <label value={variant.title} type="text" style={{ marginRight: "30px", marginTop: "10px", marginBottom: "10px" }}>
                                {variant.title}
                              </label>
                              <input type="checkbox"
                                width="10px" height={"10px"}
                                checked={checkedIndices.includes(variant.id)}
                                onChange={() => handleCheckboxChange(variant.id)}
                                style={{ marginRight: "30px" }}
                              />
                            </div>
                          </LegacyStack>)
                            : ""
                          }

                          <br />
                        </div>
                      ))}
                    </div>
                    <br />
                    <Button primary onClick={handleSave} >Save</Button>
                  </LegacyCard>
                </LegacyCard.Section>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 12, lg: 6, xl: 6 }}>
                <br />
                <LegacyCard title="Selected Stones" sectioned>
                  <div className="card1" style={{ display: "flex", overflowX: "auto" }}>
                    {fetchData &&
                      fetchData
                        .filter(
                          (item, index, self) =>
                            index ===
                            self.findIndex(
                              (t) => t.VarientId === item.VarientId
                            )
                        )
                        .map((item, i) => (
                          <div key={i} style={{}}>
                            {item.ShapeId === selected && (
                              <LegacyStack gap="500">
                                {console.log(selected)}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div style={{ marginRight: "30px" }}>
                                    <img
                                      src={
                                        filtervarient(item.VarientId) ||
                                        images[a + 1]?.src ||
                                        'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'
                                      }
                                      width={"50px"}
                                      height={"50px"}
                                    ></img>
                                  </div>
                                  <label
                                    value={b}
                                    type="text"
                                    style={{
                                      marginRight: "30px",
                                      marginTop: "10px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {b}
                                  </label>
                                  <input
                                    type="checkbox"
                                    width="10px"
                                    height={"10px"}
                                    style={{ marginRight: "30px" }}
                                    checked={deletecheck.includes(item.VarientId)}
                                    onChange={() =>
                                      handleDeleteCheckboxChange(item.VarientId)
                                    }
                                  ></input>
                                </div>
                              </LegacyStack>
                            )}
                            <br />
                          </div>
                        ))}
                  </div>
                  <br />
                  <button className="button-11" onClick={handleDelete}>Unselect Stone</button>
                </LegacyCard>
              </Grid.Cell>
            </Grid>



          </Page>
        </Tabs>

      </div>
    </div>
  );
};
