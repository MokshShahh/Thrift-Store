import { ScrollArea, TextArea, Flex, Box, Button, Text, Heading } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import axios from "axios";

function Chat() {
  const backendURL = "http://127.0.0.1:5000/chatresponse";
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");

  async function handle() {
    try {
        
      const { data } = await axios.post(backendURL, { query: query }, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Ensure the response contains the expected field 'response'
      if (data.response) {
        setResponse(data.response);
        setQuery("")
      } else {
        console.error("No response received from backend:", data);
      }
    } catch (error) {
      console.error("Error calling backend:", error);
      setResponse("Sorry, there was an error processing your request.");
    }
  }

  return (
    
      <Box mx="20px" minWidth="80%">
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 600 }}>
	<Box p="2" pr="8">
		<Heading size="4" mb="2" trim="start">
			Response :
		</Heading>
		<Flex direction="column" gap="4">
			<Text as="p">
				{response}
			</Text>

			

			
		</Flex>
	</Box>
</ScrollArea>

        <Flex justify="between" align="center" pt="10px" position="relative" >
          <Box minWidth="90%">
            <TextArea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              minLength="80%"
              placeholder="Reply to comment…"
            />
          </Box>
          <Button onClick={handle} variant="soft">
            <PaperPlaneIcon />
          </Button>
        </Flex>
      </Box>
  );
}

export default Chat;
