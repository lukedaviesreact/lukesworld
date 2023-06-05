import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Text,
    HStack,
    VStack,
    space,
    VisuallyHidden,
} from '@chakra-ui/react';
import { IoMdMenu } from 'react-icons/io';
import { useRef } from 'react';
import { SocialLinks } from '../social-links/social-links';

import { Link } from '@remix-run/react';
import { NAV_LINKS } from '../nav-bar/nav-bar.constants';

export const MobileMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<any>();

    return (
        <>
            <>
                <Button ref={btnRef} onClick={onOpen}>
                    <VisuallyHidden>mobile menu</VisuallyHidden>
                    <IoMdMenu size="24px" />
                </Button>

                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent shadow={'md'}>
                        <DrawerCloseButton />

                        <DrawerBody pt={'12'}>
                            <VStack align={'start'} spacing={4}>
                                {NAV_LINKS.map((link, i) => (
                                    <Link
                                        to={link.url}
                                        prefetch="intent"
                                        key={i}
                                        onClick={onClose}
                                    >
                                        <Text>{link.label}</Text>
                                    </Link>
                                ))}
                            </VStack>
                        </DrawerBody>

                        <DrawerFooter>
                            <HStack justify={'space-between'} width={'100%'}>
                                <Text>lukedavies.dev</Text>
                                <SocialLinks />
                            </HStack>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        </>
    );
};
