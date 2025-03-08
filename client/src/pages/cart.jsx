import { Callout, DataList, Code, Flex, Badge, IconButton, Link, Card, Box, Skeleton } from "@radix-ui/themes";
import { InfoCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";

function Cart({ cart, setCart }) {
    let backendURL = "http://127.0.0.1:5000";

    // AsyncImage Component
    function AsyncImage({ src, alt }) {
        const [imageUrl, setImageUrl] = useState(null);

        useEffect(() => {
            async function fetchImage() {
                try {
                    const response = await fetch(src); // Assuming src is a URL or image path
                    if (response.ok) {
                        const blob = await response.blob();
                        setImageUrl(URL.createObjectURL(blob)); // Create an object URL from the fetched blob
                    } else {
                        throw new Error("Failed to load image");
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            fetchImage();
        }, [src]); // Rerun this effect when `src` changes

        if (!imageUrl) {
            return <div><Skeleton>Loading</Skeleton></div>; // Show loading message if the image is still being fetched
        }

        return <img src={imageUrl} alt={alt} style={{ objectFit: "contain" }} />;
    }

    console.log(cart);

    if (cart.length === 0) {
        return (
            <>
                <Flex justify="center" align="center" gapY="6" py="5">
                    <Callout.Root>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>Cart is empty</Callout.Text>
                    </Callout.Root>
                </Flex>
            </>
        );
    }

    return (
        <>
            {cart.map((product) => {
                return (
                    <Flex align="center" justify="center">
                    <Box py="5" width="80%">
                    <Card key={product.product_id}>
                        <Flex justify="center" direction="row" py="9" gapX="9" gapY="5">
                            <DataList.Root>
                                <DataList.Item align="center">
                                    <DataList.Label minWidth="88px">Status</DataList.Label>
                                    <DataList.Value>
                                        <Badge color="jade" variant="soft" radius="full">
                                            Available
                                        </Badge>
                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">ID</DataList.Label>
                                    <DataList.Value>
                                        <Flex align="center" gap="2">
                                            <Code variant="ghost">{product.product_id}</Code>
                                            <IconButton
                                                size="1"
                                                aria-label="Copy value"
                                                color="gray"
                                                variant="ghost"
                                            >
                                                <CopyIcon />
                                            </IconButton>
                                        </Flex>
                                    </DataList.Value>
                                </DataList.Item>

                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Seller Name</DataList.Label>
                                    <DataList.Value>{product.username}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Condition</DataList.Label>
                                    <DataList.Value>{product.condition}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Product</DataList.Label>
                                    <DataList.Value>{product.category}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Negotiable</DataList.Label>
                                    <DataList.Value>
                                    {
                                        product.negotiable === "no" || "No" ? (
                                            <Badge color="red" variant="soft" radius="full">
                                                {product.negotiable}
                                            </Badge>
                                        ) : (
                                            <Badge color="jade" variant="soft" radius="full">
                                                {product.negotiable}
                                            </Badge>
                                        )
                                    }

                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">price</DataList.Label>
                                    <DataList.Value>{product.price}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">size</DataList.Label>
                                    <DataList.Value>{product.size}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Note</DataList.Label>
                                    <DataList.Value>{product.specialNote}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Email</DataList.Label>
                                    <DataList.Value>
                                        <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label minWidth="88px">Company</DataList.Label>
                                    <DataList.Value>
                                        <Link target="_blank" href="https://workos.com">
                                            WorkOS
                                        </Link>
                                    </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>

                            <AsyncImage src={backendURL + product.image} alt={product.category} />
                        </Flex>
                    </Card>
                    </Box>
                    </Flex>
                );
            })}
        </>
    );
}

export default Cart;
