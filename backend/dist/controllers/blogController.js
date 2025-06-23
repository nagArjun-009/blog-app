"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLikeBlog = exports.likeBlog = exports.addComment = exports.deleteBlog = exports.updateBlog = exports.getBlog = exports.getBlogs = exports.createBlog = void 0;
const blogModel_1 = __importDefault(require("../models/blogModel"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content } = req.body;
    try {
        const blog = new blogModel_1.default({ title, content, author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        yield blog.save();
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating blog', error });
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.find().populate('author', 'username');
        res.json(blogs);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching blogs', error });
    }
});
exports.getBlogs = getBlogs;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogModel_1.default.findById(req.params.id).populate('author', 'username');
        if (!blog)
            return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ message: 'Error fetching blog', error });
    }
});
exports.getBlog = getBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content } = req.body;
    try {
        const blog = yield blogModel_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: 'Blog not found' });
        if (blog.author.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id))
            return res.status(403).json({ message: 'Unauthorized' });
        blog.title = title;
        blog.content = content;
        yield blog.save();
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating blog', error });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blog = yield blogModel_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: 'Blog not found' });
        if (blog.author.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id))
            return res.status(403).json({ message: 'Unauthorized' });
        yield blog.deleteOne();
        res.json({ message: 'Blog deleted' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting blog', error });
    }
});
exports.deleteBlog = deleteBlog;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { content } = req.body;
    try {
        const blog = yield blogModel_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: 'Blog not found' });
        blog.comments.push({
            user: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.username) || '',
            content,
            createdAt: new Date(),
        });
        yield blog.save();
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ message: 'Error adding comment', error });
    }
});
exports.addComment = addComment;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blog = yield blogModel_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: 'Blog not found' });
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (blog.likes.includes(userId)) {
            blog.likes = blog.likes.filter((id) => id.toString() !== userId);
        }
        else {
            blog.likes.push(userId);
        }
        yield blog.save();
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ message: 'Error liking blog', error });
    }
});
exports.likeBlog = likeBlog;
const unLikeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blog = yield blogModel_1.default.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: 'Blog not found' });
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        blog.likes = blog.likes.filter((id) => id.toString() !== userId);
        yield blog.save();
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ message: 'Error unliking blog', error });
    }
});
exports.unLikeBlog = unLikeBlog;
