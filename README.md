# Streamlit Force Graph

This is a Streamlit application that embeds a custom React component using `react-force-graph-2d`.

## Setup

1.  **Install Python Dependencies:**
    ```bash
    pip install streamlit
    ```

2.  **Build Frontend (Optional):**
    The built assets are included in `streamlit_force_graph/frontend/dist`. If you want to modify the frontend code:
    ```bash
    cd streamlit_force_graph/frontend
    npm install
    npm run build
    ```

## Running the App

Run the Streamlit app:
```bash
streamlit run app.py
```

## Structure

-   `app.py`: The main Streamlit application.
-   `streamlit_force_graph/`: The Python package for the custom component.
    -   `frontend/`: The React source code.
    -   `__init__.py`: The Python wrapper for the component.
