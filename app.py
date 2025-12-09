import streamlit as st
import random
from streamlit_force_graph import st_force_graph

st.set_page_config(page_title="Streamlit Force Graph", layout="wide")

st.title("Network Graph Visualization")
st.write("This is a custom component wrapping `react-force-graph-2d`.")

# Generate mock data
@st.cache_data
def get_graph_data(num_nodes=50, num_links=80):
    nodes = [{"id": f"id{i}", "label": f"Node {i}", "group": random.randint(1, 5)} for i in range(num_nodes)]
    links = []
    for _ in range(num_links):
        source = f"id{random.randint(0, num_nodes - 1)}"
        target = f"id{random.randint(0, num_nodes - 1)}"
        if source != target:
            links.append({"source": source, "target": target})

    return {"nodes": nodes, "links": links}

# Sidebar controls
num_nodes = st.sidebar.slider("Number of Nodes", 10, 200, 50)
num_links = st.sidebar.slider("Number of Links", 10, 500, 80)

if st.sidebar.button("Regenerate Data"):
    st.cache_data.clear()

data = get_graph_data(num_nodes, num_links)

# Display the graph
st_force_graph(data=data)

st.write("### Graph Data Preview")
st.json(data, expanded=False)
