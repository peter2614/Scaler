import Table from 'react-bootstrap/Table';
import { calculateProfitMargin, calculateWeightedProfitMargin, clickRate, recommendedBudget, getWeightedAvg, roundTwoDec } from './../utils/utils';

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
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Click Rate</th>
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
          <th>RoAS</th>
          <td>
            {props.data ? roundTwoDec(calculateProfitMargin(props.data['2020-01-01'].revenue, props.data['2020-01-01'].spend)*100)+'%' : ''}
          </td>
          <td>
            {props.data ? roundTwoDec(calculateProfitMargin(props.data['2020-01-02'].revenue, props.data['2020-01-02'].spend)*100)+'%' : ''}
          </td>
          <td>
            {props.data ? roundTwoDec(calculateProfitMargin(props.data['2020-01-03'].revenue, props.data['2020-01-03'].spend)*100)+'%' : ''}
          </td>
          <td>
            {props.data ? roundTwoDec(calculateProfitMargin(props.data['2020-01-04'].revenue, props.data['2020-01-04'].spend)*100)+'%' : ''}
          </td>
          <td>
            {props.data ? roundTwoDec(calculateProfitMargin(props.data['2020-01-05'].revenue, props.data['2020-01-05'].spend)*100)+'%' : ''}
          </td>
        </tr>
        <tr>
          <th>Weighted RoAS</th>
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
        </tr>
        <tr>
          <th>Weighted Avg. of RoAS</th>
          <td colSpan="5">
            {props.data ? getWeightedAvg(props.data)+'%' : ''}
          </td>
        </tr>
        <tr>
          <th>Current Budget</th>
          <td colSpan="5">
            {props.data ? '$'+props.data.budget : ''}
          </td>
        </tr>
        <tr>
          <th>Proposed Budget</th>
          <td colSpan="5">
            {props.data ? '$'+recommendedBudget(props.data, props.data.budget) : ''}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Performance;