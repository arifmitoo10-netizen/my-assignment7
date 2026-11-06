// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { db } from "./mongodb";
// import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGODB_URL as string);
// // const db = client.db("my-assignment7");


// const socialProviders = {
//   ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
//     ? {
//         google: {
//           clientId: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//       }
//     : {}),
//   ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
//     ? {
//         github: {
//           clientId: process.env.GITHUB_CLIENT_ID,
//           clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         },
//       }
//     : {}),
// };

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//   trustedOrigins: [
//     "http://localhost:3000",
//     "https://my-assignment7.vercel.app",
//   ],

//   emailAndPassword: {
//     enabled: true,
//     autoSignIn: false,
//   },
//   socialProviders,
// });



import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./mongodb";

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  database: mongodbAdapter(db),

  trustedOrigins: [
    "http://localhost:3000",
    "https://my-assignment7.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders,
});
