import os
import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to True since we are shipping the built version.
_RELEASE = True

if not _RELEASE:
    # Development mode: connect to the vite dev server
    _component_func = components.declare_component(
        "st_force_graph",
        url="http://localhost:5173",
    )
else:
    # Production mode: serve the build assets
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/dist")
    _component_func = components.declare_component("st_force_graph", path=build_dir)


def st_force_graph(data, key=None):
    """
    Display a force directed graph.

    Parameters
    ----------
    data: dict
        The graph data with "nodes" and "links".
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    None
    """
    component_value = _component_func(data=data, key=key, default=None)
    return component_value
