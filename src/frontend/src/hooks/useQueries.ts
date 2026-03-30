import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, type Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBestSellerProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "bestsellers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBestSellerProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedProducts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      const existing = await actor.getAllProducts();
      if (existing.length > 0) return;

      const products: Array<[string, bigint, string, string, Category]> = [
        [
          "Noir Obsidian",
          8900n,
          "Handcrafted matte black leather case with polished gold trim.",
          "/assets/generated/case-black-leather.dim_600x700.jpg",
          Category.featured,
        ],
        [
          "Ivory Bloom",
          7500n,
          "Delicate cream floral embossed case, soft and feminine.",
          "/assets/generated/case-cream-floral.dim_600x700.jpg",
          Category.featured,
        ],
        [
          "Emerald Reign",
          9500n,
          "Rich emerald velvet texture with gold logo stamp.",
          "/assets/generated/case-emerald.dim_600x700.jpg",
          Category.bestSeller,
        ],
        [
          "Rose Luxe",
          7900n,
          "Blush crystal rhinestone embellishments on soft pink.",
          "/assets/generated/case-blush-crystal.dim_600x700.jpg",
          Category.bestSeller,
        ],
      ];

      await Promise.all(
        products.map(([name, price, desc, img, cat]) =>
          actor.addProduct(name, price, desc, img, cat),
        ),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return `$${dollars.toFixed(2)}`;
}
