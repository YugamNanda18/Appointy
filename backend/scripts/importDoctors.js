import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import doctorModel from "../models/doctorModel.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const doctors = [];

fs.createReadStream("details.csv")
.pipe(csv())
.on("data", (row) => doctors.push(row))
.on("end", async () => {

  console.log("CSV Loaded:", doctors.length);

  const uniqueDoctors = [
    ...new Map(doctors.map(d => [d.Email, d])).values()
  ];

  uniqueDoctors.sort((a,b) =>
    a.Speciality.localeCompare(b.Speciality)
  );

  for (const doc of uniqueDoctors) {

    const exists = await doctorModel.findOne({ email: doc.Email });

    if (exists) {
      console.log("Duplicate skipped:", doc.Email);
      continue;
    }

    const hashedPassword = await bcrypt.hash(doc.Password, 10);

    const newDoctor = new doctorModel({

      name: doc.Name,
      email: doc.Email,
      password: hashedPassword,
      image: doc["Picture URL"],
      speciality: doc.Speciality,
      degree: doc.Degree,
      experience: doc.Experience,
      about: doc["About Doctor"],
      fees: Number(doc.Fees),

      address: {
        line1: doc["Address Line 1"],
        line2: doc["Address Line 2"]
      }

    });

    await newDoctor.save();

    console.log("Added:", doc.Name);
  }

  console.log("Doctor import completed");

  process.exit();
});