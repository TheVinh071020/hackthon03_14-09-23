const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM works");

    let rowWork = data[0];

    res.json({
      works: rowWork,
      message: "Lấy toàn bộ works",
    });
  } catch (error) {
    res.json({
      messenge: "K thấy works",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await db.execute(`SELECT * FROM works WHERE id = ${id}`);
    let rowUser = data[0];
    console.log(rowUser);
    if (rowUser === 0) {
      res.json({
        message: ` work với id = ${id} k tồn tại`,
      });
    } else {
      res.json(rowUser);
    }
  } catch (error) {
    res.json({
      message: "K thấy user",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, status } = req.body;
    let createWork = await db.execute(
      "INSERT INTO works (name, status) VALUE (?, ?)",
      [name, status]
    );
    console.log(createWork);
    res.json({
      createWork,
      message: "Create work success",
    });
  } catch (error) {
    res.json({
      error,
      message: "Create not success",
    });
  }
});

// API để cập nhật công việc thành hoàn thành
router.put("/:id/complete", async (req, res) => {
  const todoId = req.params.id;
  const query = "UPDATE works SET status = ? WHERE id = ?";
  await db.query(query, ["complete", todoId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ id: todoId, status: "complete" });
    }
  });
});

//Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM works WHERE id = ?", [id]);
    let data = await db.execute("SELECT * FROM works");
    res.json({
      message: "Đã delete thành công",
      works: data[0],
    });
  } catch (error) {
    res.json({
      message: "Delete not success",
    });
  }
});

module.exports = router;
