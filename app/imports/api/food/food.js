import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Foods = new Mongo.Collection('Foods');

/** Create a schema to constrain the structure of documents associated with this collection. */
const FoodsSchema = new SimpleSchema({
  name: String,
  restaurant: String,
  category: String,
  price: Number,
  image: String,
  owner: String,
  timestamp: Date,
  description: String,
  tags: Array,
  'tags.$': String
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Foods.attachSchema(FoodsSchema);

/** Make the collection and schema available to other code. */
export { Foods, FoodsSchema };
