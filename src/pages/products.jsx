import { Box, Text, Flex, Inset, Strong, Card } from "@radix-ui/themes";

function Products() {
    return (
        <Flex wrap="wrap" align="start" flexGrow="1" justify="center" px="7px" py="35px" gapX="7" gapY="4">
            <Box maxWidth="240px">
                <Card size="2">
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: 140,
                                backgroundColor: "var(--gray-5)",
                            }}
                        />
                    </Inset>
                    <Text as="p" size="3">
                        <Strong>Product 1</Strong><br/> is the art and technique of arranging type to
                        make written language legible, readable and appealing when displayed.
                    </Text>
                </Card>
            </Box>
            <Box maxWidth="240px">
                <Card size="2">
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: 140,
                                backgroundColor: "var(--gray-5)",
                            }}
                        />
                    </Inset>
                    <Text as="p" size="3">
                        <Strong>Product 2</Strong> <br/> is the art and technique of arranging type to
                        make written language legible, readable and appealing when displayed.
                    </Text>
                </Card>
            </Box>
            <Box maxWidth="240px">
                <Card size="2">
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: 140,
                                backgroundColor: "var(--gray-5)",
                            }}
                        />
                    </Inset>
                    <Text as="p" size="3">
                        <Strong>Product 3</Strong> <br/> is the art and technique of arranging type to
                        make written language legible, readable and appealing when displayed.
                    </Text>
                </Card>
            </Box>
            <Box maxWidth="240px">
                <Card size="2">
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: 140,
                                backgroundColor: "var(--gray-5)",
                            }}
                        />
                    </Inset>
                    <Text as="p" size="3">
                        <Strong>Product 4</Strong> <br/> is the art and technique of arranging type to
                        make written language legible, readable and appealing when displayed.
                    </Text>
                </Card>
            </Box>
            <Box maxWidth="240px">
                <Card size="2">
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                            style={{
                                display: "block",
                                objectFit: "cover",
                                width: "100%",
                                height: 140,
                                backgroundColor: "var(--gray-5)",
                            }}
                        />
                    </Inset>
                    <Text as="p" size="3">
                        <Strong>Product 5</Strong> <br/> is the art and technique of arranging type to
                        make written language legible, readable and appealing when displayed.
                    </Text>
                </Card>
            </Box>
        </Flex>
        
    );
}

export default Products;
