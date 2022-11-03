import { Component } from "react";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";

class Charts extends Component {
  render() {
    const { chartData } = this.props;

    return (
      <VictoryChart theme={VictoryTheme.material} domainPadding={0} width={500}>
        <VictoryArea
          data={chartData}
          animate={{
            duration: 3000,
            onLoad: { duration: 2000 },
          }}
          style={{ data: { fill: "#e14127" } }}
          x="name"
          y="total"
        />
      </VictoryChart>
    );
  }
}

export default Charts;
