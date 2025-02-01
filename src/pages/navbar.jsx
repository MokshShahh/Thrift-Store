import { Flex, TextField,Avatar, Link,IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon,BellIcon,PersonIcon,HomeIcon} from "@radix-ui/react-icons";


function MyApp() {
	return (
	<Flex width="100vw" py="20px">
		<Flex gap="5" px ="20px" width="100%" align="center">
			
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
		<Flex justify="end" gap="7" px="20px" align="center">
		<Link weight="medium">Sell</Link>
		<IconButton variant="outline" size="3">
		
		<HomeIcon height="16" width="16"></HomeIcon>
		</IconButton>
		
    

		<IconButton variant="outline" size="3">
		<BellIcon height="16" width="16"></BellIcon>
		</IconButton>
		<IconButton variant="outline" size="3">
		<PersonIcon height="16" width="16"></PersonIcon>
		
		</IconButton>
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>

    	</div>
		</Flex>
	</Flex>
	);
}

export default MyApp