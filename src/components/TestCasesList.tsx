import React from 'react';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useNavigate } from '@tanstack/react-router';
import DataTable from './common/DataTable';
import { MOCK_DATA } from '../assets/MOCK_DATA';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

const TestCasesList = () => {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const data: Person[] = MOCK_DATA;

  const uniqueGenders = React.useMemo(() => Array.from(new Set(data.map(d => d.gender))), [data]);
  const uniqueLastNames = React.useMemo(() => Array.from(new Set(data.map(d => d.last_name))), [data]);

  const columns: ColumnDef<Person>[] = [
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
            filterFn: 'equals'
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
            filterFn: 'equals'
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

  const handleEdit = (row: Person) => console.log('Edit:', row);
  const handleDelete = (row: Person) => console.log('Delete:', row);

  // helper to set specific column filter
  const setColumnFilterValue = (id: string, value: string | undefined) => {
    setColumnFilters(old => {
      const others = old.filter(f => f.id !== id);
      if (!value) return others; // remove filter if empty
      return [...others, { id, value }];
    });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={(columnFilters.find(f => f.id === 'gender')?.value as string) ?? ''}
          onChange={e => setColumnFilterValue('gender', e.target.value || undefined)}
          className="p-2 border rounded"
        >
          <option value="">All Genders</option>
          {uniqueGenders.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={(columnFilters.find(f => f.id === 'last_name')?.value as string) ?? ''}
          onChange={e => setColumnFilterValue('last_name', e.target.value || undefined)}
          className="p-2 border rounded"
        >
          <option value="">All Last Names</option>
          {uniqueLastNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => navigate({ to: '/testCases/addTestCase' })}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Add Test Case
        </button>
      </div>

      
      <DataTable<Person>
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        enableGlobalFilter
        enableRowSelection
        onRowEdit={handleEdit}
        onRowDelete={handleDelete}
      />
    </div>
  );
};

export default TestCasesList;

