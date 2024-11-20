// // pages/api/send-email.js
// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";

// export async function POST(req: Request, res: Response)
// {
//   if (req.method === "POST") {
//     const { name, email, message } = req.body;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: "Your Name <your_email@gmail.com>",
//       to: "recipient_email@example.com", // Replace with your desired recipient
//       subject: "Contact Form Submission",
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error sending email" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// import mongoose from "mongoose";

// // Define your Mongoose schema for subscriptions
// const subscriptionSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   createdAt: { type: Date, default: Date.now },
// });

// // Model for Subscription
// const Subscription =
//   mongoose.models.Subscription ||
//   mongoose.model("Subscription", subscriptionSchema);

// // Connect to MongoDB
// async function connectDB() {
//   if (!mongoose.connection.readyState) {
//     await mongoose.connect(process.env.MONGODB_URI as string);
//   }
// }

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, message } = data;
  console.log(data);

  if (!email || !message || !name) {
    return NextResponse.json(
      { message: "Email, Message and Name is required" },
      { status: 400 }
    );
  }

  try {
    // Configure your email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email options
    const mailOptions = {
      from: "Andrew omar@gmail.com>",
      to: "alex.forget50@gmail.com", // Replace with your desired recipient
      subject: "Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Connect to the database and save the email
    // await connectDB();
    // const subscription = new Subscription({ email });
    // await subscription.save();

    return NextResponse.json({ message: "Sent successful!" });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Error processing subscription", error: error.message },
      { status: 500 }
    );
  }
}
