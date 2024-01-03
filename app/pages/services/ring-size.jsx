import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import Schema1 from '../../components/Blogs/Schema1';

import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {},
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const meta = ({data}) => {
  return [{title: `Jewelry Care`.toUpperCase() + ' - Vianisa'}];
};

export async function loader({params, context}) {
  return json({});
}
function createData(
  inside_in,
  inside_mm,
  diameter,
  us_canada,
  europa,
  uk_aust,
  japan,
) {
  return {inside_in, inside_mm, diameter, us_canada, europa, uk_aust, japan};
}
function CustomizedTables() {
  const rows = [
    createData(1.74, 44.3, 14, 3, 44, 'F 1/2', 4),
    createData(1.77, 44.9, 14.3, 3.3, 45, 'G', 5),
    createData(1.79, 45.6, 14.5, 3.5, null, 'G 1/2', null),
    createData(1.82, 46.2, 14.7, 3.8, 46, 'H', 6),
    createData(1.84, 46.8, 14.9, 4, 47, 'H 1/2', 7),
    createData(1.87, 47.4, 15.1, 4.3, null, 'I', null),
    createData(1.89, 48.1, 15.3, 4.5, 48, 'I 1/2', 8),
    createData(1.92, 48.7, 15.5, 4.8, null, 'J', null),
    createData(1.94, 49.3, 15.7, 5, 49, 'J 1/2', 9),
    createData(1.97, 50.0, 15.9, 5.3, 50, 'K'),
    createData(1.99, 50.6, 16.1, 5.5, null, 'K 1/2', 10),
    createData(2.02, 51.2, 16.3, 5.8, 51, 'L'),
    createData(2.04, 51.8, 16.5, 6, 52, 'L 1/2', 11),
    createData(2.07, 52.5, 16.7, 6.3, null, 'M', 12),
    createData(2.09, 53.1, 16.9, 6.5, 53, 'M 1/2', 13),
    createData(2.12, 53.7, 17.1, 6.8, null, 'N', null),
    createData(2.14, 54.3, 17.3, 7, 54, 'N 1/2', 14),
    createData(2.16, 55.0, 17.5, 7.3, 55, 'O', null),
    createData(2.19, 55.6, 17.7, 7.5, null, 'O 1/2', 15),
    createData(2.21, 56.2, 17.9, 7.8, 56, 'P', null),
    createData(2.24, 56.9, 18.1, 8, 57, 'P 1/2', 16),
    createData(2.26, 57.5, 18.3, 8.3, null, 'Q', null),
    createData(2.29, 58.1, 18.5, 8.5, 58, 'Q 1/2', 17),
    createData(2.33, 59.1, 18.8, 8.8, 59, 'R'),
    createData(2.35, 59.7, 19, 9, null, 'R 1/2', 18),
    createData(2.37, 60.3, 19.2, 9.3, 60, 'S'),
    createData(2.4, 60.9, 19.4, 9.5, 61, 'S 1/2', 19),
    createData(2.42, 61.6, 19.6, 9.8, null, 'T', null),
    createData(2.45, 62.2, 19.8, 10, 62, 'T 1/2', 20),
    createData(2.47, 62.8, 20, 10.3, null, 'U', 21),
    createData(2.5, 63.5, 20.2, 10.5, 63, 'U 1/2', 22),
    createData(2.52, 64.1, 20.4, 10.8, 64, 'V'),
    createData(2.55, 64.7, 20.6, 11, null, 'V 1/2', 23),
    createData(2.57, 65.3, 20.8, 11.3, 65, 'W'),
    createData(2.6, 66.0, 21, 11.5, 66, 'W 1/2', 24),
    createData(2.62, 66.6, 21.2, 11.8, null, 'X', null),
    createData(2.65, 67.2, 21.4, 12, 67, 'X 1/2', 25),
    createData(2.67, 67.9, 21.6, 12.3, null, 'Y', null),
    createData(2.7, 68.5, 21.8, 12.5, 68, 'Z', 26),
    createData(2.72, 69.1, 22, 12.8, 69, 'Z 1/2', null),
    createData(2.75, 69.7, 22.2, 13, 70, '', 27),
    createData(2.77, 70.4, 22.4, 13.3, null, 'Z+1', null),
    createData(2.8, 71.0, 22.6, 13.5, null, 'Z+2', null),
  ];
  return (
    <TableContainer className="overflow-scroll 2xl:min-w-[1000px]">
      <Table aria-label="customized table" className=" max-sm:!w-[1000px]">
        <TableHead>
          <TableRow>
            <StyledTableCell
              align="center"
              colspan="2"
              className="max-md:!text-xs !p-2"
            >
              Inside Circumference
            </StyledTableCell>
            <StyledTableCell
              align="center"
              className="max-md:!text-xs !p-2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              Inside Diameter
            </StyledTableCell>
            <StyledTableCell
              align="center"
              rowspan="2"
              className="max-md:!text-xs !p-2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              US &amp; Canada
            </StyledTableCell>
            <StyledTableCell
              align="center"
              className="max-md:!text-xs !p-2"
              rowspan="2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              Europe
            </StyledTableCell>
            <StyledTableCell
              align="center"
              rowspan="2"
              className="max-md:!text-xs !p-2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              UK &amp; Australia
            </StyledTableCell>
            <StyledTableCell
              align="center"
              rowspan="2"
              className="max-md:!text-xs !p-2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              Japan &amp; Singapore
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center" className="max-md:!text-xs !p-2">
              IN
            </StyledTableCell>
            <StyledTableCell
              align="center"
              className="max-md:!text-xs !p-2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              MM
            </StyledTableCell>
            <StyledTableCell
              align="center"
              className="max-md:!text-xs !p-2"
              sx={{borderLeft: 1, borderColor: 'rgb(224,224,224,1)'}}
            >
              MM
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idex) => (
            <StyledTableRow key={idex}>
              <StyledTableCell
                className="max-md:!text-xs !p-2"
                component="th"
                scope="row"
              >
                {row.inside_in}
              </StyledTableCell>
              <StyledTableCell className="max-md:!text-xs !p-2" align="center">
                {row.inside_mm}
              </StyledTableCell>
              <StyledTableCell className="max-md:!text-xs !p-2" align="center">
                {row.diameter}
              </StyledTableCell>
              <StyledTableCell className="max-md:!text-xs !p-2" align="center">
                {row.us_canada}
              </StyledTableCell>
              <StyledTableCell className="max-md:!text-xs !p-2" align="center">
                {row.europa}
              </StyledTableCell>
              <StyledTableCell className="max-md:!text-xs !p-2" align="center">
                {row.uk_aust}
              </StyledTableCell>
              <StyledTableCell className="max-md:!text-xs !p-2" align="center">
                {row.japan}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function Page() {
  let newkomp = (
    <div class="overflow-x-auto">
      <table className="table-auto  min-w-full overflow-x-scroll justify-center text-center">
        <thead className="text-xs border-2 content-center justify-center text-center">
          <tr className="border-2 px-4 py-2">
            <th className="border-2 " colspan="2">
              Inside Circumference
            </th>
            <th>Inside Diameter</th>
            <th className="border-2 " rowspan="2">
              US &amp; Canada
            </th>
            <th className="border-2 " rowspan="2">
              Europe
            </th>
            <th className="border-2 " rowspan="2">
              UK &amp; Australia
            </th>
            <th className="border-2 " rowspan="2">
              Japan &amp; Singapore
            </th>
          </tr>
          <tr className="border-2 px-4 py-2">
            <th className="border-2 ">IN</th>
            <th className="border-2 ">MM</th>
            <th className="border-2 ">MM</th>
          </tr>
        </thead>
        <tbody className="text-xs border-2 content-center justify-center text-center">
          <tr className="border-2">
            <td>1,74</td>
            <td>44,3</td>
            <td>14,1</td>
            <td>3</td>
            <td>44</td>
            <td>F 1/2</td>
            <td>4</td>
          </tr>
          <tr className="border-2">
            <td>1,77</td>
            <td>44,9</td>
            <td>14,3</td>
            <td>3,25</td>
            <td>45</td>
            <td>G</td>
            <td>5</td>
          </tr>
          <tr className="border-2">
            <td>1,79</td>
            <td>45,6</td>
            <td>14,5</td>
            <td>3,5</td>
            <td></td>
            <td>G 1/2</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>1,82</td>
            <td>46,2</td>
            <td>14,7</td>
            <td>3,75</td>
            <td>46</td>
            <td>H</td>
            <td>6</td>
          </tr>
          <tr className="border-2">
            <td>1,84</td>
            <td>46,8</td>
            <td>14,9</td>
            <td>4</td>
            <td>47</td>
            <td>H 1/2</td>
            <td>7</td>
          </tr>
          <tr className="border-2">
            <td>1,87</td>
            <td>47,4</td>
            <td>15,1</td>
            <td>4,25</td>
            <td></td>
            <td>I</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>1,89</td>
            <td>48,1</td>
            <td>15,3</td>
            <td>4,5</td>
            <td>48</td>
            <td>I 1/2</td>
            <td>8</td>
          </tr>
          <tr className="border-2">
            <td>1,92</td>
            <td>48,7</td>
            <td>15,5</td>
            <td>4,75</td>
            <td></td>
            <td>J</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>1,94</td>
            <td>49,3</td>
            <td>15,7</td>
            <td>5</td>
            <td>49</td>
            <td>J 1/2</td>
            <td>9</td>
          </tr>
          <tr className="border-2">
            <td>1,97</td>
            <td>50,0</td>
            <td>15,9</td>
            <td>5,25</td>
            <td>50</td>
            <td>K</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>1,99</td>
            <td>50,6</td>
            <td>16,1</td>
            <td>5,5</td>
            <td></td>
            <td>K 1/2</td>
            <td>10</td>
          </tr>
          <tr className="border-2">
            <td>2,02</td>
            <td>51,2</td>
            <td>16,3</td>
            <td>5,75</td>
            <td>51</td>
            <td>L</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,04</td>
            <td>51,8</td>
            <td>16,5</td>
            <td>6</td>
            <td>52</td>
            <td>L 1/2</td>
            <td>11</td>
          </tr>
          <tr className="border-2">
            <td>2,07</td>
            <td>52,5</td>
            <td>16,7</td>
            <td>6,25</td>
            <td></td>
            <td>M</td>
            <td>12</td>
          </tr>
          <tr className="border-2">
            <td>2,09</td>
            <td>53,1</td>
            <td>16,9</td>
            <td>6,5</td>
            <td>53</td>
            <td>M 1/2</td>
            <td>13</td>
          </tr>
          <tr className="border-2">
            <td>2,12</td>
            <td>53,7</td>
            <td>17,1</td>
            <td>6,75</td>
            <td></td>
            <td>N</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,14</td>
            <td>54,3</td>
            <td>17,3</td>
            <td>7</td>
            <td>54</td>
            <td>N 1/2</td>
            <td>14</td>
          </tr>
          <tr className="border-2">
            <td>2,16</td>
            <td>55,0</td>
            <td>17,5</td>
            <td>7,25</td>
            <td>55</td>
            <td>O</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,19</td>
            <td>55,6</td>
            <td>17,7</td>
            <td>7,5</td>
            <td></td>
            <td>O 1/2</td>
            <td>15</td>
          </tr>
          <tr className="border-2">
            <td>2,21</td>
            <td>56,2</td>
            <td>17,9</td>
            <td>7,75</td>
            <td>56</td>
            <td>P</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,24</td>
            <td>56,9</td>
            <td>18,1</td>
            <td>8</td>
            <td>57</td>
            <td>P 1/2</td>
            <td>16</td>
          </tr>
          <tr className="border-2">
            <td>2,26</td>
            <td>57,5</td>
            <td>18,3</td>
            <td>8,25</td>
            <td></td>
            <td>Q</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,29</td>
            <td>58,1</td>
            <td>18,5</td>
            <td>8,5</td>
            <td>58</td>
            <td>Q 1/2</td>
            <td>17</td>
          </tr>
          <tr className="border-2">
            <td>2,33</td>
            <td>59,1</td>
            <td>18,8</td>
            <td>8,75</td>
            <td>59</td>
            <td>R</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,35</td>
            <td>59,7</td>
            <td>19</td>
            <td>9</td>
            <td></td>
            <td>R 1/2</td>
            <td>18</td>
          </tr>
          <tr className="border-2">
            <td>2,37</td>
            <td>60,3</td>
            <td>19,2</td>
            <td>9,25</td>
            <td>60</td>
            <td>S</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,40</td>
            <td>60,9</td>
            <td>19,4</td>
            <td>9,5</td>
            <td>61</td>
            <td>S 1/2</td>
            <td>19</td>
          </tr>
          <tr className="border-2">
            <td>2,42</td>
            <td>61,6</td>
            <td>19,6</td>
            <td>9,75</td>
            <td></td>
            <td>T</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,45</td>
            <td>62,2</td>
            <td>19,8</td>
            <td>10</td>
            <td>62</td>
            <td>T 1/2</td>
            <td>20</td>
          </tr>
          <tr className="border-2">
            <td>2,47</td>
            <td>62,8</td>
            <td>20</td>
            <td>10,25</td>
            <td></td>
            <td>U</td>
            <td>21</td>
          </tr>
          <tr className="border-2">
            <td>2,50</td>
            <td>63,5</td>
            <td>20,2</td>
            <td>10,5</td>
            <td>63</td>
            <td>U 1/2</td>
            <td>22</td>
          </tr>
          <tr className="border-2">
            <td>2,52</td>
            <td>64,1</td>
            <td>20,4</td>
            <td>10,75</td>
            <td>64</td>
            <td>V</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,55</td>
            <td>64,7</td>
            <td>20,6</td>
            <td>11</td>
            <td></td>
            <td>V 1/2</td>
            <td>23</td>
          </tr>
          <tr className="border-2">
            <td>2,57</td>
            <td>65,3</td>
            <td>20,8</td>
            <td>11,25</td>
            <td>65</td>
            <td>W</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,60</td>
            <td>66,0</td>
            <td>21</td>
            <td>11,5</td>
            <td>66</td>
            <td>W 1/2</td>
            <td>24</td>
          </tr>
          <tr className="border-2">
            <td>2,62</td>
            <td>66,6</td>
            <td>21,2</td>
            <td>11,75</td>
            <td></td>
            <td>X</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,65</td>
            <td>67,2</td>
            <td>21,4</td>
            <td>12</td>
            <td>67</td>
            <td>X 1/2</td>
            <td>25</td>
          </tr>
          <tr className="border-2">
            <td>2,67</td>
            <td>67,9</td>
            <td>21,6</td>
            <td>12,25</td>
            <td></td>
            <td>Y</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,70</td>
            <td>68,5</td>
            <td>21,8</td>
            <td>12,5</td>
            <td>68</td>
            <td>Z</td>
            <td>26</td>
          </tr>
          <tr className="border-2">
            <td>2,72</td>
            <td>69,1</td>
            <td>22</td>
            <td>12,75</td>
            <td>69</td>
            <td>Z 1/2</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,75</td>
            <td>69,7</td>
            <td>22,2</td>
            <td>13</td>
            <td>70</td>
            <td></td>
            <td>27</td>
          </tr>
          <tr className="border-2">
            <td>2,77</td>
            <td>70,4</td>
            <td>22,4</td>
            <td>13,25</td>
            <td></td>
            <td>Z+1</td>
            <td></td>
          </tr>
          <tr className="border-2">
            <td>2,80</td>
            <td>71,0</td>
            <td>22,6</td>
            <td>13,5</td>
            <td></td>
            <td>Z+2</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className=" page max-w-[1920px] m-auto px-[20px] pb-20 ">
      <Schema1
        title="refund policy"
        className=" !max-w-[1400px] overflow-x-visible"
        children={CustomizedTables()}
      />
    </div>
  );
}
