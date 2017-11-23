'use strict';
const Controller = function() {
  this.r = null;
};

Controller.prototype.schema = {
  node: {
    db: 'rethinkdb',
    table: 'nodes'
  }
};

Controller.prototype.__init = function(units) {
  this.r = units.require('db.rethinkdb');
  this.table = this.schema.node.table;
};

Controller.prototype.get = function(id) {
  return this._get(id).run();
};

Controller.prototype._get = function(id) {
  return this.r.table(this.table).get(id);
};

Controller.prototype.create = function(nodes) {
  return this._create(nodes).run()
    .then(res => res.generated_keys);
};

Controller.prototype._create = function(nodes) {
  return this.r.table(this.table).insert(nodes);
};

Controller.prototype.update = function(id, content) {
  return this._update(id, content).run()
    .then(() => id);
};

Controller.prototype._update = function(id, content, opts) {
  return this.r.table(this.table)
    .get(id)
    .update({ content }, opts);
};

Controller.prototype.delete = function(id) {
  return this._delete(id).run()
    .then(() => id);
};

Controller.prototype._delete = function(id, opts) {
  return this.r.table(this.table)
    .get(id)
    .delete(opts);
};

Controller.prototype.deleteAll = function(ids, opts) {
  return this._deleteAll(ids, opts).run();
};

Controller.prototype._deleteAll = function(ids, opts) {
  const r = this.r;
  return r.table(this.table)
    .getAll(r.args(ids))
    .delete(opts);
};


module.exports = Controller;
