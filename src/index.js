import dotenv from "dotenv";
dotenv.config({ path: "/.env" });
import { DBConnection } from "./Database/index.js";
import { app } from "./app.js";
import chalk from "chalk";

DBConnection()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        chalk.bgGreen(`Server Running on port ${process.env.DOMAIN_NAME} `)
      );
    });
  })
  .catch((error) => {
    console.log(chalk.bgRedBright(`MONGODB CONNECTION  ERROR !!! ${err}`));
  });
