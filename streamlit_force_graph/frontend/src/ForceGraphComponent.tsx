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

    // We could use theme.textColor for labels if the library supported it easily
    // For now we just use the background color

    return (
      <div style={{ width: "100%", height: height }}>
        <ForceGraph2D
          width={width}
          height={height}
          graphData={data}
          backgroundColor={backgroundColor}
          nodeLabel="label"
          // Add some basic interactivity or styling
          nodeAutoColorBy="group"
          linkDirectionalParticles={2}
        />
      </div>
    )
  }
}

export default withStreamlitConnection(ForceGraphComponent)
