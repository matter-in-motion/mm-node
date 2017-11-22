'use strict';
const errors = require('mm-errors');

const ReqlDriverError = function(e) {
  if (e.name === 'ReqlDriverError') {
    throw errors.ServerError(null, e.msg);
  } else {
    throw e;
  }
}

module.exports = {
  __expose: true,

  get: function() {
    return {
      auth: {
        provider: 'user',
        required: true
      },
      title: 'Node',
      description: 'Returns a node',
      request: {
        type: 'object',
        additionalProperties: false,
        required: [ 'id' ],
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          }
        }
      },

      response: {
        type: 'object',
        required: [ 'id', 'type', 'content' ],
        additionalProperties: false,
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },

          type: {
            type: 'string'
          },

          content: {
            type: 'object'
          }
        }
      },

      call: (auth, data) => this
        .get(data.id)
        .catch(ReqlDriverError)
        .catch(errors.NotFound)
    }
  },

  update: function() {
    return {
      auth: {
        provider: 'user',
        required: true
      },
      title: 'Node',
      description: 'Updates a node\'s content',
      request: {
        type: 'object',
        additionalProperties: false,
        required: [ 'id', 'to' ],
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },

          to: {
            type: 'object',
            additionalProperties: false,
            required: [ 'content' ]
          }
        }
      },

      response: {
        type: 'string',
        format: 'uuid'
      },

      call: (auth, data) => this
        .update(data.id, data.to.content)
        .catch(ReqlDriverError)
    }
  }
};