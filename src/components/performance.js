import Table from 'react-bootstrap/Table';
import { calculateProfitMargin, calculateWeightedProfitMargin, clickRate, recommendedBudget, getTotalRoAS, getTotalWeightedRoAS, getWeightedAvg } from './../utils/utils';

function Performance(props) {
  return (
    <Table bordered responsive>
      <thead>
        <tr>
          <th></th>
          <th>2020-01-01</th>
          <th>2020-01-02</th>
          <th>2020-01-03</th>
          <th>2020-01-04</th>
          <th>2020-01-05</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Return on Ad Spend</td>
          <td>
            {props.data ? calculateProfitMargin(props.data['2020-01-01'].revenue, props.data['2020-01-01'].spend) : ''}
          </td>
          <td>
            {props.data ? calculateProfitMargin(props.data['2020-01-02'].revenue, props.data['2020-01-02'].spend) : ''}
          </td>
          <td>
            {props.data ? calculateProfitMargin(props.data['2020-01-03'].revenue, props.data['2020-01-03'].spend) : ''}
          </td>
          <td>
            {props.data ? calculateProfitMargin(props.data['2020-01-04'].revenue, props.data['2020-01-04'].spend) : ''}
          </td>
          <td>
            {props.data ? calculateProfitMargin(props.data['2020-01-05'].revenue, props.data['2020-01-05'].spend) : ''}
          </td>
          <td>
            {props.data ? getTotalRoAS(props.data) : ''}
          </td>
        </tr>
        <tr>
          <td>Weighted Return on Ad Spend</td>
          <td>
            {props.data ? calculateWeightedProfitMargin(props.data['2020-01-01'].spend, 4) : ''}
          </td>
          <td>
            {props.data ? calculateWeightedProfitMargin(props.data['2020-01-02'].spend, 3) : ''}
          </td>
          <td>
            {props.data ? calculateWeightedProfitMargin(props.data['2020-01-03'].spend, 2) : ''}
          </td>
          <td>
            {props.data ? calculateWeightedProfitMargin(props.data['2020-01-04'].spend, 1) : ''}
          </td>
          <td>
            {props.data ? calculateWeightedProfitMargin(props.data['2020-01-05'].spend, 0) : ''}
          </td>
          <td>
            {props.data ? getTotalWeightedRoAS(props.data) : ''}
          </td>
        </tr>
        <tr>
          <td>Click Rate</td>
          <td>
            {props.data ? clickRate(props.data['2020-01-01'].impressions, props.data['2020-01-01'].clicks) : ''}
          </td>
          <td>
            {props.data ? clickRate(props.data['2020-01-02'].impressions, props.data['2020-01-02'].clicks) : ''}
          </td>
          <td>
            {props.data ? clickRate(props.data['2020-01-03'].impressions, props.data['2020-01-03'].clicks) : ''}
          </td>
          <td>
            {props.data ? clickRate(props.data['2020-01-04'].impressions, props.data['2020-01-04'].clicks) : ''}
          </td>
          <td>
            {props.data ? clickRate(props.data['2020-01-05'].impressions, props.data['2020-01-05'].clicks) : ''}
          </td>
        </tr>
        <tr>
          <td>Weighted Avg. of RoAS</td>
          <td colSpan="5">
            {props.data ? getWeightedAvg(props.data) : ''}
          </td>
        </tr>
        <tr>
          <td>Current Budget</td>
          <td colSpan="5">
            {props.data ? props.data.budget : ''}
          </td>
        </tr>
        <tr>
          <td>Proposed Budget</td>
          <td colSpan="5">
            {props.data ? recommendedBudget(props.data, props.data.budget) : ''}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Performance;