const isOwner = (req, res, next) => {
  if (req.user.user_type !== "Owner") {
    return res
      .status(403)
      .json({ msg: "Only owners / vendors can perform this action" });
  }
  next();
};

module.exports = isOwner;
