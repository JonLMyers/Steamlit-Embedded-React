import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import { ReactNode } from "react"
import ForceGraph2D from "react-force-graph-2d"

interface State {
  // Add state variables here if needed
}

class ForceGraphComponent extends StreamlitComponentBase<State> {
  public render = (): ReactNode => {
    // Arguments sent from Python via st_force_graph(data=...)
    // are available in this.props.args
    const data = this.props.args["data"] || { nodes: [], links: [] }
    const width = this.props.width || 600
    const height = 600

    // Streamlit sends the theme info, we can use it to style the graph if we want
    const { theme } = this.props
    const backgroundColor = theme?.backgroundColor || "#ffffff"

    // Check if background is dark to adjust node visibility
    const isDarkTheme = backgroundColor.toLowerCase() !== "#ffffff" && backgroundColor.toLowerCase() !== "#fff";

    return (
      <div style={{ width: "100%", height: height }}>
        <ForceGraph2D
          width={width}
          height={height}
          graphData={data}
          backgroundColor={backgroundColor}
          nodeLabel="label"
          nodeAutoColorBy="group"
          linkDirectionalParticles={2}
          // Interaction: Pin node on drag end
          onNodeDragEnd={(node: any) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          // Visibility: Draw a border around nodes in dark mode
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            if (isDarkTheme) {
              // Draw a ring/border
              const radius = 5; // default nodeRelSize is 4
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.lineWidth = 1 / globalScale;
              ctx.strokeStyle = '#ffffff'; // White border in dark mode
              ctx.stroke();
            }
          }}
        />
      </div>
    )
  }
}

export default withStreamlitConnection(ForceGraphComponent)
