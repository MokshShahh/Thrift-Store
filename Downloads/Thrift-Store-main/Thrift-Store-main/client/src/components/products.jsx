import { useState, useEffect } from "react";
import { Box, Text, Inset, Strong, Card, Flex, Button, Skeleton } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

// Custom AsyncImage component to handle image fetching
function AsyncImage({ src, alt }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch(src); // Assuming src is a URL or image path
                if (response.ok) {
                    const blob = await response.blob();
                    setImageUrl(URL.createObjectURL(blob));  // Create an object URL from the fetched blob
                } else {
                    throw new Error("Failed to load image");
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchImage();
    }, [src]);

    if (!imageUrl) {
        return <div><Skeleton>Loading</Skeleton></div>; // Show loading message if the image is still being fetched
    }

    return <img src={imageUrl} alt={alt} style={{ width: "100%", height: 140, objectFit: "cover" }} />;
}



function Products({cart,setCart, setcurrentProduct}) {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                let response = await fetch("http://127.0.0.1:5000/getAllProducts");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                let data = await response.json();
                setProductData(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); 
            }
        }

        fetchProducts();
    }, []); 

    if (loading) {
        return <div><Skeleton>Loading</Skeleton></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    let backendURL = "http://127.0.0.1:5000";

    // Add product to the cart
    const addToCart = (product) => {
            // Check if the product already exists in the cart
            const isProductInCart = cart.some((item) => item.product_id === product.product_id);
            if (!isProductInCart) {
              setCart((prevCart) => [...prevCart, product]); 
            } else {
              alert("This item is already in your cart!");
            }
            console.log(cart)
          };
    const viewMore = (product) => {
        setcurrentProduct(product)
        navigate("/more")
    }

    return (
        <div>
            <Flex wrap="wrap" align="start" flexGrow="1" justify="center" px="7px" py="35px" gapX="7" gapY="4">
                {productData.map((product) => (
                    <Box key={product.product_id} minWidth="240px" maxWidth="240px">
                        <Card size="2">
                            <Inset clip="padding-box" side="top" pb="current">
                                <AsyncImage src={backendURL + product.image} alt={product.category} />
                            </Inset>
                            <Text as="p" size="3">
                                <Strong>{product.category}</Strong><br/>
                                {product.Title || 'No description available.'}
                            </Text>
                            <Box pt="4">
                            <Card>
                            <Flex gapY="3" justify="center" direction="column">
                                <Button variant="soft" onClick={() => viewMore(product)}>View More</Button>
                                <Button variant="soft" onClick={() => addToCart(product)}>Add to cart</Button>
                            </Flex>
                            </Card>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Flex>
        </div>
        
    );
}

export default Products;
