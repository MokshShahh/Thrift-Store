import { Flex, TextField,Avatar, Link,IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon,BellIcon,PersonIcon,HomeIcon } from "@radix-ui/react-icons";

function MyApp() {
	return (
	<Flex width="100vw" py="20px">
		<Flex gap="7" width="100%" align="center">
			<Avatar
				src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
				fallback="LOGO"
			/>

			<TextField.Root variant="soft" radius="large" placeholder="Search" size="2" width="16">
				<TextField.Slot>
					<MagnifyingGlassIcon height="16" width="16" />
				</TextField.Slot>
			</TextField.Root>
		</Flex>
		<Flex justify="end" gap="7" px="10px" align="center">
		<IconButton variant="outline" size="3">
		<HomeIcon height="16" width="16"></HomeIcon>
		</IconButton>
		<Link weight="medium">Sell</Link>
		<Link weight="medium">Cart</Link>
		<IconButton variant="outline" size="3">
		<BellIcon height="16" width="16"></BellIcon>
		</IconButton>
		<IconButton variant="outline" size="3">
		<PersonIcon height="16" width="16"></PersonIcon>
		</IconButton>

		</Flex>
	</Flex>
	);
}

export default MyApp
