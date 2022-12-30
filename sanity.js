import { createCurrentUserHook, createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",

  useCdn: process.env.NODE_ENV === "production",
};

const build = imageUrlBuilder(config);

export const sanityClient = createClient(config);
export const useCurrentUser = createCurrentUserHook(config);
export const urlFor = (source) => build.image(source);
