import React, { useState } from 'react'
import { MOCK_DATA } from '../assets/MOCK_DATA'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
  } from '@tanstack/react-table';
import { useNavigate } from '@tanstack/react-router';

const columns = [
    {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
    },
    {
        accessorKey: 'first_name',
        header: ({ column }) => (
          <button
            type="button"
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-500 font-medium"
          >
            <span>First Name</span>
            {column.getIsSorted() === 'asc' && '↑'}
            {column.getIsSorted() === 'desc' && '↓'}
          </button>
        ),
    },
    {
        accessorKey: 'last_name',
        header: ({ column }) => (
            <button
              type="button"
              onClick={column.getToggleSortingHandler()}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-500 font-medium"
            >
              <span>Last Name</span>
              {column.getIsSorted() === 'asc' && '↑'}
              {column.getIsSorted() === 'desc' && '↓'}
            </button>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-500 font-medium"
          >
            <span>Email</span>
            {column.getIsSorted() === 'asc' && '↑'}
            {column.getIsSorted() === 'desc' && '↓'}
          </button>
        ),
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => (
            <button
              onClick={column.getToggleSortingHandler()}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-500 font-medium"
            >
              <span>Gender</span>
              {column.getIsSorted() === 'asc' && '↑'}
              {column.getIsSorted() === 'desc' && '↓'}
            </button>
        ),
    },
    {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="px-2 py-1 text-sm bg-blue-400 text-white rounded hover:bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="px-2 py-1 text-sm bg-red-400 text-white rounded hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        ),
    },
];
const data = MOCK_DATA;

const handleEdit = (rowData) => {
    console.log("rowData", rowData);
}
const handleDelete = (rowData) => {
    console.log("rowData", rowData);
}

const TestCasesList = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate();
    
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableSorting: true,
        enableRowSelection: true,
        enableGlobalFilter: true,
    })


  return (
    <div className="overflow-x-auto">
        <div className='flex justify-between'>
            <h1 className='text-2xl mb-2'>Test Cases</h1>
            <input
            type="text"
            placeholder="Search..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="mb-4 p-2 border rounded w-full max-w-sm"
            />
            <button type="button" onClick={()=> navigate({to: '/testCases/addTestCase'})} className="h-10 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 me-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Test Case</button>
        </div>
        
      <table className="min-w-full border border-gray-200 text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b font-medium text-gray-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="even:bg-gray-50 hover:bg-gray-100 transition"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
        <pre className="mt-4 text-xs">
         {JSON.stringify(table.getSelectedRowModel().rows.map(row => row.original), null, 2)}
        </pre>
    </div>
  )
}

export default TestCasesList
