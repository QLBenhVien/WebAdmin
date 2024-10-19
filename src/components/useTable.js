import {
	Table,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

// Sử dụng hook `makeStyles` để tạo các class CSS tùy chỉnh
const useStyles = makeStyles((theme) => ({
	table: {
		marginTop: theme.spacing(3), // Cách lề trên của bảng
		"& thead th": {
			fontWeight: "600", // Định dạng chữ đậm cho tiêu đề cột
			color: "#000000", // Màu chữ chính
			backgroundColor: "#D9D9D9", // Màu nền của tiêu đề cột
		},
		"& tbody td": {
			fontWeight: "300", // Định dạng chữ cho các ô trong body của bảng
		},
		"& tbody tr:hover": {
			backgroundColor: "#fffbf2", // Đổi màu nền khi rê chuột qua hàng
			cursor: "pointer", // Đổi con trỏ chuột thành dạng "tay" khi rê vào hàng
		},
	},
}));

// Custom hook `useTable` để tạo bảng với sorting, pagination và lọc dữ liệu
export default function useTable(records, headCells, filterFn) {
	const classes = useStyles(); // Gọi hàm useStyles để áp dụng các class CSS
	const pages = [5, 10, 25]; // Các tùy chọn số hàng trên mỗi trang
	const [page, setPage] = useState(0); // Trạng thái trang hiện tại
	const [rowsPerPage, setRowsPerPage] = useState(pages[0]); // Trạng thái số hàng trên mỗi trang
	const [order, setOrder] = useState(); // Trạng thái thứ tự sắp xếp (asc/desc)
	const [orderBy, setOrderBy] = useState(); // Trạng thái cột đang được sắp xếp

	// Component chứa bảng
	const TblContainer = (props) => <Table className={classes.table}>{props.children}</Table>;

	// Component tiêu đề cột của bảng
	const TblHead = (props) => {
		// Hàm xử lý khi người dùng yêu cầu sắp xếp
		const handleSortRequest = (cellId) => {
			const isAsc = orderBy === cellId && order === "asc"; // Xác định thứ tự sắp xếp hiện tại
			setOrder(isAsc ? "desc" : "asc"); // Đổi thứ tự sắp xếp giữa tăng dần và giảm dần
			setOrderBy(cellId); // Cập nhật cột đang được sắp xếp
		};

		return (
			<TableHead>
				<TableRow>
					{headCells.map((headCell) => (
						<TableCell
							key={headCell.id}
							sortDirection={orderBy === headCell.id ? order : false}
						>
							{/* Nếu cột không cần sắp xếp thì chỉ hiển thị nhãn */}
							{headCell.disableSorting ? (
								headCell.label
							) : (
								<TableSortLabel
									active={orderBy === headCell.id} // Xác định cột đang được sắp xếp
									direction={orderBy === headCell.id ? order : "asc"} // Xác định hướng sắp xếp
									onClick={() => handleSortRequest(headCell.id)} // Gọi hàm khi người dùng click
								>
									{headCell.label}
								</TableSortLabel>
							)}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	};

	// Hàm xử lý khi người dùng chuyển trang
	const handleChangePage = (event, newPage) => {
		setPage(newPage); // Cập nhật trang hiện tại
	};

	// Hàm xử lý khi người dùng thay đổi số hàng trên mỗi trang
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10)); // Cập nhật số hàng trên mỗi trang
		setPage(0); // Đưa về trang đầu tiên
	};

	// Component hiển thị phân trang
	const TblPagination = () => (
		<TablePagination
			component="div"
			page={page} // Trang hiện tại
			rowsPerPageOptions={pages} // Các tùy chọn số hàng trên mỗi trang
			rowsPerPage={rowsPerPage} // Số hàng hiện tại trên mỗi trang
			count={records.length} // Tổng số bản ghi
			onPageChange={handleChangePage} // Xử lý khi chuyển trang
			onRowsPerPageChange={handleChangeRowsPerPage} // Xử lý khi thay đổi số hàng
		/>
	);

	// Hàm sắp xếp các bản ghi
	function stableSort(array, comparator) {
		const stabilizedThis = array?.map((el, index) => [el, index]); // Ghép mỗi bản ghi với chỉ số của nó
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]); // So sánh các bản ghi
			if (order !== 0) return order;
			return a[1] - b[1]; // Giữ nguyên thứ tự nếu hai bản ghi bằng nhau
		});
		return stabilizedThis.map((el) => el[0]); // Trả về các bản ghi đã sắp xếp
	}

	// Hàm lấy comparator dựa trên hướng sắp xếp
	function getComparator(order, orderBy) {
		return order === "desc"
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	// Hàm so sánh hai bản ghi
	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	// Hàm lấy các bản ghi sau khi đã phân trang và sắp xếp
	const recordsAfterPagingAndSorting = () => {
		return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
			page * rowsPerPage,
			(page + 1) * rowsPerPage
		); // Cắt lấy các bản ghi thuộc trang hiện tại
	};

	// Trả về các component và hàm cần thiết để tạo bảng
	return {
		TblContainer, // Component chứa bảng
		TblHead, // Component tiêu đề cột
		TblPagination, // Component phân trang
		recordsAfterPagingAndSorting, // Hàm lấy dữ liệu sau khi phân trang và sắp xếp
	};
}
