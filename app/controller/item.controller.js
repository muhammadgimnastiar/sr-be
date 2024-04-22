import { verifyToken } from "../lib/tokenHandler.js";
import dbPool from "../lib/dbConnect.js";

export const getItems = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: Bearer token required",
      });
    }

    verifyToken(req.headers.access_token);

    const [itemRows] = await dbPool.query("SELECT * FROM Item");
    const items = itemRows;

    res.json({
      status: 200,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const getItemsById = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id); // Ambil ID dari parameter URL

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: Bearer token required",
      });
    }

    // Fungsi verifyToken harus Anda implementasikan sesuai kebutuhan Anda
    verifyToken(req.headers.authorization.slice(7));

    // Gantilah query SQL dengan sesuai dengan struktur tabel dan kolom Anda
    const [itemRows] = await dbPool.query("SELECT * FROM Item WHERE id = ?", [itemId]);
    
    if (itemRows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
      });
    }

    const item = itemRows[0];

    res.json({
      status: 200,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const createItem = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: Bearer token required",
      });
    }

    const data = verifyToken(req.headers.access_token);
    const { name, points, total } = req.body;

    const [createdItem] = await dbPool.query("INSERT INTO Item (name, points, total) VALUES (?, ?, ?)", [name, points, total]);

    res.status(201).json({
      status: 201,
      data: createdItem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateItems = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // Mengambil ID dari parameter URL
    const { name, points, total } = req.body;

    // // Memastikan bahwa request memiliki header authorization
    // if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     status: 401,
    //     message: "Unauthorized: Bearer token required",
    //   });
    // }

    // // Memverifikasi token dan mendapatkan data pengguna
    // verifyToken(req.headers.authorization.slice(7));

    // Melakukan update item di database
    const [updatedItemRows] = await dbPool.query("UPDATE Item SET name = ?, points = ?, total = ? WHERE id = ?", [name, points, total, id]);

    // Memastikan item dengan ID yang diberikan ada di database
    if (!updatedItemRows.affectedRows) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
      });
    }

    // Mengambil data item yang telah diperbarui
    const [updatedItemDataRows] = await dbPool.query("SELECT * FROM Item WHERE id = ?", [id]);
    const updatedItem = updatedItemDataRows[0];

    // Mengirim respon dengan data item yang diperbarui
    res.status(200).json({
      status: 200,
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

export const postPointByItemId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { points } = req.body;

    if (points === undefined) {
      return res.status(400).json({
        status: 400,
        message: "Points must be provided in the request body.",
      });
    }

    // Update the item's points based on the provided index id
    await dbPool.query("UPDATE Item SET points = ? WHERE id = ?", [points, id]);

    // Fetch the updated user details
    const [updatedItemRows] = await dbPool.query("SELECT * FROM Item WHERE id = ?", [id]);
    const updatedItem = updatedItemRows[0];

    res.json({
      status: 200,
      message: "Points updated successfully",
      user: {
        id: updatedItem.id,
        name: updatedItem.name,
        points: updatedItem.points,
        total: updatedItem.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const postTotalByItemId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { total } = req.body;

    if (total === undefined) {
      return res.status(400).json({
        status: 400,
        message: "total must be provided in the request body.",
      });
    }

    // Update the item's points based on the provided index id
    await dbPool.query("UPDATE Item SET total = ? WHERE id = ?", [total, id]);

    // Fetch the updated user details
    const [updatedItemRows] = await dbPool.query("SELECT * FROM Item WHERE id = ?", [id]);
    const updatedItem = updatedItemRows[0];

    res.json({
      status: 200,
      message: "Total item updated successfully",
      user: {
        id: updatedItem.id,
        name: updatedItem.name,
        points: updatedItem.points,
        total: updatedItem.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

