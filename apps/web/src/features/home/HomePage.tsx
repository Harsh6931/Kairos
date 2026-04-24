import { Link } from "react-router-dom";

type AlgorithmCard = {
  name: string;
  emoji: string;
  category: string;
  complexity: string;
  summary: string;
  slug: string;
};

const algorithmCards: AlgorithmCard[] = [
  {
    name: "Quick Sort",
    emoji: "\u26A1",
    category: "Sorting",
    complexity: "Avg O(n log n)",
    summary: "Partition-driven sorting with pivot strategy.",
    slug: "quick-sort"
  },
  {
    name: "Merge Sort",
    emoji: "\u{1F9E9}",
    category: "Sorting",
    complexity: "O(n log n)",
    summary: "Stable divide-and-conquer merge visual.",
    slug: "merge-sort"
  },
  {
    name: "Heap Sort",
    emoji: "\u{1F3D4}\uFE0F",
    category: "Sorting",
    complexity: "O(n log n)",
    summary: "Heapify and extract max in phases.",
    slug: "heap-sort"
  },
  {
    name: "Binary Search",
    emoji: "\u{1F3AF}",
    category: "Searching",
    complexity: "O(log n)",
    summary: "Halve the search space each step.",
    slug: "binary-search"
  },
  {
    name: "BFS",
    emoji: "\u{1F30A}",
    category: "Graph",
    complexity: "O(V + E)",
    summary: "Layer-wise traversal with queue dynamics.",
    slug: "bfs"
  },
  {
    name: "DFS",
    emoji: "\u{1F573}\uFE0F",
    category: "Graph",
    complexity: "O(V + E)",
    summary: "Depth-first exploration and backtrack flow.",
    slug: "dfs"
  },
  {
    name: "Dijkstra",
    emoji: "\u{1F6E3}\uFE0F",
    category: "Graph",
    complexity: "O((V + E) log V)",
    summary: "Shortest path relaxation with min-priority picks.",
    slug: "dijkstra"
  },
  {
    name: "A* Search",
    emoji: "\u{1F9ED}",
    category: "Graph",
    complexity: "Heuristic-based",
    summary: "Goal-directed pathfinding with heuristic score.",
    slug: "a-star"
  },
  {
    name: "AVL Tree",
    emoji: "\u{1F333}",
    category: "Tree",
    complexity: "O(log n)",
    summary: "Balanced rotations after insert and delete.",
    slug: "avl-tree"
  },
  {
    name: "Topological Sort",
    emoji: "\u{1F9E0}",
    category: "Graph",
    complexity: "O(V + E)",
    summary: "Dependency ordering for directed acyclic graphs.",
    slug: "topological-sort"
  },
  {
    name: "Kruskal",
    emoji: "\u{1FAA2}",
    category: "Graph",
    complexity: "O(E log E)",
    summary: "MST by sorted edges and union-find.",
    slug: "kruskal"
  },
  {
    name: "Prim",
    emoji: "\u{1F9F2}",
    category: "Graph",
    complexity: "O(E log V)",
    summary: "Grow MST using lightest connecting edge.",
    slug: "prim"
  }
];

export function HomePage(): JSX.Element {
  return (
    <div className="page-grid">
      <section className="algorithm-gallery">
        <div className="algorithm-gallery-head">
          <div>
            <p className="algorithm-gallery-kicker">Algorithm Collection</p>
            <h2 className="algorithm-gallery-title">Scrollable Cards (3 per row)</h2>
          </div>
          <div className="algorithm-gallery-actions">
            <Link className="button-primary" to="/visualize/quick-sort">
              Start Visualizer
            </Link>
            <Link className="button-ghost" to="/battle">
              Open Arena
            </Link>
          </div>
        </div>

        <div className="algorithm-scroll-row">
          {algorithmCards.map((algorithm) => (
            <article className="algorithm-card" key={algorithm.name}>
              <p className="algorithm-card-emoji">{algorithm.emoji}</p>
              <p className="algorithm-card-category">{algorithm.category}</p>
              <h3 className="algorithm-card-title">{algorithm.name}</h3>
              <p className="algorithm-card-summary">{algorithm.summary}</p>
              <div className="algorithm-card-footer">
                <span>{algorithm.complexity}</span>
                <Link to={`/visualize/${algorithm.slug}`}>Visualize</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

