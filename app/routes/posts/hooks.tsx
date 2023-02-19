import { Client } from "@notionhq/client";
import { getBlockData, getLukesWorldId, getPostListId } from "./posts.utils";

interface LukesWorldDataBlocksProps {
  client: Client;
  id: string;
}

export interface PostProps {
  id: string;
  child_page?: { title: string };
}

export const useLukesWorldBlocks = async ({
  client,
  id,
}: LukesWorldDataBlocksProps) => {
  let publicDataBlocks;
  let lukesWorldData;
  let posts;
  let postList;

  //public dir blocks holds all public notion content
  try {
    publicDataBlocks = await getBlockData(client, id);
  } catch (error) {
    throw Error("couldnt get public dir blocks");
  }

  //lukes world blocks hold this websites content
  try {
    const lukesWorldId = getLukesWorldId(publicDataBlocks);
    lukesWorldData = await getBlockData(client, lukesWorldId);
  } catch (error) {
    throw Error("couldnt get lukesWorld blocks");
  }

  //post blocks
  try {
    posts = await getBlockData(client, getPostListId(lukesWorldData));
  } catch (error) {
    throw Error("couldnt get post blocks");
  }
  if (posts) {
    postList = posts.map((post: PostProps) => {
      return {
        id: post.id,
        title: post?.child_page?.title,
      };
    });
  }

  return { lukesWorldData, postList };
};
