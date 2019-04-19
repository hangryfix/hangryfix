import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Tags = new Mongo.Collection('Tags');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TagSchema = new SimpleSchema({
  name: String,
  type: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Tags.attachSchema(TagSchema);

/** Make the collection and schema available to other code. */
export { Tags, TagSchema };
