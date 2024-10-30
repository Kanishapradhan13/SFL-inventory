import express from "express";
import Request from "../models/request.model.js";
import Stock from "../models/stock.model.js";
import Item from "../models/item.model.js";
import mongoose from "mongoose";
import Cateogry from "../models/category.model.js";
const router = express.Router();

//count lost request
router.get("/lost-count", async (req, res) => {
  try {
    const aggregationResult = await Request.aggregate([
      {
        $match: {
          request_type: "Loan",
          status: "Unreturned",
          returned_status: "Lost"
        }
      },
      {
        $group: {
          _id: null,
          requestCount: { $sum: "$damaged_lost_count" },
          totalLostCount: { $sum: 1 }
        }
      }
    ]);

    const result = aggregationResult.length > 0 ? aggregationResult[0] : { requestCount: 0, totalLostCount: 0 };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    const {
      request_type,
      reason,
      count,
      start_date,
      end_date,
      user_id,
      item_id,
    } = req.body;

    // Create a new request object
    const requestData = {
      request_type: request_type,
      status: "Pending",
      reason: reason,
      count: count,
      user_id: user_id,
      item_id: item_id,
    };

    // Conditionally include start_date and end_date if request_type is 'Loan'
    if (request_type === "Loan") {
      requestData.start_date = start_date;
      requestData.end_date = end_date;
    }

    // Create and save the new request
    const newRequest = new Request(requestData);
    await newRequest.save();

    res.status(201).json({ message: "Request sent", request: newRequest });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/pending-user-requests", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Pending",
      request_type: "User",
    })
      .populate("user_id")
      .populate("item_id");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/pending-loan-requests", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Pending",
      request_type: "Loan",
    })
      .populate("user_id")
      .populate("item_id");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/reject/:id", async (req, res) => {
  try {
    const requestId = req.params.id;

    // Find the request by ID and update its status to "Rejected"
    const request = await Request.findByIdAndUpdate(
      requestId,
      { status: "Rejected" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request rejected", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/accept/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { approvedBy } = req.body; // The ID of the user who approved the request

    // Find the request and update its status and approved_by field
    const request = await Request.findByIdAndUpdate(
      requestId,
      { status: "Hold", approved_by: approvedBy },
      { new: true } // Return the updated document
    )
      .populate("user_id")
      .populate("item_id")
      .populate("approved_by");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request accepted", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Route to get all Hold requests of type Loan
router.get("/hold-loan-requests", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Hold",
      request_type: "Loan",
    })
      .populate("user_id")
      .populate("item_id"); // Populating user_id and item_id

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/hold-user-requests", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Hold",
      request_type: "User",
    })
      .populate("user_id")
      .populate("item_id"); // Populating user_id and item_id

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//admin
router.get("/rejected-user-requests", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Rejected",
      request_type: "User",
    })
      .populate("user_id")
      .populate("item_id");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//admin
router.get("/rejected-loan-requests", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Rejected",
      request_type: "Loan",
    })
      .populate("user_id")
      .populate("item_id");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/issued-user-reqquests", async (req, res) => {
  try {
    const requests = await Request.find({
      request_type: "User",
      status: "Issued",
    })
      .populate("user_id")
      .populate("item_id")
      .populate("approved_by")
      .populate("issued_by");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/borrowed-loan-reqquests", async (req, res) => {
  try {
    const requests = await Request.find({
      request_type: "Loan",
      status: "Borrowed",
    })
      .populate("user_id")
      .populate("item_id")
      .populate("approved_by")
      .populate("issued_by")
      .populate("selected_stock_with_count.stock_id");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/info/:request_id", async (req, res) => {
  try {
    const { request_id } = req.params;

    // Validate if request_id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(request_id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const request = await Request.findById(request_id)
      .populate("user_id") // Populating user_id with name and email
      .populate("item_id"); // Populating item_id with item_name

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get all my requests (USER)
router.get("/my-requests/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const requests = await Request.find({
      user_id: userId,
      status: { $nin: ["Unreturned", "Returned"] },
    })
      .populate("user_id")
      .populate("item_id");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Issue an item
router.put("/issue/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { userId, selectedStocks } = req.body; // selectedStock is an array of objects { _id, stock_selected, stock_remaining }

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update request status and issued_by field
    request.status = request.request_type === "User" ? "Issued" : "Borrowed";
    request.issued_by = userId;
    request.selected_stock_with_count = selectedStocks.map((stock) => ({
      stock_id: stock._id,
      count: stock.stock_selected,
    }));

    // Update stock quantities and potentially delete stocks
    for (const stock of selectedStocks) {
      const stockItem = await Stock.findById(stock._id);
      if (!stockItem) {
        return res
          .status(404)
          .json({ message: `Stock item with ID ${stock._id} not found` });
      }

      if (request.request_type === "User" && stock.stock_remaining === 0) {
        await Stock.findByIdAndDelete(stock._id);
      } else {
        stockItem.stock_quantity = stock.stock_remaining;
        await stockItem.save();
      }
    }
    // Update the true_count of the associated item
    const item = await Item.findById(request.item_id);
    if (item) {
      const stocks = await Stock.find({ item_id: item._id });
      const trueCount = stocks.reduce(
        (sum, stock) => parseInt(sum) + parseInt(stock.stock_quantity),
        0
      );
      item.true_count = trueCount;
      await item.save();
    }

    await request.save();

    res.status(200).json({
      message: "Request updated and stock issued successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params; // Destructure requestId from params
    const request = await Request.findById(requestId); // Find the request first
    console.log(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (request.status === "Pending") {
      await Request.findByIdAndDelete(requestId); // Delete if status is Pending
      res.status(200).json({ message: "Request deleted successfully" });
    } else {
      res.status(400).json({
        message: "Cannot delete request. Request is not in Pending status",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/loan/return/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { returned_status, damaged_lost_stock_id, damaged_lost_count } =
    req.body;

  try {
    // Fetch the request
    const request = await Request.findById(requestId).populate("item_id");
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (request.request_type !== "Loan") {
      return res.status(400).json({ message: "Request is not of type Loan" });
    }

    // Update status based on returned_status
    if (returned_status === "Good") {
      request.status = "Returned";
    } else if (returned_status === "Damaged" || returned_status === "Lost") {
      request.status = "Unreturned";
      request.damaged_lost_stock_id = damaged_lost_stock_id;
      request.damaged_lost_count = damaged_lost_count;

      if (returned_status === "Damaged") {
        request.returned_status = returned_status;
        request.damaged_lost_description = req.body.damaged_lost_description;
      } else {
        request.returned_status = returned_status;
      }
    }

    // Process restocking
    for (const stockItem of request.selected_stock_with_count) {
      // Fetch the stock document
      const stock = await Stock.findById(stockItem.stock_id);
      if (stock) {
        let restockCount = parseInt(stockItem.count);
        if (
          (returned_status === "Damaged" || returned_status === "Lost") &&
          stockItem.stock_id.equals(damaged_lost_stock_id)
        ) {
          restockCount -= parseInt(damaged_lost_count);
        }

        // Update the stock quantity
        stock.stock_quantity += parseInt(restockCount);
        await stock.save();
      }
    }

    // Update the true_count of the associated item
    const item = await Item.findById(request.item_id);
    if (item) {
      // Calculate the true count based on the restocked items
      const stocks = await Stock.find({ item_id: item._id });

      // Calculate total stock count, excluding damaged or lost stock if applicable
      let trueCount = 0;
      for (const stock of stocks) {
        trueCount += parseInt(stock.stock_quantity);
      }
      item.true_count = trueCount;
      await item.save();
    }

    // Save the updated request
    await request.save();
    console.log(`Request updated: ${JSON.stringify(request)}`);

    res.status(200).json(request);
  } catch (error) {
    console.error("Error occurred:", error); // Log the full error
    res.status(500).json({ message: error.message });
  }
});
router.get("/top-requested-items", async (req, res) => {
  try {
    const topItems = await Request.aggregate([
      {
        $group: {
          _id: "$item_id",
          requestCount: { $sum: 1 },
        },
      },
      {
        $sort: { requestCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      {
        $unwind: "$itemDetails",
      },
      {
        $lookup: {
          from: "categories",
          localField: "itemDetails.category_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 0,
          item_id: "$_id",
          requestCount: 1,
          itemDetails: 1,
          categoryName: "$categoryDetails.category_name",
        },
      },
    ]);

    res.status(200).json(topItems);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/top-requested-categories", async (req, res) => {
  try {
    const topCategories = await Request.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "item_id",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      {
        $unwind: "$itemDetails",
      },
      {
        $group: {
          _id: "$itemDetails.category_id",
          requestCount: { $sum: 1 },
        },
      },
      {
        $sort: { requestCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 0,
          category_id: "$_id",
          requestCount: 1,
          categoryDetails: 1,
        },
      },
    ]);

    res.status(200).json(topCategories);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/lost-and-damaged", async (req, res) => {
  try {
    const requests = await Request.find({
      returned_status: { $in: ["Lost", "Damaged"] },
    })
      .populate("user_id")
      .populate("item_id")
      .populate({
        path: "damaged_lost_stock_id",
        select: "item_code",
      });
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/loan-returned", async (req, res) => {
  try {
    const requests = await Request.find({
      request_type: "Loan",
      status: "Returned",
    })
      .populate("user_id")
      .populate("item_id");

    res.status(200).json(requests);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/borrow-history/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { statuses } = req.query; // Expecting statuses as a comma-separated string

  try {
    // Convert the statuses string into an array
    const statusArray = statuses ? statuses.split(',') : ['Issued', 'Returned', 'Unreturned'];

    // Find requests based on item ID and statuses
    const requests = await Request.aggregate([
      {
        $match: {
          item_id: new mongoose.Types.ObjectId(itemId),
          status: { $in: statusArray }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'itemDetails'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'issued_by',
          foreignField: '_id',
          as: 'issuerDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $unwind: '$itemDetails'
      },
      {
        $unwind: '$issuerDetails'
      },
      {
        $project: {
          _id: 1,
          item_id: 1,
          user_id: 1,
          issued_by: 1,
          status: 1,
          start_date: 1,
          end_date: 1,
          reason: 1,
          count: 1,
          'userDetails.name': 1,
          'itemDetails.item_name': 1,
          'issuerDetails.name': 1 // Include the name of the user who issued the item
        }
      }
    ]);

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
