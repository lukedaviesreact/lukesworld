import { Box, theme } from '@chakra-ui/react';
import { useTransition } from '@remix-run/react';
import { motion } from 'framer-motion';

export const LoadingBar = () => {
    const transition = useTransition();
    const isLoadingPage = transition.state === 'loading';

    if (isLoadingPage) {
        return (
            <Box
                position={'absolute'}
                width={'100%'}
                height={'5px'}
                role="progressbar"
            >
                <Box
                    as={motion.div}
                    w={'20%'}
                    h={'100%'}
                    background={theme.colors.purple[200]}
                    initial={{ opacity: 0, width: '20%' }}
                    animate={{
                        opacity: 1,
                        width: '100%',
                        transition: { duration: 2 },
                    }}
                ></Box>
            </Box>
        );
    }

    return null;
};
