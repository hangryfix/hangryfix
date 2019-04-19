import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Tags } from '../../api/tag/tag.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Tags.insert(data);
}

/** Initialize the collection if empty. */
if (Tags.find().count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default food.');
    Meteor.settings.defaultTags.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Tag', function publish() {
    return Tags.find();
});

