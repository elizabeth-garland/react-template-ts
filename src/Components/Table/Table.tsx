import{ useMemo } from "react";
import { CapitaliseFirstLetter } from "../../Utils/StringUtils";
import "./Table.css";

interface TableProps {
  data: any[];
}

const Table = ({ data }: TableProps) => {
  const columns = useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    const keys = Object.keys(data[0]);
    return keys.map((key) => ({
      Header: CapitaliseFirstLetter(key),
      accessor: key,
    }));
  }, [data]);

  return (
    <div className = "container">
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;