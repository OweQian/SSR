'use strict';

/**
 * home controller
 */
const { removeTime, removeAttrsAndId } = require('../../../utils/index');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home.home', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: 'deep',
    };
    const { data } = await super.find(ctx);
    return removeAttrsAndId(removeTime(data[0]));
  }
}));
