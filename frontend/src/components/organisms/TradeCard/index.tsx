import { DataGrid, GridColDef } from '@mui/x-data-grid'
interface TableProps {
  columns: GridColDef[]
  rows: Array<object>
  tableWidth: any
  handleTradeRowClick?: any
}

const TradeCard = (props: TableProps) => {
  return (
    <DataGrid
      disableColumnMenu
      disableRowSelectionOnClick
      onRowClick={props.handleTradeRowClick}
      sx={{ width: props.tableWidth, height: '75vh' }}
      rowHeight={50}
      rows={props.rows}
      columns={props.columns}
      hideFooter
    />
  )
}

export default TradeCard
