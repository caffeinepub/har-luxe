import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export enum Category {
    featured = "featured",
    standard = "standard",
    bestSeller = "bestSeller"
}
export interface backendInterface {
    addProduct(name: string, price: bigint, description: string, imageUrl: string, category: Category): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getBestSellerProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(name: string): Promise<Product>;
}
