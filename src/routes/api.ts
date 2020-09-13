import * as Router from "koa-router";
import * as Koa from "koa";

import CabRepository from "../repositories/CabRepository";

const cabRepository = new CabRepository();

const router = new Router();

router.prefix("/api");

router.get("/cabs", async (ctx: Koa.Context) => {
  try {
    const { lat = 12, long = 23, type = "" } = ctx.request.query;
    const cabs = cabRepository.nearestCab(lat, long, type);
    if (cabs.length === 0) {
      ctx.body = { messege: "Please change the filter, No cabs found." };
      ctx.status = 400;
    }
    if (cabs.length > 0) {
      ctx.body = cabs;
      ctx.status = 200;
    }
  } catch (err) {
    ctx.body = "Server error"; // will log to system
    ctx.status = 500;
  }
});
router.post("/cab/:cabId/booking", async (ctx: Koa.Context) => {
  try {
    const cabId = Number(ctx.params.cabId);
    const cabs = cabRepository.getAllCabs();
    const isBooked = cabs.find((c) => c.booked_at != null && c.id === cabId);
    console.log("isBooked", isBooked);

    if (isBooked) {
      ctx.body = { messege: "Ohh no already booked", code: 400 };
      ctx.status = 400;
      return;
    }
    const cab = cabRepository.cabBooking(cabId);

    if (!isBooked && cab && cab.booked_at) {
      ctx.body = { messege: "Your cab booked successfully.", code: 200 };
      ctx.status = 200;
      return;
    }
  } catch (err) {
    console.log("err", err);
    ctx.body = "Server error"; // will log to system
    ctx.status = 500;
  }
});
router.put("/cab/:cabId/waiting", async (ctx: Koa.Context) => {
  try {
    const cabId = Number(ctx.params.cabId);
    const cab = cabRepository.chanStatusToWaiting(cabId);

    if (cab && cab.booked_at == null) {
      ctx.body = { messege: "Cab status changed.", code: 200 };
      ctx.status = 200;
      return;
    }
  } catch (err) {
    console.log("err", err);
    ctx.body = "Server error"; // will log to system
    ctx.status = 500;
  }
});
export default router;
