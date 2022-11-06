const Blog = require("../models/blog");
const paginate = require("express-paginate");
 
const createBlog = async(req, res) => {
    try {
        const newRecord = new Blog({
            ...req.body,
            createdBy: req.user._id,
        });
        await newRecord.save();
        return res.status(201).json({
            message: "Blog successfully created",
            success: true
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};
 
const deleteBlog = async(req, res) => {
    try {
        const deleted = await Blog.findByIdAndDelete(req.params.id);
        if(!deleted) {
            return res.status(404).json({
                message: "Item not found",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Item successfully deleted",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};
 
const updateBlog = async(req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body);
        return res.status(201).json({
            message: "Item successfully updated",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};
 
const getAllBlog = async(req, res) => {
    try {
        const [results, itemCount] = await
        Promise.all([
            Blog.find({}) 
                .sort({createdAt: -1})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                Blog.count({viewsCount: 0}),
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        return res.status(201).json({
            object: "list",
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results,
            pageCount,
            itemCount,
            currentPage: req.query.page,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};
 
const getOneBlog = async(req, res) => {
    try {
        const item = await Blog.findById(req.params.id);
        if(item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};
 
module.exports = {
    createBlog,
    deleteBlog,
    updateBlog,
    getAllBlog,
    getOneBlog
}