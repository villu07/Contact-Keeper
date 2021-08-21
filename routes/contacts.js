const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/Users");
const Contact = require("../models/Contacts");
const { check, validationResult } = require("express-validator/check");

//@route Get api/users
//@desc Get Contact from db
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    //here date -1 means its gives us the most recent contacts
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
  res.send("Get user Contact from DB");
});

//@route Post api/users
//@desc Enter contact details
//@access Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const saveContact = await newContact.save();
      res.json(saveContact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }

    res.send("Register contact details");
  }
);

//@route Get api/users
//@desc Update user Contact
//@access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    //console.log(contact);

    if (!contact) return res.status(400).json({ msg: "Contact not found.." });

    /** Checking that the user owns the contact or not */
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized .." });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    //console.log(contact);
    res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//@route Get api/users
//@desc Delete User Contact
//@access Private
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Contact.findByIdAndDelete(id);

    res.status(200).json({ msg: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
module.exports = router;
