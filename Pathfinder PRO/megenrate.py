import tkinter as tk
from tkinter import ttk
import networkx as nx

# Colors for nodes and interface
VISITED_COLOR = '#20B2AA'  
CURRENT_COLOR = '#FFD700'  
PATH_COLOR = '#FF00FF'     
START_COLOR = '#FFA500'    
GOAL_COLOR = '#9370DB'     
BACKGROUND_COLOR = '#F8F9FA'  
GRID_COLOR = '#E5E7EB'     


class PathfindingApp:
    def __init__(self, master):
        self.master = master
        self.master.title("Pathfinding Algorithms")
        self.master.geometry("1200x700")
        self.master.config(bg=BACKGROUND_COLOR)

        # Initialize the graph
        self.G = nx.Graph()
        self.node_positions = {}
        self.start_node = None
        self.end_node = None
        self.selecting_edge = False
        self.selected_node1 = None
        self.visited_nodes = set()
        self.path_nodes = set()
        self.current_algorithm = tk.StringVar(value="Select Algorithm")
        self.operations_queue = []  # Queue to hold operations for next_step
        self.current_step = 0  # To keep track of the current step in the queue

        # Main layout frames
        self.main_frame = ttk.Frame(self.master)
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        self.canvas_frame = ttk.Frame(self.main_frame)
        self.canvas_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=20)

        self.sidebar_frame = ttk.Frame(self.main_frame, padding=(15, 10))
        self.sidebar_frame.pack(side=tk.LEFT, fill=tk.Y, padx=20, pady=20)

        # Sidebar elements
        title = ttk.Label(self.sidebar_frame, text="Pathfinding Visualizer", font=("Helvetica", 16, "bold"))
        title.pack(pady=(0, 20))

        algo_label = ttk.Label(self.sidebar_frame, text="Select Algorithm:", font=("Helvetica", 12))
        algo_label.pack()
        self.algorithm_menu = tk.OptionMenu(self.sidebar_frame, self.current_algorithm, "BFS", "DFS")
        self.algorithm_menu.config(width=15)
        self.algorithm_menu.pack(pady=(5, 15))

        self.start_button = ttk.Button(self.sidebar_frame, text="Start Algorithm", command=self.start_algorithm)
        self.start_button.pack(pady=10)

        self.reset_button = ttk.Button(self.sidebar_frame, text="Reset", command=self.reset)
        self.reset_button.pack(pady=10)

        self.next_step_button = ttk.Button(self.sidebar_frame, text="Next Step", command=self.next_step, state=tk.DISABLED)
        self.next_step_button.pack(pady=10)

        self.toggle_edge_button = ttk.Button(self.sidebar_frame, text="Toggle Edge Creation Mode", command=self.toggle_edge_mode)
        self.toggle_edge_button.pack(pady=10)

        self.select_start_button = ttk.Button(self.sidebar_frame, text="Select Start Node", command=self.enable_select_start)
        self.select_start_button.pack(pady=5)

        self.select_goal_button = ttk.Button(self.sidebar_frame, text="Select Goal Node", command=self.enable_select_goal)
        self.select_goal_button.pack(pady=5)

        self.table_frame = ttk.LabelFrame(self.sidebar_frame, text="Stack/Queue Operations", padding=(10, 5))
        self.table_frame.pack(pady=(15, 10), fill=tk.X)
        self.treeview = ttk.Treeview(self.table_frame, columns=("Operation", "Node"), show="headings", height=8)
        self.treeview.heading("Operation", text="Operation")
        self.treeview.heading("Node", text="Node")
        self.treeview.pack(fill=tk.X)

        self.instruction_label = ttk.Label(self.sidebar_frame, text="Click on the canvas to add nodes.", wraplength=180)
        self.instruction_label.pack(pady=(15, 10))

        self.canvas = tk.Canvas(self.canvas_frame, width=800, height=600, bg="white")
        self.canvas.pack(fill=tk.BOTH, expand=True)
        self.draw_grid()

        self.canvas.bind("<Button-1>", self.select_node)

        self.selecting_start = False
        self.selecting_goal = False

    def draw_grid(self):
        for i in range(0, 800, 20):
            self.canvas.create_line([(i, 0), (i, 600)], fill=GRID_COLOR, tags='grid_line')
        for i in range(0, 600, 20):
            self.canvas.create_line([(0, i), (800, i)], fill=GRID_COLOR, tags='grid_line')

    def enable_select_start(self):
        self.selecting_start = True
        self.selecting_goal = False
        self.instruction_label.config(text="Click on a node to set it as the start node.")

    def enable_select_goal(self):
        self.selecting_goal = True
        self.selecting_start = False
        self.instruction_label.config(text="Click on a node to set it as the goal node.")

    def select_node(self, event):
        x, y = event.x, event.y
        if self.selecting_edge:
            self.handle_edge_creation(x, y)
            return

        if self.selecting_start or self.selecting_goal:
            selected_node = self.get_node_at_position(x, y)
            if selected_node:
                if self.selecting_start:
                    self.start_node = selected_node
                    self.update_canvas(selected_node, color=START_COLOR)
                    self.instruction_label.config(text="Start node selected.")
                    self.selecting_start = False
                elif self.selecting_goal:
                    self.end_node = selected_node
                    self.update_canvas(selected_node, color=GOAL_COLOR)
                    self.instruction_label.config(text="Goal node selected.")
                    self.selecting_goal = False
            return

        node_name = f"Node{len(self.node_positions) + 1}"
        self.node_positions[node_name] = (x, y)
        self.draw_graph()

    def handle_edge_creation(self, x, y):
        if self.selected_node1 is None:
            self.selected_node1 = self.get_node_at_position(x, y)
            if self.selected_node1:
                self.instruction_label.config(text="Click on another node to create the edge.")
        else:
            selected_node2 = self.get_node_at_position(x, y)
            if selected_node2 and selected_node2 != self.selected_node1:
                self.G.add_edge(self.selected_node1, selected_node2)
                self.canvas.create_line(
                    self.node_positions[self.selected_node1][0], self.node_positions[self.selected_node1][1],
                    self.node_positions[selected_node2][0], self.node_positions[selected_node2][1],
                    fill="black", width=2
                )
                self.selected_node1 = None
                self.selecting_edge = False
                self.instruction_label.config(text="Edge created.")

    def get_node_at_position(self, x, y):
        for node, pos in self.node_positions.items():
            node_x, node_y = pos
            if abs(node_x - x) < 20 and abs(node_y - y) < 20:
                return node
        return None

    def draw_graph(self):
        self.canvas.delete("all")
        self.draw_grid()
        for node, pos in self.node_positions.items():
            x, y = pos
            color = "gray"
            if node == self.start_node:
                color = START_COLOR
            elif node == self.end_node:
                color = GOAL_COLOR
            elif node in self.visited_nodes:
                color = VISITED_COLOR
            elif node in self.path_nodes:
                color = PATH_COLOR
            self.canvas.create_oval(x-10, y-10, x+10, y+10, fill=color, tags=f"node_{node}")
            self.canvas.create_text(x, y-15, text=node, font=("Arial", 14, "bold"), tags=f"node_{node}")

        for edge in self.G.edges:
            node1, node2 = edge
            x1, y1 = self.node_positions[node1]
            x2, y2 = self.node_positions[node2]
            self.canvas.create_line(x1, y1, x2, y2, fill="black", width=2)

    def start_algorithm(self):
        self.visited_nodes.clear()
        self.path_nodes.clear()
        self.current_step = 0
        self.operations_queue.clear()
        self.treeview.delete(*self.treeview.get_children())

        self.start_button.config(state=tk.DISABLED)
        self.reset_button.config(state=tk.DISABLED)
        self.next_step_button.config(state=tk.NORMAL)

        algorithm = self.current_algorithm.get()

        if algorithm == "BFS":
            self.bfs(self.start_node)
        elif algorithm == "DFS":
            self.dfs(self.start_node)

    def bfs(self, start_node):
        queue = [start_node]
        visited = set([start_node])
        self.operations_queue.append(("Start", start_node))
        while queue:
            node = queue.pop(0)
            self.visited_nodes.add(node)
            self.update_canvas(node, color=VISITED_COLOR)
            self.operations_queue.append(("Dequeue", node))
            for neighbor in self.G.neighbors(node):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    self.operations_queue.append(("Enqueue", neighbor))

    def dfs(self, start_node):
        stack = [start_node]
        visited = set([start_node])
        self.operations_queue.append(("Start", start_node))
        while stack:
            node = stack.pop()
            self.visited_nodes.add(node)
            self.update_canvas(node, color=VISITED_COLOR)
            self.operations_queue.append(("pop", node))
            for neighbor in self.G.neighbors(node):
                if neighbor not in visited:
                    visited.add(neighbor)
                    stack.append(neighbor)
                    self.operations_queue.append(("push", neighbor))

    def next_step(self):
        if self.current_step < len(self.operations_queue):
            operation, node = self.operations_queue[self.current_step]
            self.treeview.insert("", "end", values=(operation, node))

            if operation in {"pop","Dequeue"}:
                self.update_canvas(node, color=VISITED_COLOR)
            elif operation in {"push", "Enqueue"}:
                self.update_canvas(node, color=CURRENT_COLOR)

            self.current_step += 1
        else:
            self.next_step_button.config(state=tk.DISABLED)
            self.start_button.config(state=tk.NORMAL)
            self.reset_button.config(state=tk.NORMAL)
            self.instruction_label.config(text="Algorithm execution completed!")

    def reset(self):
        self.G.clear()
        self.node_positions.clear()
        self.start_node = None
        self.end_node = None
        self.visited_nodes.clear()
        self.path_nodes.clear()
        self.current_step = 0
        self.operations_queue.clear()
        self.treeview.delete(*self.treeview.get_children())
        self.selecting_edge = False
        self.selected_node1 = None
        self.selecting_start = False
        self.selecting_goal = False
        self.start_button.config(state=tk.NORMAL)
        self.reset_button.config(state=tk.NORMAL)
        self.next_step_button.config(state=tk.DISABLED)
        self.instruction_label.config(text="Click on the canvas to add nodes.")
        self.draw_graph()

    def update_canvas(self, node, color):
        x, y = self.node_positions[node]
        self.canvas.create_oval(x-10, y-10, x+10, y+10, fill=color, tags=f"node_{node}")

    def toggle_edge_mode(self):
        self.selecting_edge = not self.selecting_edge
        self.instruction_label.config(text="Edge creation mode activated. Click two nodes to create an edge."
                               if self.selecting_edge else "Edge creation mode deactivated.")

# Run the application
root = tk.Tk()
app = PathfindingApp(root)
root.mainloop()