import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';
import {trim} from '~/utils';

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Table = ({
  columnTitles,
  data,
  cellAlign = 'center',
  titleAlign = 'center',
  classNames = {
    columnTitle: '',
    cell: '',
    row: '',
  },
}) => {
  //console.log(cellAlign);
  return (
    <TableContainer className="overflow-scroll w-full">
      <MuiTable aria-label="customized table" className="w-full">
        <TableHead>
          <TableRow>
            {columnTitles.map((item, i) => {
              return (
                <TableCell
                  align={titleAlign}
                  className={trim(
                    `!text-xs !font-optima-medium !font-normal !p-2.5 border-l border-[var(--blog-border-color)] first:border-l-0 text-[var(--blog-text-color)] bg-white ${classNames.cell} ${classNames.columnTitle}`,
                  )}
                  key={i}
                >
                  {typeof item == 'object' ? (
                    <>
                      {item.text} <sup>{item.superText}</sup>
                    </>
                  ) : (
                    item
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow key={i} className={classNames.row}>
              {row.map((item, j) => (
                <TableCell
                  key={j}
                  className={trim(
                    `!text-xs !font-avenir-light !p-2.5 text-[var(--blog-text-color)] ${classNames.cell}`,
                  )}
                  align={cellAlign}
                >
                  {item}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
