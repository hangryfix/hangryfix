import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const UserInfo = new Mongo.Collection('UserInfo');

/** Create a schema to constrain the structure of documents associated with this collection. */
const UsersSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  tags: Array
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserInfo.attachSchema(UsersSchema);

/** Make the collection and schema available to other code. */
export { UserInfo, UsersSchema };
