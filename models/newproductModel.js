import mongoose, { Mongoose } from "mongoose";

const newproductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offer:{
        type:Number
    },
    // productPictures: [
    //     { img: { type : String}}
    // ],
    reviews: [
        { 
            userId : {type: mongoose.Schema.Types.ObjectId,
            ref: "users"},
            review: String
        }
    ],
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
        userId: {type: mongoose.Schema.Types.ObjectId,
        ref: "users"}
    },
    // updatedAt : Date,
    quantity: {
      type: Number,
      required: true,
    },
    photos: [{
        data: Buffer,
        contentType: String
      }],
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("newProducts", newproductSchema);