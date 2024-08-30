import React, {useState, useEffect} from 'react';
import { tokens } from "../../theme";
import { Box, useTheme, Typography} from "@mui/material";
import { Header } from "../../components";
import { mockArticleData } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import Button from '@mui/material/Button';
import { AddOutlined } from "@mui/icons-material";


const Content = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State variables to manage data, loading state, and pagination
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    // Function to fetch data from the server based on the page
    const fetchData = async (page, size) => {
        setLoading(true);
        try {
        const response = await axios.get('https://api.example.com/data', {
            params: {
            page: page + 1, // Convert to 1-indexed for API
            limit: size,
            },
        });
            setRows(response.data.results); // Adjust according to your API response structure
            setTotalRows(response.data.total); // Total rows count from API response
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data whenever page or page size changes
    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    // Handler for page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Handler for page size change
    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setCurrentPage(0); // Reset to first page when page size changes
    };

    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "title",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "sub_title",
          headerName: "Age",
          type: "number",
          headerAlign: "left",
          align: "left",
        },
        { field: "summary", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
          field: "access",
          headerName: "Access Level",
          flex: 1,
          renderCell: ({ row: { access } }) => {
            return (
              <Box
                width="120px"
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                bgcolor={
                  access === "admin"
                    ? colors.greenAccent[600]
                    : colors.greenAccent[700]
                }
                borderRadius={1}
              >
                {access === "admin" && <AdminPanelSettingsOutlined />}
                {access === "manager" && <SecurityOutlined />}
                {access === "user" && <LockOpenOutlined />}
                <Typography textTransform="capitalize">{access}</Typography>
              </Box>
            );
          },
        },
    ];

    return (
        <>
        <Box m="20px">
            <Header
                title="Content"
                subtitle="Article Details"
            />
            <Box
                mt="40px"
                height="75vh"
                maxWidth="100%"
                sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    border: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-iconSeparator": {
                    color: colors.primary[100],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.gray[100]} !important`,
                },
                }}
            >
                <div>
                    <Button margin="1rem" variant="outlined" color="success"><AddOutlined /> New</Button>
                </div>
                <DataGrid
                    rows={mockArticleData}
                    columns={columns}
                    pagination
                    paginationMode="server" // Enable server-side pagination
                    rowCount={totalRows}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    loading={loading}
                    page={currentPage}
                />
            </Box>
        </Box>
        </>
    )
}

export default Content;