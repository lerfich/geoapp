import { nanoid } from "nanoid";

export const DEFAULT_DATASET = {
  id: nanoid(),
  title: "",
  description: "",
  isAvailable: false,
};
