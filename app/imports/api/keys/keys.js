import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Keys = new Mongo.Collection('Keys');

/** Create a schema to constrain the structure of documents associated with this collection. */
const KeysSchema = new SimpleSchema({
  restaurants: Number,
  reviews: Number,
  foods: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Keys.attachSchema(KeysSchema);

/** Make the collection and schema available to other code. */
export { Keys, KeysSchema };
