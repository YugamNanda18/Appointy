import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'
import Razorpay from "razorpay";
import crypto from "crypto";

// ✅ Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================= PAYMENT =================

// ✅ Create Razorpay Order
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "No ID" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(400).json({ success: false, message: "Appointment not found" });
    }

    const order = await razorpayInstance.orders.create({
      amount: appointmentData.amount * 100,
      currency: "INR",
      receipt: appointmentId,
    });

    // ✅ SAVE ORDER ID CORRECTLY
    appointmentData.orderId = order.id;
    await appointmentData.save();

    res.json({ success: true, order });

  } catch (error) {
    console.log("PAYMENT ERROR:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Verify Payment
const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      // ✅ FIND USING orderId
      const appointment = await appointmentModel.findOne({
        orderId: razorpay_order_id
      });

      if (!appointment) {
        return res.json({ success: false, message: "Appointment not found" });
      }

      // ✅ UPDATE PAYMENT STATUS
      await appointmentModel.findByIdAndUpdate(appointment._id, {
        payment: true,
        paymentId: razorpay_payment_id
      });

      res.json({ success: true });

    } else {
      res.json({ success: false, message: "Verification Failed" });
    }

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ================= USER =================

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Weak Password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= PROFILE =================

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    res.json({ success: true, userData: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    });

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      await userModel.findByIdAndUpdate(userId, {
        image: upload.secure_url
      });
    }

    res.json({ success: true, message: "Updated" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= APPOINTMENT =================

// Book
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const doc = await doctorModel.findById(docId);

    if (!doc.available) {
      return res.json({ success: false, message: "Not Available" });
    }

    const appointment = await new appointmentModel({
      userId,
      docId,
      userData: await userModel.findById(userId),
      docData: doc,
      amount: doc.fees,
      slotDate,
      slotTime,
      date: Date.now()
    }).save();

    res.json({ success: true, message: "Booked" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// List
const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.body.userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Cancel
const cancelAppointment = async (req, res) => {
  try {
    await appointmentModel.findByIdAndUpdate(req.body.appointmentId, {
      cancelled: true
    });

    res.json({ success: true, message: "Cancelled" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= EXPORT =================

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};
