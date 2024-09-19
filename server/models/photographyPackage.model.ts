import mongoose from '../services/DBconnect.service';
import { Schema } from "mongoose";

export enum PackageType { CHALAKE, SMASHCAKE, NEWBORN, FAMILY, CHILDREN }

const photographyPackage_schema = new Schema({
    id: { type: Number },
    type: { type: String },
    moneyToHour: { type: Number }
});

export default mongoose.model("photographyPackage_model", photographyPackage_schema);
