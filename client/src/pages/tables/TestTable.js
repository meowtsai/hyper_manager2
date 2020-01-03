import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
function TestTable() {
  /**
   * Mock data
   */
  const [tableData, SetTableData] = useState([
    { name: "User 1", tech: "VueJS", id: 1 },
    { name: "User 2", tech: "ReactJS", id: 2 },
    { name: "User 3", tech: "React Native", id: 3 },
    { name: "User 4", tech: "VueJS", id: 4 },
    { name: "User 5", tech: "ReactJS", id: 5 },
    { name: "User 6", tech: "React Native", id: 6 },
    { name: "User 7", tech: "VueJS", id: 7 },
    { name: "User 8", tech: "ReactJS", id: 8 },
    { name: "User 9", tech: "React Native", id: 9 },
    { name: "User 10", tech: "VueJS", id: 10 },
    { name: "User 11", tech: "ReactJS", id: 11 },
    { name: "User 12", tech: "React Native", id: 12 }
  ]);

  const [checkedCase, setCheckedCase] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const selectAll = e => {
    if (e.target.checked) {
      setCheckedCase(
        tableData
          .slice(
            (pageNumber - 1) * pageSize,
            (pageNumber - 1) * pageSize + pageSize
          )
          .map(item => item.id)
      );
    } else {
      setCheckedCase([]);
    }
  };
  const selectSingle = (e, extraData) => {
    //console.log("checkedCase", extraData);
    //console.log(e.target);
    //console.log(document.getElementById(e.target.id).id);
    if (!e.target.checked) {
      setCheckedCase(
        extraData.filter(item => item !== Number.parseInt(e.target.value))
      );
    } else {
      setCheckedCase([...extraData, Number.parseInt(e.target.value)]);
    }
  };

  const pagingOptions = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log("Size per page change!!!");
      console.log("Newest size per page:" + sizePerPage);
      console.log("Newest page:" + page);
      setPageSize(sizePerPage);
    },
    onPageChange: (page, sizePerPage) => {
      console.log("Page change!!!");
      console.log("Newest size per page:" + sizePerPage);
      console.log("Newest page:" + page);
      setPageNumber(page);
    }
  };

  /**
   * Columns to be displayed in the table
   */
  const tableColumns = [
    {
      dataField: "batch",
      isDummyField: true,
      text: "批次",
      headerFormatter: (column, colIndex) => {
        return (
          <input
            type="checkbox"
            name="chk-selectAll"
            id="chk-selectAll"
            value="check_all"
            onClick={e => selectAll(e)}
          />
        );
      },
      formatter: (cell, row, rowIndex, extraData) => {
        return (
          <React.Fragment>
            <input
              type="checkbox"
              name={`chk-${row.id}`}
              id={`chk-${row.id}`}
              value={row.id}
              onChange={e => selectSingle(e, extraData)}
              checked={extraData.indexOf(row.id) > -1 ? true : false}
            />
          </React.Fragment>
        );
      },

      formatExtraData: checkedCase
    },
    {
      dataField: "name",
      text: "Name",
      formatter: (cellContent, row) => {
        return <>{cellContent}</>;
      }
    },
    {
      dataField: "tech",
      text: "Technology"
    }
  ];

  /**
   * Change the name when the row is selected
   *
   * @param {string | number} uniqueKey The unique key of the row `keyField`
   * @param {bool} isSelect Idenfify if the row in selected or not
   */
  const handleChangeNameOnSelect = (uniqueKey, isSelect) => {
    if (isSelect) {
      SetTableData(
        tableData.map(v => {
          if (v.id === uniqueKey) {
            v.name = `${v.name} Selected`;
          }
          return v;
        })
      );
    } else {
      SetTableData(
        tableData.map(v => {
          if (v.id === uniqueKey) {
            v.name = v.name.replace("Selected", "");
          }
          return v;
        })
      );
    }
  };

  const selectRow = {
    mode: "checkbox",
    onSelect: (row, isSelect, rowIndex, e) => {
      const { id } = row;
      handleChangeNameOnSelect(id, isSelect);
    },
    onSelectAll: (isSelect, rows, e) => {
      rows.forEach(r => {
        handleChangeNameOnSelect(r.id, isSelect);
      });
    }
  };

  return (
    <div className="main-container">
      <BootstrapTable
        keyField="id"
        data={tableData}
        columns={tableColumns}
        pagination={paginationFactory(pagingOptions)}
      />
    </div>
  );
}

export default TestTable;
