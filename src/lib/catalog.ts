export type AlgoKey =
  | "bubble_sort" | "quick_sort" | "binary_search" | "bfs" | "dfs" | "bst";

export type CategorySlug = "sorting" | "searching" | "graphs" | "trees" | "dynamic-programming" | "strings";

export interface Algorithm {
  key: AlgoKey;
  slug: string;
  name: string;
  category: CategorySlug;
  time: string;
  space: string;
  blurb: string;
  renderer: "bars" | "grid" | "tree";
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  comingSoon?: boolean;
}

export const CATEGORIES: Category[] = [
  { slug: "sorting", name: "Sorting", tagline: "Arrange. Compare. Swap." },
  { slug: "searching", name: "Searching", tagline: "Halve the space, find the truth." },
  { slug: "graphs", name: "Graphs", tagline: "Walk the network." },
  { slug: "trees", name: "Trees", tagline: "Branch by branch." },
  { slug: "dynamic-programming", name: "Dynamic Programming", tagline: "Remember the past.", comingSoon: true },
  { slug: "strings", name: "Strings", tagline: "Patterns in characters.", comingSoon: true },
];

export const ALGORITHMS: Algorithm[] = [
  { key: "bubble_sort", slug: "bubble-sort", name: "Bubble Sort", category: "sorting",
    time: "O(n²)", space: "O(1)", renderer: "bars",
    blurb: "Adjacent swaps bubble the largest element to the end each pass." },
  { key: "quick_sort", slug: "quick-sort", name: "Quick Sort", category: "sorting",
    time: "O(n log n)", space: "O(log n)", renderer: "bars",
    blurb: "Partition around a pivot, recursively sort each side." },
  { key: "binary_search", slug: "binary-search", name: "Binary Search", category: "searching",
    time: "O(log n)", space: "O(1)", renderer: "bars",
    blurb: "Repeatedly halve the search interval on a sorted array." },
  { key: "bfs", slug: "bfs", name: "Breadth-First Search", category: "graphs",
    time: "O(V + E)", space: "O(V)", renderer: "grid",
    blurb: "Explore neighbors level by level using a queue." },
  { key: "dfs", slug: "dfs", name: "Depth-First Search", category: "graphs",
    time: "O(V + E)", space: "O(V)", renderer: "grid",
    blurb: "Dive deep along each branch before backtracking." },
  { key: "bst", slug: "bst", name: "Binary Search Tree", category: "trees",
    time: "O(log n) avg", space: "O(n)", renderer: "tree",
    blurb: "Ordered tree where left < node < right enables fast lookup." },
];

export const getAlgo = (slug: string) => ALGORITHMS.find(a => a.slug === slug);
export const getByKey = (key: AlgoKey) => ALGORITHMS.find(a => a.key === key)!;
export const byCategory = (slug: CategorySlug) => ALGORITHMS.filter(a => a.category === slug);
