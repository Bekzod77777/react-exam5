import axios from "axios";

export class ProductsService {
  static serverUrl = "http://localhost:9000";

  static getAllProducts() {
    let dataUrl = `${this.serverUrl}/products`;
    return axios.get(dataUrl);
  }

  static getProduct(productId) {
    let dataUrl = `${this.serverUrl}/products/${productId}`;
    return axios.get(dataUrl);
  }

  static createProduct(product) {
    let dataUrl = `${this.serverUrl}/products`;
    return axios.post(dataUrl, product);
  }

  static updateProduct(product, productId) {
    let dataUrl = `${this.serverUrl}/products/${productId}`;
    return axios.put(dataUrl, product);
  }

  static deleteProduct(productId) {
    let dataUrl = `${this.serverUrl}/products/${productId}`;
    return axios.delete(dataUrl);
  }
}
