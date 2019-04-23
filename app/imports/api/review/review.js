import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Reviews = new Mongo.Collection('Reviews');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ReviewSchema = new SimpleSchema({
  review: String,
  rating: Number,
  user: String,
  foodId: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Reviews.attachSchema(ReviewSchema);

/** Make the collection and schema available to other code. */
export { Reviews, ReviewSchema };
