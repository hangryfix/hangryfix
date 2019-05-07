import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tag/tag.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Tags.insert(data);
}

/** Initialize the collection if empty. */
if (Tags.find().count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default tags.');
    Meteor.settings.defaultTags.map(data => addData(data));
  }
}

/** This subscription publishes only the ingredient tags */
Meteor.publish('Tag', function publish() {
    return Tags.find({ type: 'ingredient' });
});

/** This subscription publishes only the cuisine/category tags */
Meteor.publish('Category', function publish() {
  return Tags.find({ type: 'cuisine' });
});

/** This subscription publishes all tags */
Meteor.publish('AllTags', function publish() {
  return Tags.find();
});
