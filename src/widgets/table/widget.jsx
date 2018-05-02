/* ---------------- imports --------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* ---------------- widget view --------------------------------------------------------- */

export default function Widget({
  headerItems,
  rows,
  onStart,
  onStop,
  onAlarmStart,
  onAlarmStop,
  onAdd,
  onEdit,
  onDelete,
  onToggleAll,
  onToggle,
  selectedRows,
  isCamStatus,
  showButtons,
  editOnly,
  areCheckBoxesHidden,
  downloadHeader,
}) {
  const handleStartClick = (e) => {
    e.preventDefault();
    onStart();
  };
  const handleStopClick = (e) => {
    e.preventDefault();
    onStop();
  };
  const handleAlarmStartClick = (e) => {
    e.preventDefault();
    onAlarmStart();
  };
  const handleAlarmStopClick = (e) => {
    e.preventDefault();
    onAlarmStop();
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    onAdd();
  };
  const handleEditClick = (e) => {
    e.preventDefault();
    onEdit();
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete();
  };
  const handleToggleAll = (e) => {
    e.preventDefault();
    onToggleAll();
  };
  const handleRowToggle = (e, row) => {
    e.preventDefault();
    if (editOnly) {
      onToggle(row);
      onEdit();
    } else {
      onToggle(row);
    }
  };
  const renderHeaderItems = (item, index) => {
    return (
      <span
        key={item}
        className={`col-${index + 1}`}
      >
        {item.split('_').join(' ')}
      </span>
    );
  };
  const renderRows = (row) => {
    const rowStyle = classNames({
      't-table-row table__row': true,
      active: selectedRows.includes(row.id),
    });
    return (
      <div
        key={row.id}
        className={rowStyle}
        role="menuitem"
        onClick={e => handleRowToggle(e, row.id)}
      >
        {
          !editOnly &&
          <div className="checkbox">
            <label>
              <input type="checkbox" />
            </label>
          </div>
        }
        {headerItems.map((column, index) => {
          let tableData;
          switch (column) {
            case 'status':
              tableData = (
                <span
                  key={row.id + column}
                  className={`col-${index + 1} ${row[column]}`}
                ><span>{row[column]}</span></span>
              );
              break;
            case 'alarm':
              tableData = (
                <span
                  key={row.id + column}
                  className={`col-${index + 1}${row[column] ? ' alarmed' : ''}`}
                />
              );
              break;
            default:
              tableData = (
                <span
                  key={row.id + column}
                  className={`col-${index + 1}`}
                >
                  {row[column]}
                </span>
              );
          }
          return tableData;
        })}
        {
          editOnly &&
          <div className="edit-icon">
            <div className="white-border" />
            <div className="pencil" />
          </div>
        }
      </div>
    );
  };
  const headerStyle = classNames({
    'table__row--header': true,
    active: (selectedRows.length === rows.length) && (rows.length > 0),
  });
  return (
    <div className="table">
      {
        downloadHeader &&
        <div className="t-title table__header">Camera selection</div>
      }
      {
        showButtons &&
        !isCamStatus &&
        <div className="table__buttons">
          <button
            className="btn btn-flat"
            onClick={e => handleAddClick(e)}
          >add</button>
          <button
            disabled={selectedRows.length !== 1}
            className="btn btn-flat"
            onClick={e => handleEditClick(e)}
          >edit</button>
          <button
            className="btn btn-flat"
            disabled={selectedRows.length === 0}
            onClick={e => handleDeleteClick(e)}
          >delete</button>
        </div>
      }
      {
        showButtons &&
        isCamStatus &&
        <div className="table__buttons">
          <button
            disabled={selectedRows.length === 0}
            className="btn btn-flat-green"
            onClick={e => handleStartClick(e)}
          >start</button>
          <button
            disabled={selectedRows.length === 0}
            className="btn btn-flat-red"
            onClick={e => handleStopClick(e)}
          >stop</button>
          <button
            className="btn btn-flat-orange hide-alarm-button"
            disabled={selectedRows.length === 0}
            onClick={e => handleAlarmStartClick(e)}
          > start alarm</button>
          <button
            className="btn btn-flat-orange hide-alarm-button"
            disabled={selectedRows.length === 0}
            onClick={e => handleAlarmStopClick(e)}
          >stop alarm</button>
        </div>
      }
      <div
        className={headerStyle}
        role="button"
      >
        {
          !editOnly &&
          <div
            className="checkbox"
            role="button"
            onClick={e => handleToggleAll(e)}
          >
            {
              !areCheckBoxesHidden &&
              <label>
                <input type="checkbox" />
              </label>
            }
          </div>
        }
        {headerItems.map((item, index) => renderHeaderItems(item, index))}
      </div>
      {rows.map(row => renderRows(row))}
    </div>
  );
}

Widget.propTypes = {
  headerItems: PropTypes.array,
  rows: PropTypes.array,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onAlarmStart: PropTypes.func,
  onAlarmStop: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleAll: PropTypes.func,
  onToggle: PropTypes.func,
  selectedRows: PropTypes.array,
  isCamStatus: PropTypes.bool,
  showButtons: PropTypes.bool,
  editOnly: PropTypes.bool,
  areCheckBoxesHidden: PropTypes.bool,
  downloadHeader: PropTypes.bool,
};

Widget.defaultProps = {
  headerItems: [],
  rows: [],
  onStart: null,
  onStop: null,
  onAlarmStart: null,
  onAlarmStop: null,
  onAdd: null,
  onEdit: null,
  onDelete: null,
  onToggleAll: null,
  onToggle: null,
  selectedRows: [],
  isCamStatus: false,
  showButtons: false,
  editOnly: false,
  areCheckBoxesHidden: false,
  downloadHeader: false,
};
