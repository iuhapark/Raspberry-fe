import instance from "../../common/configs/axios-config";
import { IProduct } from "../model/product";

export const SaveAPI = async (product: IProduct) => {
    console.log(`Product API parameter: ${JSON.stringify(product)}`)
    try {
        const response = await instance().post("product/save", product);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const findProuctByIdAPI = async (id: number) => {
    try {
      const response = await instance().get(`/${id}`);
      console.log("MY-INFO: product/detail " + JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const findAllProductAPI = async (page: number) => {
    try {
        const response = await instance().get("product/all", {
            params: { page, limit: 10 },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const findProductByIdAPI = async (id: number) => {
    try {
        const response = await instance().get(`product/${id}`, {
            params: { id },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}