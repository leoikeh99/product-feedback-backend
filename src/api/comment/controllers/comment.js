"use strict";

/**
 *  comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await super.create(ctx);
    return entity;
  },

  // Update user comment----------------------------------------
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const comments = await this.find({ query: query });
    if (!comments.data || !comments.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);
    return entity;
  },

  // Delete a user comment----------------------------------------
  async delete(ctx) {
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const comments = await this.find({ query: query });
    if (!comments.data || !comments.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }
    const response = await super.delete(ctx);
    return response;
  },
}));
