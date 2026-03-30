import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Product = {
    name : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
    category : Category;
  };

  type Category = {
    #featured;
    #bestSeller;
    #standard;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  let products = Map.empty<Text, Product>();

  public shared ({ caller }) func addProduct(name : Text, price : Nat, description : Text, imageUrl : Text, category : Category) : async () {
    if (products.containsKey(name)) { Runtime.trap("Product with this name already exists") };
    let product : Product = {
      name;
      price;
      description;
      imageUrl;
      category;
    };
    products.add(name, product);
  };

  public query ({ caller }) func getProduct(name : Text) : async Product {
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) {
        switch (p.category) {
          case (#featured) { true };
          case (_) { false };
        };
      }
    ).sort();
  };

  public query ({ caller }) func getBestSellerProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) {
        switch (p.category) {
          case (#bestSeller) { true };
          case (_) { false };
        };
      }
    ).sort();
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };
};
