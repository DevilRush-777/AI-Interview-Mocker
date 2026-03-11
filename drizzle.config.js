/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_0WPwyIcukXO9@ep-proud-forest-a46xt794-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
        
    }

  };
