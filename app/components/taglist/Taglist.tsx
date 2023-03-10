import { Badge, HStack } from '@chakra-ui/react';
import { Post } from '@prisma/client';

export const Taglist = ({ post }: { post: Post }) => {
    return (
        <HStack>
            {JSON.parse(post.tags).map(
                (tag: { id: string; name: string; color: string }) => (
                    <Badge key={tag.id} colorScheme={tag.color}>
                        {tag.name}
                    </Badge>
                )
            )}
        </HStack>
    );
};
