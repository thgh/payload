import { buildConfig } from '../buildConfig';
import { PostsCollection, postsSlug } from './collections/Posts';
import { MenuGlobal } from './globals/Menu';
import { devUser } from '../credentials';
import { MediaCollection } from './collections/Media';
import AuthDebug from './AuthDebug';

export default buildConfig({
  // ...extend config here
  admin: { components: { beforeDashboard: [AuthDebug] } },
  collections: [
    {
      slug: 'users',
      auth: {
        tokenExpiration: 20, // 8 hours
      },
      fields: [{
        name: 'example',
        type: 'number',
        saveToJWT: true,
        defaultValue: 1,
      }],
    },
    PostsCollection,
    MediaCollection,
    // ...add more collections here
  ],
  globals: [
    MenuGlobal,
    // ...add more globals here
  ],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },

  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    await payload.create({
      collection: postsSlug,
      data: {
        text: 'example post',
      },
    });
  },
});
