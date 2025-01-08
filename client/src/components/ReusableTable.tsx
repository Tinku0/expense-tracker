interface Column<T> {
  Header: string;
  accessor: keyof T;
  Cell?: (value: T[keyof T], row: T) => JSX.Element; // Cell renderer for custom content
}

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (row: T) => JSX.Element; // Custom actions like Edit/Delete
}

const ReusableTable = <T extends Record<string, any>>({
  columns,
  data,
  actions,
}: ReusableTableProps<T>) => {
  return (
    <div className="bg-gray-50 shadow-sm rounded-lg overflow-x-auto">
      {data.length !== 0 ? (
        <>
          {/* Desktop Table */}
          <table className="min-w-full bg-white hidden md:table">
            <thead className="bg-gray-800 text-white">
              <tr>
                {columns.map((column) => (
                  <th key={String(column.accessor)} className="py-2 px-4 text-left">
                    {column.Header}
                  </th>
                ))}
                {actions && <th className="py-2 px-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-gray-100">
                  {columns.map((column) => (
                    <td key={String(column.accessor)} className="py-2 px-4">
                      {column.Cell
                        ? column.Cell(row[column.accessor], row)
                        : String(row[column.accessor] ?? '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="flex items-center justify-center py-2 px-4 space-x-2">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile List */}
          <div className="md:hidden">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="border-b p-4 hover:bg-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    {columns.map((column) => (
                      <div key={String(column.accessor)} className="mb-2">
                        <strong>{column.Header}:</strong>{' '}
                        {column.Cell
                          ? column.Cell(row[column.accessor], row)
                          : String(row[column.accessor] ?? '')}
                      </div>
                    ))}
                  </div>
                  {actions && <div>{actions(row)}</div>}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-3">No Data Available</div>
      )}
    </div>
  );
};

export default ReusableTable;
