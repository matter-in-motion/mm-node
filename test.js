'use strict';
const test = require('ava');
const extension = require('./index');
const createApp = require('mm-test').createApp;

const rxUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

process.env.NODE_ENV = 'production';
const app = createApp({
  extensions: [
    'rethinkdb',
    'rethinkdb-schema',
    'db-schema',
    extension
  ],

  rethinkdb: {
    db: 'test',
    silent: true
  }
});

const node = app.units.require('resources.node.controller');

test.before(() => app.run('db', 'updateSchema'));
test.after.always(() => app.run('db', 'dropSchema'));

let nid;
test.serial('creates a node', t => node
  .create({
    type: 'test',
    content: 'text'
  })
  .then(ids => {
    nid = ids[0];
    t.regex(nid, rxUUID);
  })
);

let nids;
test.serial('creates multiple nodes', t => node
  .create([
    {
      type: 'test',
      content: 'text1'
    },
    {
      type: 'test',
      content: 'text2'
    }
  ])
  .then(ids => {
    nids = ids;
    t.is(ids.length, 2);
    t.regex(ids[0], rxUUID);
    t.regex(ids[1], rxUUID);
  })
);

test.serial('deletes multiple nodes', t => node
  .deleteAll(nids)
  .then(res => t.is(res.deleted, 2))
)

test.serial('gets a node', t => node
  .get(nid)
  .then(node => {
    t.is(node.id, nid);
    t.is(node.type, 'test');
    t.is(node.content, 'text');
  })
);

test.serial('updates a node content', t => node
  .update(nid, 'more text')
  .then(id => t.is(id, nid))
);


test.serial('deletes a node', t => node
  .delete(nid)
  .then(id => t.is(id, nid))
);

