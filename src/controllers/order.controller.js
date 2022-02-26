const express = require("express");

const router = express.Router();

const Order = require("../models/order.model");

const orderController = require("../controllers/crud.controller");

const authenticate = require("../middleware/authenticate");

router.get("", orderController(Order).get);

router.get("/:id", authenticate, async (req, res) => {
    try {
      const order = await Order.find({user_id:req.params.id}).lean().exec();
      return res.status(200).send(order);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

router.patch("/:id", orderController(Order).patch);

router.post("", authenticate, async(req,res)=>{
    try{
        const user_id = req.user._id;
        const order = await Order.create({
            image:req.body.image,
            title:req.body.title,
            price:req.body.price,
            user_id:user_id
        });
        return res.status(200).send(order);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

router.delete("/:id", orderController(Order).delete);

module.exports = router;
