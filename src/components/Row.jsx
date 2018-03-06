import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cells from './Cells';

class Row extends Component {

  render() {

    let columns = this.props.columns;
    let rowData = this.props.rowData;
    let rowIndex = this.props.rowIndex;
    let rowOffsetHeight = this.props.rowOffsetHeight;

    let rowTotalWidth = columns[0] && columns.reduce(
      (accumulator, column) => accumulator + column.width,
      0
    );

    let rowStyle = {
      top: ( rowIndex * rowOffsetHeight) + 'px',
      width: rowTotalWidth + 'px',
      height: rowOffsetHeight + 'px'
    };

    let rowClassName = classNames({
      'g-row': true,
      'even': (rowIndex % 2 === 0)
    });

    let rowRender = (
      <div className={rowClassName} style={rowStyle}>
        <Cells
          rowData={rowData}
          rowOffsetHeight={this.props.rowOffsetHeight}
          columns={columns}
        />
      </div>
    );

    return (
      rowRender
    );
  }

}

Row.propTypes = {
  rowData: PropTypes.object,
  rowIndex: PropTypes.number,
  rowOffsetHeight: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
    width: PropTypes.string.optional
  })).isRequired
};

export default Row;
