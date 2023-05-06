import {
    Badge,
    Box,
    Card,
    CardBody,
    GridItem,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StyledHeading } from '../styled-heading/styled-heading';
import type { GithubProjectsData } from '../../utils/projects/github-projects';

export const GithubProjects = ({
    projects,
    showMoreProjects,
}: {
    projects: GithubProjectsData[];
    showMoreProjects: boolean;
}) => {
    if (projects.length) {
        return (
            <SimpleGrid
                gridTemplateColumns="repeat(6, 1fr)"
                gridRowGap={4}
                gridColumnGap={4}
            >
                {projects.map((repo: GithubProjectsData, index: number) => {
                    const name = repo.name;
                    const description = repo.description;
                    const reposUrl = repo.html_url;
                    const stars = repo.stargazers_count;
                    return (
                        <GridItem
                            colSpan={{
                                base: 6,
                                md: 3,
                                lg: 2,
                                xl: 2,
                            }}
                            key={repo.id}
                            h="100%"
                            display={
                                index >= 6 && !showMoreProjects
                                    ? 'none'
                                    : 'unset'
                            }
                        >
                            <motion.a
                                href={reposUrl}
                                target="_blank"
                                rel="noopeneer noreferrer"
                                style={{ display: 'block', height: '100%' }}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.025 }}
                            >
                                <Card h="100%">
                                    <CardBody>
                                        <Box mb={1}>
                                            <StyledHeading
                                                type="h3"
                                                size="sm"
                                                content={name}
                                                color="dark"
                                            />
                                            {stars >= 1 && (
                                                <Badge
                                                    colorScheme="blue"
                                                    mr={2}
                                                >
                                                    Stars: {stars}
                                                </Badge>
                                            )}
                                        </Box>

                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                {description}
                                            </Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </motion.a>
                        </GridItem>
                    );
                })}
            </SimpleGrid>
        );
    }

    return (
        <Box>
            <Text>Error getting github projects</Text>
        </Box>
    );
};
