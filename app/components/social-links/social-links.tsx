import { HStack, Link } from '@chakra-ui/react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export const SocialLinks = () => {
    return (
        <HStack spacing={2} mt={2}>
            <Link href="https://www.github.com/lukedxvxes">
                <AiFillGithub size="24" color="#2d3748" />
            </Link>
            <Link href="https://www.linkedin.com/in/luke-davies-3503aa13a/">
                <AiFillLinkedin size="24" color="#2d3748" />
            </Link>
        </HStack>
    );
};
