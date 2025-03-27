import { Box, CheckboxCards, Text, Flex, Theme, Heading } from "@radix-ui/themes";
function Filters({setSelectedFilters,selectedFilters}) {
    const handleCheckboxChange = (value) => {
    console.log("Checkbox changed: ", value);
    setSelectedFilters(value);
    };

    return (
        
        <Box minWidth="190px" pt="10px" mx="10px">
            <Flex align="center">
            <Theme accentColor="mint" appearance="dark">
            <Heading align="center">Filters</Heading>
            <Box height="10px"></Box>
            <CheckboxCards.Root defaultValue={["1"]} columns={{ initial: "1" }} onValueChange={handleCheckboxChange}>
                <CheckboxCards.Item value="Tshirt">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">T-Shirts</Text>
                        <Text align="center">All age groups</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="Hoodies">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">Hoodies</Text>
                        <Text align="center">Plain Colours</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="Pants">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">Pants</Text>
                        <Text align="center">Baggy and Straight</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="Jeans">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">Jeans</Text>
                        <Text align="center">All Styles</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="Accessories">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">Accessories</Text>
                        <Text align="center">Small and Big</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="oversized">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">Oversized</Text>
                        <Text align="center">Shirts to pants</Text>
                    </Flex>
                </CheckboxCards.Item>
                <CheckboxCards.Item value="Jersey">
                    <Flex direction="column" width="100%">
                        <Text weight="bold" align="center">Jersey</Text>
                        <Text align="center">All sizes</Text>
                    </Flex>
                </CheckboxCards.Item>
            </CheckboxCards.Root>
        </Theme>
        </Flex>
        </Box>
        
    );
}

export default Filters;
