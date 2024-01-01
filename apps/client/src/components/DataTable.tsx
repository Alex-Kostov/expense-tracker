import * as React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import "./DataTable.scss";

export interface Expenses {
	id: string,
	date: string,
	category: string,
	description: string,
	amount: number,
	transactionType: string,
	vault: string,
}

export interface DataTableProps {
	columns: GridColDef[],
	rows: Expenses[];
}


export default function DataTable({rows, columns}: DataTableProps) {
	return (
		<div>
			<DataGrid
				className="data-table"
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {page: 0, pageSize: 5}
					}
				}}
				pageSizeOptions={[5, 10]}
			/>
		</div>
	);
}
