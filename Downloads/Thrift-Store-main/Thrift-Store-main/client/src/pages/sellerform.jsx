
import { Flex, RadioCards, TextArea, Text, Box, TextField, Button, RadioGroup, Card} from "@radix-ui/themes";
import {ImageIcon, Link1Icon} from "@radix-ui/react-icons"
import { useState } from "react";

function SellerForm() {
    const fileUrl = ""
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [negotiable, setNegotiable] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');

    const isFormValid = productName && category && price && condition && description && negotiable;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ productName, category, price, condition, description, negotiable });
    };
    function handleFileChange(event) {
    }
    return (

        <Flex display={"flex"} justify={"center"} gap={3}>
            <form onSubmit={handleSubmit}>
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
                                "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" ? (
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
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="category"><b>Category: </b></label><br></br>
                        <Box maxWidth="500px" pt={"2"}>
                            <RadioCards.Root variant="classic" defaultValue="1" columns={{ initial: "1", sm: "3" }} value={category} onValueChange={setCategory}>
                                <RadioCards.Item value="1">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">T-shirts</Text>

                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="2">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Hoodies</Text>

                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="3">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pants</Text>

                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="4">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Jeans</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="5">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Accessories</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="6">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Oversized</Text>
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
                                <RadioCards.Item value="1">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">SMALL</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="2">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">MEDIUM</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="3">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">LARGE</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="4">
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
                        <Box maxWidth="500px" pt={"2"}>
                            <RadioGroup.Root size={"3"} defaultValue="1" name="example" value={negotiable} onValueChange={setNegotiable}>
                                <RadioGroup.Item value="1">YES</RadioGroup.Item>
                                <RadioGroup.Item value="2">NO</RadioGroup.Item>
                            </RadioGroup.Root>
                        </Box>
                    </div>
                </Flex>
                <br></br>
                <Flex direction={"column"} gap={3}>
                    <div>
                        <label htmlFor="condition"><b>Condition: </b></label><br></br>
                        <Box maxWidth="600px" pt={"2"}>
                            <RadioCards.Root variant="classic" defaultValue="1" columns={{ initial: "1", sm: "3" }} value={condition} onValueChange={setCondition}>
                                <RadioCards.Item value="1">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">New With Tags</Text>
                                        <Text>Brand new, Unworn</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="2">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">New Without Tags</Text>
                                        <Text>Unworn, but without tags</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="3">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pre-Owned (Perfect)</Text>
                                        <Text>Like new, barely worn</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="4">
                                    <Flex direction="column" width="100%">
                                        <Text weight="bold">Pre-Owned (Good)</Text>
                                        <Text>Gently used</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="5">
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
                        <TextArea resize={"both"} placeholder="Describe your Product…" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </Flex>
                <Flex direction={"column"} gap={3}>

                    <Box pt={"5"}>
                        <Button size={"4"} variant="soft">Submit</Button>
                    </Box>

                </Flex>
            </form>
        </Flex>
    );
};

export default SellerForm;

