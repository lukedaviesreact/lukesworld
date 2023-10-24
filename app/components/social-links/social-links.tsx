import { HStack, Link, Tooltip, VisuallyHidden } from '@chakra-ui/react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { RiSave2Fill } from 'react-icons/ri';
import { SocialLinkWrap } from './social-links.styled';

interface SocialLinksArgs {
    isHeader?: boolean;
}

export const SocialLinks = ({ isHeader = false }: SocialLinksArgs) => {
    return (
        <SocialLinkWrap isheader={isHeader.toString()}>
            <HStack spacing={2} mt={2}>
                <Tooltip label="Github">
                    <Link href="https://www.github.com/lukedxvxes">
                        <VisuallyHidden>Github link</VisuallyHidden>
                        <AiFillGithub size="24" color="#2d3748" />
                    </Link>
                </Tooltip>
                <Tooltip label="Linkedin">
                    <Link href="https://www.linkedin.com/in/luke-davies-software-engineer/">
                        <VisuallyHidden>Linkedin link</VisuallyHidden>
                        <AiFillLinkedin size="24" color="#2d3748" />
                    </Link>
                </Tooltip>
                <Tooltip label="Download resume">
                    <Link
                        href="/Luke_Davies-Software_Engineer-resume.pdf"
                        download={true}
                    >
                        <VisuallyHidden>Resume link</VisuallyHidden>
                        <RiSave2Fill size="24" color="#2d3748" />
                    </Link>
                </Tooltip>
            </HStack>
        </SocialLinkWrap>
    );
};
