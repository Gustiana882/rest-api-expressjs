const db = require('../configs/db');

const product = {};

product.getAllProduct = (orderBy = 'update_at', value = 'DESC') => new Promise((resolve, reject) => {
  db.query(`SELECT public.product.*, public.category.name AS category_name FROM public.product INNER JOIN public.category ON public.product.category_id = public.category.id  ORDER BY ${orderBy} ${value}`)
    .then((res) => {
      const dataProduct = res.rows;
      const json = dataProduct.map((data) => {
        const object = {
          id_product: data.id,
          title: data.title,
          category: [{
            id: data.category_id,
            name: data.category_name,
          }],
          price: data.price,
          store: data.store,
          review: data.review,
          star: data.star,
          image: data.image,
          create_at: data.create_at,
          update_at: data.update_at,
        };
        return object;
      });
      resolve(json);
    })
    .catch((err) => {
      reject(err.message);
    });
});

product.getProductById = (id) => new Promise((resolve, reject) => {
  const query = 'SELECT public.product.*, public.category.name AS category_name FROM public.product INNER JOIN public.category ON public.product.category_id = public.category.id WHERE public.product.id=$1';
  const value = [id];
  db.query(query, value)
    .then((res) => {
      if (res.rowCount) {
        resolve(res.rows);
      } else {
        resolve({ error: true, message: 'Category ID not found!' });
      }
    })
    .catch((err) => {
      reject(err.message);
    });
});

product.addProduct = (data) => new Promise((resolve, reject) => {
  const {
    title, category, price, store, review, star, image,
  } = data;
  const time = new Date();
  const query = 'INSERT INTO public.product (title, category_id, price, store, review, star, image, create_at, update_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)';
  const value = [title, category, price, store, review, star, image, time, time];
  db.query(query, value)
    .then((res) => {
      if (res.rowCount) {
        resolve({ message: 'New data successfully added' });
      }
    })
    .catch((err) => {
      reject(err.message);
    });
});

product.updateProduct = (data) => new Promise((resolve, reject) => {
  const {
    title, category, price, store, review, star, image, id,
  } = data;
  const time = new Date();
  const query = 'UPDATE public.product SET title=$1, category_id=$2, price=$3, store=$4, review=$5, star=$6, image=$7, update_at=$8 WHERE id=$9';
  const value = [title, category, price, store, review, star, image, time, id];
  db.query(query, value)
    .then((res) => {
      if (res.rowCount) {
        resolve({ message: 'Data successfully changed' });
      }
    })
    .catch((err) => {
      reject(err.message);
    });
});

product.deleteProduct = (key) => new Promise((resolve, reject) => {
  const query = 'DELETE FROM public.product  WHERE id =$1';
  const value = [key.id];
  db.query(query, value)
    .then((res) => {
      if (res.rowCount) {
        resolve({ message: 'Data deleted successfully' });
      }
    })
    .catch((err) => {
      reject(err.message);
    });
});

product.searchProduct = (key) => new Promise((resolve, reject) => {
  const query = `SELECT public.product.*, public.category.name AS category_name FROM public.product INNER JOIN public.category ON public.product.category_id = public.category.id WHERE public.product.title LIKE '%${key.p}%' OR public.product.store LIKE '%${key.p}%' OR public.category.name LIKE '%${key.p}%'`;
  db.query(query)
    .then((res) => {
      const dataProduct = res.rows;
      const json = dataProduct.map((data) => {
        const object = {
          id_product: data.id,
          title: data.title,
          category: [{
            id: data.category_id,
            name: data.category_name,
          }],
          price: data.price,
          store: data.store,
          review: data.review,
          star: data.star,
          image: data.image,
          create_at: data.create_at,
          update_at: data.update_at,
        };
        return object;
      });
      resolve(json);
    })
    .catch((err) => {
      reject(err.message);
    });
});

module.exports = product;
