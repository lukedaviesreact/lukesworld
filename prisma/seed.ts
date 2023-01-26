import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const posts = [
    {
      slug: "first-post",
      title: "This is the first post!",
      markdown: `
        ## This is the first post!

        Its really easy to create these notes!
      `.trim(),
    },
    {
      slug: "lorem-ipsum",
      title: "Lorem Ipsum",
      markdown: `## Lorem ipsum dolor sit amet, consectetur
lorem nec dignissim porttitor, elit enim consectetur erat, at congue purus magna non nunc. Nullam porta, massa non facilisis mattis, velit massa tincidunt est, ac commodo ligula elit rhoncus orci. Pellentesque volutpat, nisi ut porttitor suscipit, purus erat sollicitudin magna, non consequat justo m!
Nam imperdiet, mauris eu viverra tempus, odio diam iaculis felis, et hendrerit orci justo nec dolor. Nam dignissim elit eget orci porttitor, sit amet egestas massa gravida. Donec fringilla suscipit ligula vel **malesuada**. Ut maximus, est at posuere elementum, enim eros vulputate turpis, ac hendrerit massa massa hendrerit sapien. Etiam quis arcu lacus. Sed et dolor dui. Morbi luctus vehicula nisl, sit amet maximus sem pharetra quis. Vivamus pharetra tellus non est placerat dapibus.
---

>Nunc eget placerat libero. Cras a imperdiet nisl. Duis pretium enim massa, quis porttitor mauris gravida eget. >Donec a odio sit amet urna pharetra iaculis quis vel nunc. 

## Nunc eget placerat libero.

Cras a imperdiet nisl. Duis pretium enim massa, quis porttitor mauris gravida eget. *Donec a odio* sit amet urna pharetra iaculis quis vel nunc. Vestibulum rutrum nunc risus, ut vulputate libero lobortis id. Duis dignissim, arcu sit amet pellentesque placerat, arcu massa varius elit, sed interdum orci leo et eros. Quisque eget blandit ipsum, id dignissim diam. Quisque lacinia vestibulum nibh. In sit amet malesuada ante, eu porttitor diam. Etiam ac fermentum dui. Aliquam erat volutpat. Cras id tortor iaculis, porttitor libero at, eleifend leo.`.trim(),
    },
    {
      slug: "third-post",
      title: "This is the third post!",
      markdown: `
      ## This is the third post!

      Its really easy to create these notes!
    `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
