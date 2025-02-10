import { Flex, TextField,Avatar, Button,IconButton, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon,BellIcon,PersonIcon,HomeIcon,DashboardIcon} from "@radix-ui/react-icons";
import { useAuth0 } from "@auth0/auth0-react";



function MyApp() {
	
	const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
	const handleLogin = () => {
		// Force the login screen to show again by passing the prompt parameter
		loginWithRedirect({ prompt: "login" });
	  };
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
		<IconButton variant="outline" size="3">		
		<DashboardIcon height="16" width="16"></DashboardIcon>
		</IconButton>
		<IconButton variant="outline" size="3">		
		<HomeIcon height="16" width="16"></HomeIcon>
		</IconButton>
		
    

		<IconButton variant="outline" size="3">
		<BellIcon height="16" width="16"></BellIcon>
		</IconButton>
		
		{/* checking is user is authenticated */}
		{isAuthenticated ? (
		<>
			{console.log(user)}
			<Flex direction="column" gap="1" align="center" justify="end">
			<IconButton variant="outline" size="3">
			<PersonIcon height="16" width="16" />
			</IconButton>
			<Text size="1">Hi, {user.nickname}</Text>

			</Flex>
			<Button size="3" variant="soft" onClick={logout}>Log out</Button>
		</>
		) : (
		<Button size="3" variant="soft" onClick={loginWithRedirect}>Log in</Button>
		)}
		
		
		
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>

    	</div>
		</Flex>
	</Flex>
	);
}

export default MyApp