"use strict";

/**
 *  feedback controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::feedback.feedback",
  ({ strapi }) => ({
    async create(ctx) {
      let entity;
      ctx.request.body.data.user = ctx.state.user;
      entity = await super.create(ctx);
      return entity;
    },

    // Delete a user feedback----------------------------------------
    async delete(ctx) {
      const { id } = ctx.params;
      const query = {
        filters: {
          id: id,
          user: { id: ctx.state.user.id },
        },
      };
      const feedbacks = await this.find({ query: query });
      if (!feedbacks.data || !feedbacks.data.length) {
        return ctx.unauthorized(`You can't delete this entry`);
      }
      const response = await super.delete(ctx);
      return response;
    },
  })
);
