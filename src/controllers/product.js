const products = {};
const model = require('../models/product');
const categorymodel = require('../models/category');
const response = require('../helpers/response');

products.getAllProduct = async (req, res) => {
  try {
    const allProduct = await model.getAllProduct();
    response(res, 200, allProduct);
  } catch (error) {
    response(res, 400, error);
  }
};

products.addProduct = async (req, res) => {
  try {
    const category = await categorymodel.getCategoryById(req.body.category);

    if (category.error) {
      response(res, 401, category);
    } else {
      const respons = await model.addProduct(req.body);
      response(res, 200, respons);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

products.updateProduct = async (req, res) => {
  try {
    const cekid = await model.getProductById(req.body.id);
    if (cekid.error) {
      response(res, 401, cekid);
    } else {
      const respons = await model.updateProduct(req.body);
      response(res, 200, respons);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

products.deleteProduct = async (req, res) => {
  try {
    const cekid = await model.getProductById(req.body.id);
    if (cekid.error) {
      response(res, 401, cekid);
    } else {
      const respons = await model.deleteProduct(req.body);
      response(res, 200, respons);
    }
  } catch (error) {
    response(res, 400, error);
  }
};

products.searchProduct = async (req, res) => {
  try {
    const searchProduct = await model.searchProduct(req.query);
    response(res, 200, searchProduct);
  } catch (error) {
    response(res, 400, error);
  }
};

products.fiter = async (req, res) => {
  try {
    const { name, category, price } = req.query;
    let filter = await model.getAllProduct();
    if (name === 'ASC' || name === 'DESC') {
      filter = await model.getAllProduct('public.product.title', name);
    }
    if (price === 'ASC' || price === 'DESC') {
      filter = await model.getAllProduct('public.product.price', price);
    }
    if (category) {
      filter = filter.filter((product) => product.category[0].name === category);
    }
    response(res, 200, filter);
  } catch (error) {
    response(res, 400, error);
  }
};

module.exports = products;
