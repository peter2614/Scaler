import { calculateProfitMargin } from './../utils/utils';

// Canvas library
import CanvasJSReact from './../lib/canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph(props) {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title:{
      text: "Return on Ad Spend (RoAS)",
      fontSize: 25
    },
    axisY: {
      title: "Return On Ad Spend",
      suffix: "%"
    },
    data: [{
      type: "line",
      toolTipContent: "{label}: {y}%",
      dataPoints: [
        { x: 1, y: calculateProfitMargin(props.data['2020-01-01'].revenue, props.data['2020-01-01'].spend) * 100, label: "2020-01-01" },
        { x: 2, y: calculateProfitMargin(props.data['2020-01-02'].revenue, props.data['2020-01-02'].spend) * 100, label: "2020-01-02" },
        { x: 3, y: calculateProfitMargin(props.data['2020-01-03'].revenue, props.data['2020-01-03'].spend) * 100, label: "2020-01-03" },
        { x: 4, y: calculateProfitMargin(props.data['2020-01-04'].revenue, props.data['2020-01-04'].spend) * 100, label: "2020-01-04" },
        { x: 5, y: calculateProfitMargin(props.data['2020-01-05'].revenue, props.data['2020-01-05'].spend) * 100, label: "2020-01-05" },
      ]
    }]
  }
  
  return (
    <div>
      <CanvasJSChart options = {options}
        /* onRef={ref => this.chart = ref} */
      />
    </div>
  );
}

export default Graph;