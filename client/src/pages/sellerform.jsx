
import { Flex, RadioCards, TextArea, Text, Box, TextField, Button, RadioGroup, Card} from "@radix-ui/themes";
import {ImageIcon, Link1Icon} from "@radix-ui/react-icons"
import { useState } from "react";
import axios from "axios"

function SellerForm() {
    const [fileUrl, setFileUrl] = useState('');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [material, setmaterial] = useState('');
    const [negotiable, setNegotiable] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');

    const isFormValid = productName && category && price && condition && description && negotiable;
    async function submit(){
        event.preventDefault();
        let backendURL = "http://127.0.0.1:5000";
        if (isFormValid){
        alert("Form submitted successfully");
        console.log(negotiable, condition, description, productName, category, price, size, fileUrl);
        // Make API call to submit the form
        // e.g. axios.post('/api/products', { productName, category, size, price, negotiable, condition, description, fileUrl });
        // Clear the form fields
        const formData = new FormData();
        formData.append('username', "Moksh");
        formData.append('condition', condition);
        formData.append('Title', productName);
        formData.append('category', category);
        formData.append('size', size);
        formData.append('Material', material);
        formData.append('price', price);
        formData.append('negotiable', negotiable);
        formData.append('specialNote', description);
        formData.append('product_pic', fileInput.files[0]);
        try {
        const response = await axios.post(backendURL + "/add", formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
        } 
        catch (error) {
        console.error(error);
        }

        // setProductName('');
        // setCategory('');
        // setSize('');
        // setPrice('');
        // setNegotiable('');
        // setCondition('');
        // setDescription('');
        // setFileUrl('');
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        console.log(file)
        if (file) {
          const files = URL.createObjectURL(file); // Generate a temporary URL
          setFileUrl(files); // Update the parent state
        }
      };
    return (

        <Flex display={"flex"} justify={"center"} gap={3}>
            <form onSubmit={submit} encType="multipart/form-data">
                <Flex display={"flex"} direction={"column"} gapY={3}>
                    <div>
                        <label htmlFor="productName"><b>Product Name: </b></label> <br></br>
                        <Box maxWidth="250px" pt={"2"}>
                            <TextField.Root variant="soft" size="3" placeholder="Enter product name …" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                        </Box>
                    </div>
                </Flex>
                <br></br>
                <Text as="p" size="3" weight="bold">
                    Product Image
                </Text>
                <Text size="2" ml="0" color="gray">
                    Upload Image of Product
                </Text>
                <Card mt="2">
                    <Flex gap="3" align="center">
                        <Box position="fixed" top="4" left="4">
                            <ImageIcon height="19" width="19" />
                        </Box>
                        <Box ml="6">
                            <Text as="div" size="2" weight="bold">
                                Add Image
                            </Text>
                            {fileUrl !==
                                "" ? (
                                <Text as="div" size="2" color="gray">
                                    Image uploaded
                                </Text>
                            ) : (
                                <Text as="div" size="2" color="gray">
                                    Upload from your device
                                </Text>
                            )}
                            <Button
                                mt="4"
                                variant="soft"
                                radius="small"
                                onClick={() =>
                                    document.getElementById("fileInput").click()
                                }
                                style={{ zIndex: 100, cursor: "pointer" }}
                            >
                                <Link1Icon />
                                Upload
                            </Button>
                            <input
                                id="fileInput"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </Box>
                    </Flex>
                </Card>
                <div>
                    <label htmlFor="productName"><b>Material: </b></label> <br></br>
                    <Box maxWidth="250px" pt={"2"}>
                        <TextField.Root variant="soft" size="3" placeholder="Enter material" value={material} onChange={(e) => setmaterial(e.target.value)} required />
                    </Box>
                </div>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="category"><b>Category: </b></label><br></br>
                        <Box maxWidth="500px" pt={"2"}>
                            <RadioCards.Root variant="classic" defaultValue="T Shirt" columns={{ initial: "1", sm: "3" }} value={category} onValueChange={setCategory}>
                                <RadioCards.Item value="T Shirt">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">T-shirts</Text>

                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Hoodies">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Hoodies</Text>

                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Pants">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pants</Text>

                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Jeans">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Jeans</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Accessories">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Accessories</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Oversized">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Oversized</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Jersey">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Jersey</Text>
                                    </Flex>
                                </RadioCards.Item>

                            </RadioCards.Root>
                        </Box>
                    </div>
                </Flex>
                <br></br>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="size" ><b>Size:</b></label><br></br>
                        <Box maxWidth="500px" pt={"2"}>
                            <RadioCards.Root variant="classic" defaultValue="1" columns={{ initial: "1", sm: "2" }} value={size} onValueChange={setSize}>
                                <RadioCards.Item value="Small">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">SMALL</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Medium">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">MEDIUM</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Large">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">LARGE</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="XL">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">X - LARGE</Text>
                                    </Flex>
                                </RadioCards.Item>
                            </RadioCards.Root>
                        </Box>

                    </div>
                </Flex>
                <br></br>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="price"><b>Price: </b></label> <br></br>

                        <Box maxWidth="250px" pt={"2"}>
                            <TextField.Root variant="soft" size="3" placeholder="Enter Price…" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </Box>
                    </div>
                </Flex>
                <br></br>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="Negotiable"><b>Negotiable :</b></label><br></br>
                        <RadioCards.Root variant="classic" defaultValue="Yes" columns={{ initial: "1", sm: "2" }} value={negotiable} onValueChange={setNegotiable}>
                                <RadioCards.Item value="Yes" >
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Yes</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="No">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">No</Text>
                                    </Flex>
                                </RadioCards.Item>
                        </RadioCards.Root>
                    </div>
                </Flex>
                <br></br>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="condition"><b>Condition: </b></label><br></br>
                        <Box maxWidth="600px" pt={"2"}>
                            <RadioCards.Root variant="classic" defaultValue="1" columns={{ initial: "1", sm: "3" }} value={condition} onValueChange={setCondition}>
                                <RadioCards.Item value="New With Tags">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">New With Tags</Text>
                                        <Text>Brand new, Unworn</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="New Without Tags">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">New Without Tags</Text>
                                        <Text>Unworn, but without tags</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Pre-Owned (Perfect)">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pre-Owned (Perfect)</Text>
                                        <Text>Like new, barely worn</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Pre-Owned (Good)">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pre-Owned (Good)</Text>
                                        <Text>Gently used</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="Pre-Owned (Fair)">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pre-Owned (Fair)</Text>
                                        <Text>visible flaws</Text>
                                    </Flex>
                                </RadioCards.Item>
                            </RadioCards.Root>
                        </Box>
                    </div>
                </Flex>
                <br></br>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="description"><b>Description : </b></label>
                        <TextArea resize={"both"} placeholder="Describe your Product…" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                </Flex>
                <Flex direction={"column"} gap={3}>

                    <Box pt={"5"}>
                        <Button variant="soft" onClick={submit}>Submit</Button>
                    </Box>

                </Flex>
            </form>
        </Flex>
    );
};

export default SellerForm;

