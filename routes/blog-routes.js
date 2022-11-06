const router = require("express").Router();
const { ensureAuthenticated, ensureAuthorized } = require("../middleware/auth-middleware");
const {validationRules, validate} = require("../validations/blog-validator");
const { createBlog, deleteBlog, updateBlog, getAllBlog, getOneBlog } = require("../controllers/blog-controller");
 
router.get("/blog", async (req, res) => {          
    await getAllBlog(req, res);
});
 
router.post("/blog", ensureAuthenticated, ensureAuthorized(), validationRules(), validate, async (req, res) => {    
    await createBlog(req, res);
});
 
router.put("/blog/:id", ensureAuthenticated, ensureAuthorized(), validationRules(), validate, async (req, res) => {    
    await updateBlog(req, res);
});
 
router.get("/blog/:id", async (req, res) => {   
    await getOneBlog(req, res);
});
 
router.delete("/blog/:id", ensureAuthenticated, ensureAuthorized(), async (req, res) => {    
    await deleteBlog(req, res);
});
 
module.exports = router;