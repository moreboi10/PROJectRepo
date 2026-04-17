// In-memory storage for orders (in a real app, this would be a database)
let orders = [];

const orderModel = {
  create: async (order) => {
    orders.push(order);
    return order;
  },

  findAll: async () => {
    return orders;
  },

  findById: async (id) => {
    return orders.find(order => order.id === id);
  },

  update: async (id, updateData) => {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updateData };
      return orders[index];
    }
    return null;
  },

  delete: async (id) => {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
      orders.splice(index, 1);
      return true;
    }
    return false;
  }
};

module.exports = orderModel;