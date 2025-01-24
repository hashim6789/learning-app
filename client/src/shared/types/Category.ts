export interface Category {
  id: string;
  title: string;
  status: "blocked" | "unblocked";
  isListed?: boolean; // Making isListed optional
}
