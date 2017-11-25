# Matter In Motion. Node resource extension

[![NPM Version](https://img.shields.io/npm/v/mm-node.svg?style=flat-square)](https://www.npmjs.com/package/mm-node)
[![NPM Downloads](https://img.shields.io/npm/dt/mm-node.svg?style=flat-square)](https://www.npmjs.com/package/mm-node)

This extension adds a __node__ resource.

## Usage

[Extensions installation instructions](https://github.com/matter-in-motion/mm/blob/master/docs/extensions.md)

## Node

Node is the simplest way to store chunks of content:

* __type__ — string, type of the node
* __content__ — various types of the node content dependent on the node type

## API

### get

returns a node

**Request**

* **id** — node id

**Response**

* **id** — uuid, node id
* **type** — string, node type
* **content** — various, node content

### update

updates node content

**Request**

* **to**
  - **content** various, node content to be updated

**Response**

* node id

## Controller Methods

### get(id)

Return a node

* **id** — uuid, node id;

### create(nodes)

Creates a node or many nodes and return a list of new nodes ids.

* **nodes** single node or array of nodes.

### update(id, content)

updates a node and return node id that was updated

* __id__ — node id
* __content__ — new content. Note that content will be updated, i.e. merged with old content. To replace content use [`literal`](https://rethinkdb.com/api/javascript/literal/) command

### delete(id)

Deletes a node and return node id that was deleted

* __id__ — node id

### deleteAll(ids)

Deletes multiple nodes.

* __ids__ — array of node id

License: MIT.
