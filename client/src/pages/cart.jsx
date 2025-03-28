import { Callout, DataList, Code, Flex, Badge, IconButton, Link, Card, Box, Skeleton, Dialog, Button } from "@radix-ui/themes";
import { InfoCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Cart({ cart, setCart }) {
    const backendURL = "http://127.0.0.1:5000";
    const [price, setPrice] = useState(0);
    const [upiLink, setUpiLink] = useState(""); 
    const [qrLink, setQrLink] = useState(""); 
    const navigate = useNavigate();
    function donewithpayement(){
        setCart([]);
        navigate("/")
    }
    // AsyncImage Component
    function AsyncImage({ src, alt }) {
        const [imageUrl, setImageUrl] = useState(null);

        useEffect(() => {
            async function fetchImage() {
                try {
                    const response = await fetch(src);
                    if (response.ok) {
                        const blob = await response.blob();
                        setImageUrl(URL.createObjectURL(blob));
                    } else {
                        throw new Error("Failed to load image");
                    }
                } catch (error) {
                    console.error(error);
                    setImageUrl('/path/to/fallback-image.jpg');
                }
            }

            fetchImage();
        }, [src]);

        if (!imageUrl) {
            return <Skeleton height="200px" width="200px" />;
        }

        return <img src={imageUrl} alt={alt} style={{ objectFit: "contain" }} />;
    }

    useEffect(() => {
        const total = cart.reduce((sum, product) => sum + parseInt(product.price), 0);
        setPrice(total);
    }, [cart]);

    // Function to create UPI link and QR code link
    function createUpiLink(amount, message, upiId) {
        const upiLink = `upi://pay?pa=${upiId}&pn=TestPayee&am=${amount}&tn=${message}&cu=INR`;
        const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=400x400&color=ffffff&bgcolor=1a1a1a`;
        setUpiLink(upiLink);
        setQrLink(qrLink);
    }

    if (cart.length === 0) {
        return (
            <Flex justify="center" align="center" gapY="6" py="5">
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>Cart is empty</Callout.Text>
                </Callout.Root>
            </Flex>
        );
    }

    return (
        <>
            {cart.map((product) => (
                <Flex align="center" justify="center" key={product.product_id}>
                    <Box py="5" width="80%">
                        <Card>
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
                                                <IconButton size="1" aria-label="Copy value" color="gray" variant="ghost">
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
                                            {product.negotiable === "no" || product.negotiable === "No" ? (
                                                <Badge color="red" variant="soft" radius="full">
                                                    {product.negotiable}
                                                </Badge>
                                            ) : (
                                                <Badge color="jade" variant="soft" radius="full">
                                                    {product.negotiable}
                                                </Badge>
                                            )}
                                        </DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Price</DataList.Label>
                                        <DataList.Value>{product.price}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Size</DataList.Label>
                                        <DataList.Value>{product.size}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Note</DataList.Label>
                                        <DataList.Value>{product.specialNote}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Email</DataList.Label>
                                        <DataList.Value>
                                            <Link href={`mailto:${product.email}`}>{product.email}</Link>
                                        </DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Company</DataList.Label>
                                        <DataList.Value>
                                            <Link target="_blank" href={product.companyURL}>
                                                {product.companyName}
                                            </Link>
                                        </DataList.Value>
                                    </DataList.Item>
                                </DataList.Root>
                                <AsyncImage src={backendURL + product.image} alt={product.category} />
                            </Flex>
                        </Card>
                    </Box>
                </Flex>
            ))}

            {/* Dialog Section */}
            <Dialog.Root>
                <Dialog.Trigger>
                <Flex align="center" justify="center" pt="2" mb="9">
                    <Button size="4" variant="soft" onClick={() => createUpiLink(price, "Payment for products", "ethanmathias123@okhdfcbank")}>Pay Now</Button>
                </Flex>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Make Payment</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Scan the QR code below to pay:
                    </Dialog.Description>
                    {qrLink && (
                        <img src={qrLink} alt="QR Code for payment" style={{ maxWidth: "100%" }} />
                    )}
                    <Flex align="center" justify="center" pt="2">
                    <Button onClick={donewithpayement} variant="soft">Done</Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
}

export default Cart;
