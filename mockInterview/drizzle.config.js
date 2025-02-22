/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://ai-interview-mocker_owner:S6wejR9TiCxn@ep-winter-snowflake-a5g81vz5.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
    },
};
