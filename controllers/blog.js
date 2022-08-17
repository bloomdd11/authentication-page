const getAllBlog = (req, res) => {
  return res.json(req.user)
  return res.json({ msg: 'get all blog' })
}
module.exports = { getAllBlog }