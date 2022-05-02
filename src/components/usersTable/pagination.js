import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector
} from "@mui/x-data-grid";
import {Box, FormControl, MenuItem, Pagination, PaginationItem, Select, Typography} from "@mui/material";

const pageSizes = [5, 10, 15];

export default function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const next = () => <Typography>Next</Typography>;
  const previous = () => <Typography>Previous</Typography>;

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography mr={3} ml={13}>
          Records on page
        </Typography>
        <Select
          variant="standard"
          onChange={({ target: { value } }) => {
            apiRef.current.setPageSize(value);
          }}
          value={pageSize || pageSizes[0]}
          default
        >
          {pageSizes.map(count => (
            <MenuItem key={count} value={count}>
              {count}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        shape="rounded"
        variant="standard"
        renderItem={item => <PaginationItem components={{ previous, next }} {...item} />}
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => {
          apiRef.current.setPage(value - 1);
        }}
      />
    </Box>
  );
}
