import * as Koa from "koa";
import * as logger from "koa-logger";
import * as koaValidator from "koa-async-validator";
import * as bodyParser from "koa-bodyparser";

import { config } from "dotenv";

config();

import apiRoutes from "./routes/api";
import webRoutes from "./routes/web";

const PORT = process.env.PORT || 3000;
const app = new Koa();

/* middleware */

app.use(bodyParser());
app.use(koaValidator());

//app.use(logger());

/** Enable routing here. */
//app.use(router.routes());
app.use(apiRoutes.routes());
app.use(webRoutes.routes());

const server = app.listen(PORT, async () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

export { server };
