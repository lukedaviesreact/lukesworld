import { Badge, Box, CardBody, CardFooter } from '@chakra-ui/react';
import { StyledCard } from '../styled-card/styled-card.styled';
import { StyledReviewCard } from './review-card.styled';

interface ReviewCardArgs {
    review: {
        name: string;
        business: string;
        review: string;
        services: string[];
    };
}

export const ReviewCard = ({ review }: ReviewCardArgs) => {
    return (
        <StyledCard>
            <StyledReviewCard>
                <CardBody>
                    <h4>{review.name}</h4>
                    <Box>
                        <span className="business-name">{review.business}</span>
                    </Box>

                    <Box mt={4}>{review.review}</Box>
                </CardBody>
                {/* <CardFooter>
                    {review.services.map((service) => (
                        <Badge key={service} mr={1}>
                            {service}
                        </Badge>
                    ))}
                </CardFooter> */}
            </StyledReviewCard>
        </StyledCard>
    );
};
