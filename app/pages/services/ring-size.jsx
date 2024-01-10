import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {BlogSchema} from '~/components/Blogs';

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
  return (
    <BlogSchema
      title="ring size conversion chart"
      classNames={{body: 'overflow-x-visible'}}
    >
      {CustomizedTables()}
    </BlogSchema>
  );
}
