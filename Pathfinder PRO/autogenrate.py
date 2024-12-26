import tkinter as tk
from tkinter import ttk
import networkx as nx
import random
 
# Node colors
VISITED_COLOR = 'blue'
CURRENT_COLOR = 'green'
PATH_COLOR = 'red'
 
 
class PathfindingApp:
    def __init__(self, master):
        self.master = master
        self.master.title("Pathfinding Algorithms")
        self.master.geometry("1200x700")
        self.master.configure(bg="#D3D3D3")
 
        self.G = nx.Graph()
        self.node_positions = {}
        self.start_node = None
        self.end_node = None
        self.visited_nodes = set()
        self.current_algorithm = tk.StringVar(value="Select Algorithm")
        self.dls_limit = tk.IntVar(value=3)
        self.operations_queue = []  # Stores the sequence of operations for step-by-step navigation
        self.current_step = 0
 
        # GUI Layout
        self.style = ttk.Style()
        self.style.configure("TButton", font=("Arial", 12), padding=10)
        self.style.configure("TLabel", font=("Arial", 12))
 
        self.main_frame = ttk.Frame(self.master, style="TFrame")
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
 
        self.canvas_frame = ttk.Frame(self.main_frame)
        self.canvas_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=20)
 
        self.sidebar_frame = tk.Frame(self.main_frame, bg="#D3D3D3")
        self.sidebar_frame.pack(side=tk.LEFT, fill=tk.Y, padx=20)
 
        self.algorithm_menu = tk.OptionMenu(
            self.sidebar_frame, self.current_algorithm, "BFS", "DFS", "DLS"
        )
        self.algorithm_menu.pack(pady=15)
 
        self.dls_limit_label = ttk.Label(self.sidebar_frame, text="Set Depth Limit for DLS:")
        self.dls_limit_label.pack(pady=5)
        self.dls_limit_input = ttk.Entry(self.sidebar_frame, textvariable=self.dls_limit, width=5)
        self.dls_limit_input.pack(pady=5)
 
        self.instruction_label = ttk.Label(self.sidebar_frame, text="Click on nodes to select start and end nodes.")
        self.instruction_label.pack(pady=10)
 
        self.start_button = ttk.Button(self.sidebar_frame, text="Start Algorithm", command=self.start_algorithm)
        self.start_button.pack(pady=10)
 
        self.reset_button = ttk.Button(self.sidebar_frame, text="Reset", command=self.reset)
        self.reset_button.pack(pady=10)
 
        self.next_button = ttk.Button(self.sidebar_frame, text="Next Step", command=self.next_step)
        self.next_button.pack(pady=15)
 
        self.graph_selection_button = ttk.Button(
            self.sidebar_frame, text="Generate Random Graph", command=self.generate_random_graph
        )
        self.graph_selection_button.pack(pady=15)
 
        self.table_frame = ttk.Frame(self.sidebar_frame)
        self.table_frame.pack(pady=10)
        self.treeview = ttk.Treeview(self.table_frame, columns=("Operation", "Node"), show="headings", height=10)
        self.treeview.heading("Operation", text="Operation")
        self.treeview.heading("Node", text="Node")
        self.treeview.pack()
 
        self.canvas = tk.Canvas(self.canvas_frame, width=1000, height=800, bg="white")
        self.canvas.pack()
 
        self.selecting_start = False
        self.selecting_end = False
        self.canvas.bind("<Button-1>", self.select_node)
 
    def generate_random_graph(self):
        """Generate a random graph."""
        self.G.clear()
        self.node_positions.clear()
 
        num_nodes = random.randint(5, 10)
        probability = random.uniform(0.2, 0.6)
        self.G = nx.gnp_random_graph(num_nodes, probability, seed=42)
        self.node_positions = nx.spring_layout(self.G, seed=42)
 
        self.scale_node_positions()
        self.draw_graph()
 
    def scale_node_positions(self):
        """Scale node positions to fit within the canvas size."""
        x_vals = [pos[0] for pos in self.node_positions.values()]
        y_vals = [pos[1] for pos in self.node_positions.values()]
        min_x, max_x = min(x_vals), max(x_vals)
        min_y, max_y = min(y_vals), max(y_vals)
        padding = 50
        canvas_width, canvas_height = 800, 600
 
        for node in self.node_positions:
            x, y = self.node_positions[node]
            scaled_x = padding + (x - min_x) / (max_x - min_x) * (canvas_width - 2 * padding)
            scaled_y = padding + (y - min_y) / (max_y - min_y) * (canvas_height - 2 * padding)
            self.node_positions[node] = (scaled_x, scaled_y)
 
    def select_node(self, event):
        """Select start and end nodes on the canvas."""
        x, y = event.x, event.y
        for node, pos in self.node_positions.items():
            node_x, node_y = int(pos[0]), int(pos[1])
            if abs(node_x - x) < 20 and abs(node_y - y) < 20:
                if not self.selecting_start and not self.selecting_end:
                    self.selecting_start = True
                    self.start_node = node
                    self.instruction_label.config(text="Select the end node.")
                    self.canvas.create_oval(node_x - 12, node_y - 12, node_x + 12, node_y + 12, fill="green", outline="black", tags="start_end")
                    return
                elif self.selecting_start and not self.selecting_end:
                    self.selecting_end = True
                    self.end_node = node
                    self.instruction_label.config(text="Starting algorithm...")
                    self.canvas.create_oval(node_x - 12, node_y - 12, node_x + 12, node_y + 12, fill="red", outline="black", tags="start_end")
                    return
 
    def draw_graph(self):
        """Draw the graph on the canvas."""
        self.canvas.delete("all")
        for node, pos in self.node_positions.items():
            x, y = int(pos[0]), int(pos[1])
            self.canvas.create_oval(x - 10, y - 10, x + 10, y + 10, fill="gray", tags=f"node{node}")
            self.canvas.create_text(x, y - 15, text=str(node), font=("Arial", 14, "bold"), tags=f"node{node}")
 
        for edge in self.G.edges():
            node1, node2 = edge
            x1, y1 = self.node_positions[node1]
            x2, y2 = self.node_positions[node2]
            self.canvas.create_line(x1, y1, x2, y2)
 
    def start_algorithm(self):
        """Initialize the algorithm and prepare for step-by-step execution."""
        if self.start_node is None or self.end_node is None:
            self.instruction_label.config(text="Please select start and end nodes.")
            return
 
        self.visited_nodes.clear()
        self.operations_queue.clear()
        self.current_step = 0
        for row in self.treeview.get_children():
            self.treeview.delete(row)
 
        if self.current_algorithm.get() == "BFS":
            self.prepare_bfs()
        elif self.current_algorithm.get() == "DFS":
            self.prepare_dfs()
        elif self.current_algorithm.get() == "DLS":
            self.prepare_dls(self.dls_limit.get())
 
    def prepare_bfs(self):
        """Prepare BFS operations."""
        queue = [self.start_node]
        parent_map = {self.start_node: None}
        self.visited_nodes.add(self.start_node)
        self.operations_queue.append(("Start", self.start_node))
 
        while queue:
            current_node = queue.pop(0)
            self.operations_queue.append(("Dequeue", current_node))
 
            if current_node == self.end_node:
                self.highlight_path(parent_map)
                break
 
            for neighbor in self.G.neighbors(current_node):
                if neighbor not in self.visited_nodes:
                    queue.append(neighbor)
                    parent_map[neighbor] = current_node
                    self.visited_nodes.add(neighbor)
                    self.operations_queue.append(("Enqueue", neighbor))
 
    def prepare_dfs(self):
        """Prepare DFS operations."""
        stack = [self.start_node]
        parent_map = {self.start_node: None}
        self.visited_nodes.add(self.start_node)
        self.operations_queue.append(("Start", self.start_node))
 
        while stack:
            current_node = stack.pop()
            self.operations_queue.append(("Pop", current_node))
 
            if current_node == self.end_node:
                self.highlight_path(parent_map)
                break
 
            for neighbor in self.G.neighbors(current_node):
                if neighbor not in self.visited_nodes:
                    stack.append(neighbor)
                    parent_map[neighbor] = current_node
                    self.visited_nodes.add(neighbor)
                    self.operations_queue.append(("Push", neighbor))
 
    def prepare_dls(self, depth_limit):
        """Prepare DLS operations."""
        stack = [(self.start_node, 0)]
        parent_map = {self.start_node: None}
        self.visited_nodes.add(self.start_node)
        self.operations_queue.append(("Start", self.start_node))
 
        while stack:
            current_node, depth = stack.pop()
            self.operations_queue.append(("Pop", current_node))
 
            if current_node == self.end_node:
                self.highlight_path(parent_map)
                break
 
            if depth < depth_limit:
                for neighbor in self.G.neighbors(current_node):
                    if neighbor not in self.visited_nodes:
                        stack.append((neighbor, depth + 1))
                        parent_map[neighbor] = current_node
                        self.visited_nodes.add(neighbor)
                        self.operations_queue.append(("Push", neighbor))
 
    def highlight_path(self, parent_map):
        """Highlight the path from start to end."""
        current = self.end_node
        while current is not None:
            parent = parent_map.get(current)
            if parent is not None:
                x1, y1 = self.node_positions[parent]
                x2, y2 = self.node_positions[current]
                self.canvas.create_line(x1, y1, x2, y2, fill=PATH_COLOR, width=3)
            current = parent
 
    def next_step(self):
        """Execute the next step in the operations queue."""
        if self.current_step >= len(self.operations_queue):
            self.instruction_label.config(text="Algorithm Complete.")
            return
 
        operation, node = self.operations_queue[self.current_step]
        self.update_table(operation, node)
        if operation in ("Enqueue", "Dequeue", "Push", "Pop"):
            self.update_canvas(node, visited=(operation == "Dequeue"))
 
        self.current_step += 1
 
    def update_canvas(self, node, visited=False):
        """Update the canvas to reflect the current operation."""
        node_x, node_y = self.node_positions[node]
 
        if visited:
            self.canvas.create_oval(node_x - 10, node_y - 10, node_x + 10, node_y + 10, fill=VISITED_COLOR)
        else:
            self.canvas.create_oval(node_x - 10, node_y - 10, node_x + 10, node_y + 10, fill=CURRENT_COLOR)
 
        self.master.update()
 
    def update_table(self, operation, node):
        """Update the treeview table with the latest operation."""
        self.treeview.insert("", "end", values=(operation, node))
 
    def reset(self):
        """Reset the application to its initial state."""
        # Clear the canvas
        self.canvas.delete("all")
 
        # Reset graph state
        self.visited_nodes.clear()
        self.start_node = None
        self.end_node = None
        self.selecting_start = False
        self.selecting_end = False
        self.operations_queue.clear()
        self.current_step = 0
 
        # Reset instruction label
        self.instruction_label.config(text="Click on nodes to select start and end nodes.")
 
        # Clear the operation table
        self.treeview.delete(*self.treeview.get_children())
 
        # Generate a fresh random graph
        self.generate_random_graph()
 
 
# Run the application
root = tk.Tk()
app = PathfindingApp(root)
root.mainloop()