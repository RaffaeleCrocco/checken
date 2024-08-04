import express from "express";
import { Check } from "../models/checkModel.js";

const router = express.Router();

//route to creat new check
router.post("/", async (request, response) => {
  try {
    const { type, time, agent, place } = request.body;
    if (!type || !time) {
      return response
        .status(400)
        .send({ message: "missing fields on request" });
    }
    var newCheck = {
      type,
      time,
    };
    if (agent) {
      newCheck = { ...newCheck, agent, isAssigned: true };
    }
    if (place) {
      newCheck = { ...newCheck, place };
    }
    const check = await Check.create(newCheck);
    response.status(201).send(check);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for getting one check by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const check = await Check.findById(id);

    response.status(200).json(check);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for updating a check by id
router.put("/:id", async (request, response) => {
  try {
    const { type, time, agent } = request.body;
    if (!type || !time) {
      return response
        .status(400)
        .send({ message: "missing fields on request" });
    }
    if (agent) {
      request.body = { ...request.body, isAssigned: true };
    } else {
      request.body = { ...request.body, isAssigned: false, isCompleted: false };
    }
    const { id } = request.params;
    const result = await Check.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(400).json({ message: "check not found" });
    }
    return response.status(200).send({ message: "check updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for deleting one check by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Check.findByIdAndDelete(id);

    if (!result) {
      return response.status(400).json({ message: "check not found" });
    }
    return response.status(200).send({ message: "check deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get all check by user
router.get("/user/:user", async (request, response) => {
  try {
    const { user } = request.params;
    const checks = await Check.find({ agent: user });
    const notAssignedChecks = await Check.find({ isAssigned: false });

    // Get the current date
    const now = new Date();
    const currentMonth = now.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    // Define the amounts
    const amountPerCheckout = 6.5;
    const amountPerCheckin = 10;

    const totals = {
      checkout: { number: 0, amount: 0 },
      checkin: { number: 0, amount: 0 },
    };
    const currents = {
      checkout: { number: 0, amount: 0 },
      checkin: { number: 0, amount: 0 },
    };
    const lasts = {
      checkout: { number: 0, amount: 0 },
      checkin: { number: 0, amount: 0 },
    };

    checks.forEach((c) => {
      if (!c.isCompleted) {
        return; // Skip this iteration if the check is not completed
      }

      const date = new Date(c.time);
      const month = date.getMonth();
      const type = c.type;

      // Total counts and amounts
      if (type === "checkout") {
        totals.checkout.number += 1;
        totals.checkout.amount += amountPerCheckout;
      } else if (type === "checkin") {
        totals.checkin.number += 1;
        totals.checkin.amount += amountPerCheckin;
      }

      // Current month counts and amounts
      if (month === currentMonth) {
        if (type === "checkout") {
          currents.checkout.number += 1;
          currents.checkout.amount += amountPerCheckout;
        } else if (type === "checkin") {
          currents.checkin.number += 1;
          currents.checkin.amount += amountPerCheckin;
        }
      }

      // Last month counts and amounts
      if (month === previousMonth) {
        if (type === "checkout") {
          lasts.checkout.number += 1;
          lasts.checkout.amount += amountPerCheckout;
        } else if (type === "checkin") {
          lasts.checkin.number += 1;
          lasts.checkin.amount += amountPerCheckin;
        }
      }
    });

    response.status(200).json({
      outs: {
        total: totals.checkout,
        current: currents.checkout,
        last: lasts.checkout,
      },
      ins: {
        total: totals.checkin,
        current: currents.checkin,
        last: lasts.checkin,
      },
      data: checks,
      notAssignedChecks,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get all check from database
router.get("/", async (request, response) => {
  try {
    const checks = await Check.find({});
    response.status(200).json({
      count: checks.length,
      data: checks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
