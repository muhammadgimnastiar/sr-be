import dbPool from "../lib/dbConnect.js";
import { verifyToken } from "../lib/tokenHandler.js";

export const getBlog = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized: Bearer token required",
            });
        }

        const data = verifyToken(req.headers.access_token);

        // Your existing code to fetch blogs goes here
        const blogs = await dbPool.query("SELECT * FROM Blog");

        res.json({
            status: 200,
            data: blogs,
        });
    } catch (error) {
        next(error);
    }
};

export const createBlog = async (req, res, next) => {
    try {
        const { title, description, path_image, user_id } = req.body;

        const [userResult] = await dbPool.query("SELECT * FROM User WHERE id = ?", [user_id]);

        if (userResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        const [createdBlog] = await dbPool.query("INSERT INTO Blog (title, description, path_image, user_id) VALUES (?, ?, ?, ?)", [title, description, path_image, user_id]);

        res.status(201).json({
            status: 201,
            data: createdBlog,
        });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id; // Assuming you have a route parameter for the blog ID
        const { title, description, path_image, user_id } = req.body;

        // Check if the blog exists
        const [existingBlog] = await dbPool.query("SELECT * FROM Blog WHERE id = ?", [blogId]);

        if (existingBlog.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Blog not found",
            });
        }

        // Check if the user exists
        const [userResult] = await dbPool.query("SELECT * FROM User WHERE id = ?", [user_id]);

        if (userResult.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        // Update the blog
        await dbPool.query("UPDATE Blog SET title = ?, description = ?, path_image = ?, user_id = ? WHERE id = ?", [title, description, path_image, user_id, blogId]);

        res.json({
            status: 200,
            message: "Blog updated successfully",
        });
    } catch (error) {
        next(error);
    }
};
export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delete exchange transaction using raw SQL
        const [deletedBlog] = await dbPool.query("DELETE FROM Blog WHERE id = ?", [id]);

        res.status(200).json({
            status: 200,
            data: deletedBlog,
        });
    } catch (error) {
        next(error);
    }
};