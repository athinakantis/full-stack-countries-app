import { TestData } from "../types/test";

interface DynamicTableProps {
  data: Array<Record<string, unknown>> | TestData[];
}

export const DynamicTable = ({ data }: DynamicTableProps) => {
  if (!data.length) return null;

  // Get headers from the first data item
  const headers = Object.keys(data[0]);

  // Format cell value based on its type
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "-";
    if (value instanceof Date) return value.toLocaleString();
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return String(value);
  };

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <td key={header}>
                {header.charAt(0).toUpperCase() +
                  header.slice(1).replace(/_/g, " ")}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={`${index}-${header}`}>
                  {formatValue(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
