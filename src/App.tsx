import React, { useState } from "react";
import { Box, Center, Checkbox, Flex, Text } from "@chakra-ui/react";

function App() {
	const [propagateLevel, setPropagateLevel] = useState<Number[]>([]);
	const [bubbledName, setBubbledName] = useState<string>();
	const [propagationStopped, setPropagationStopped] = useState<boolean>(false);

	const handleParentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setTimeout(() => setPropagateLevel((prevState) => [...prevState, 1]), 1600);
		propagationStopped && event.stopPropagation();
		setBubbledName("PARENT");
	};
	const handleFirstChildClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setTimeout(() => setPropagateLevel((prevState) => [...prevState, 2]), 1300);
		propagationStopped && event.stopPropagation();
		setBubbledName("First Child");
	};
	const handleSecondChildClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setTimeout(() => setPropagateLevel((prevState) => [...prevState, 3]), 1000);
		propagationStopped && event.stopPropagation();
		setBubbledName("Second Child");
	};

	return (
		<Center bg="blackAlpha.500" h="100vh" color="white" flexDirection="column" fontSize="2rem">
			<Flex my="5rem" gap="1rem">
				Clicked on <Text color="blue.500"> {bubbledName}</Text>
			</Flex>
			<Checkbox
				colorScheme="blue"
				my="5rem"
				size="lg"
				defaultChecked={false}
				onChange={() => {
					setPropagationStopped((prevState) => !prevState);
					setPropagateLevel([]);
				}}
			>
				Stop Propagation
			</Checkbox>
			<Box
				width="800px"
				p="5rem"
				onClick={(e) => {
					return handleParentClick(e);
				}}
				border="3px solid blue"
				borderRadius="10px"
				boxShadow={propagateLevel.includes(1) ? "0px 0px 14px blue" : "initial"}
			>
				<Text>Parent</Text>
				<Box
					p="5rem"
					onClick={(e) => {
						return handleFirstChildClick(e);
					}}
					border="3px solid green"
					borderRadius="10px"
					boxShadow={propagateLevel.includes(2) ? "0px 0px 14px green" : "initial"}
				>
					<Text>First Child</Text>
					<Box
						p="5rem"
						onClick={(e) => {
							return handleSecondChildClick(e);
						}}
						border="3px solid red"
						borderRadius="10px"
						boxShadow={propagateLevel.includes(3) ? "0px 0px 14px red" : "initial"}
					>
						<Text>Second Child</Text>
					</Box>
				</Box>
			</Box>
		</Center>
	);
}

export default App;
