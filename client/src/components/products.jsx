import { useState, useEffect } from "react";
import { Callout, Box, Text, Inset, Strong, Card, Flex, Button, Skeleton } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
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



function Products({cart,setCart, setcurrentProduct, selectedFilters}) {
    console.log(selectedFilters)
    const [initialProductData, setInitialProductData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedFilters.length > 1) {
          setProductData(
            initialProductData.filter((product) => selectedFilters.includes(product.category))
          );
        }
        else{
            setProductData(initialProductData)
        }

      }, [selectedFilters]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                let response = await fetch("http://127.0.0.1:5000/getAllProducts");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                let data = await response.json();
                setInitialProductData(data); 
                setProductData(data)
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

    if (productData.length>0){
    return (
        <div>
            <Flex wrap="wrap" align="center" flexGrow="1" justify="between" px="10%" py="35px" gapX="7" gapY="4">
            <Box  minWidth="240px" maxWidth="240px">
                        <Card size="2">
                            <Text align="center" as="p" size="3" >
                                <strong>Add a product</strong>
                            </Text>
                            <Box pt="2">
                            <Card>
                            <Flex gapY="3" justify="center" direction="column">
                                <Button onClick={()=>{navigate("/sellerform")}} size="4" variant="soft" > <PlusIcon></PlusIcon></Button>
                           </Flex>
                            </Card>
                            </Box>
                        </Card>
                    </Box>
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
else{
    return(
        <>
        <Box width="100%">
        <Flex direction="column" justify="center" align="center" gapY="6" py="8">
                        <Callout.Root>
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>No products to display</Callout.Text>
                        </Callout.Root>
            
       
        <Box  minWidth="240px" maxWidth="240px">
                    <Card size="2">
                        <Text align="center" as="p" size="3" >
                            <strong>Add a product</strong>
                        </Text>
                        <Box pt="2">
                        <Card>
                        <Flex gapY="3" justify="center" direction="column">
                            <Button onClick={()=>{navigate("/sellerform")}} size="4" variant="soft" > <PlusIcon></PlusIcon></Button>
                       </Flex>
                        </Card>
                        </Box>
                    </Card>
                </Box>
        </Flex>
        </Box>
        </>
    )
}
}


export default Products;
