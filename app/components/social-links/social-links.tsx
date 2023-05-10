import { HStack, Link, Tooltip } from '@chakra-ui/react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { RiSave2Fill } from 'react-icons/ri';
import * as gtag from '~/utils/gtags.client';

export const SocialLinks = () => {
    return (
        <HStack spacing={2} mt={2}>
            <Tooltip label="Github">
                <Link href="https://www.github.com/lukedxvxes">
                    <AiFillGithub size="24" color="#2d3748" />
                </Link>
            </Tooltip>
            <Tooltip label="Linkedin">
                <Link href="https://www.linkedin.com/in/luke-davies-software-engineer/">
                    <AiFillLinkedin size="24" color="#2d3748" />
                </Link>
            </Tooltip>
            <Tooltip label="Download resume">
                <Link
                    href="/Luke-Davies_Software-Engineer_CV.pdf"
                    download={true}
                    onClick={() => {
                        gtag.event({
                            action: 'download_resume',
                            category: 'job-seeking',
                            label: 'resume downloaded',
                        });
                    }}
                >
                    <RiSave2Fill size="24" color="#2d3748" />
                </Link>
            </Tooltip>
        </HStack>
    );
};
