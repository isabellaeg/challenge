import React, { useState, useCallback, Fragment} from "react";

import Cell from "../Cell/Cell";
import { StyledSheet } from "./Spreadsheet.styled";

const getColumnName = index =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Spreadsheet = ({ rows, columns }) => {
  const [data, setData] = useState({});

  const handleCellChange = useCallback(
    ({ row, column, value }) => {
      const newData = { ...data };

      newData[`${column}${row}`] = value;
      setData(newData);
    },
    [data, setData]
  );

  const computeCell = useCallback(
    ({ row, column }) => {
      const cellContent = data[`${column}${row}`];
      if (cellContent) {
        if (cellContent.charAt(0) === "=") {
          const expression = cellContent.substr(1).split(/([+*-])/g);
          let newExpression = "";
          expression.forEach(item => {
            
            if (/^[A-z][0-9]$/g.test(item || "")) {
              newExpression += data[(item || "").toUpperCase()] || 0;
            } else {
              newExpression += item;
            }
          });

          try {
            return eval(newExpression);
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
      return "";
    },
    [data]
  );

  return (
    <StyledSheet numberOfColumns={columns}>
      {Array(rows)
        .fill()
        .map((m, i) => {
          return (
            <Fragment key={i}>
              {Array(columns)
                .fill()
                .map((n, j) => {
                  const columnName = getColumnName(j);
                  return (
                    <Cell
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      handleCellChange={handleCellChange}
                      currentValue={data[`${columnName}${i}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                    />
                  );
                })}
            </Fragment>
          );
        })}
    </StyledSheet>
  );
};

export default Spreadsheet;