import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cells extends Component {

  render() {

    let columns = this.props.columns;
    let rowData = this.props.rowData;
    let rowOffsetHeight = this.props.rowOffsetHeight;

    let cells = columns.map((column,j) => {
      let leftPos = 0;
      let value = rowData[column.accessor];

      for (let x = 0; x < j; x++) {
        leftPos += columns[x].width;
      }

      let colStyle = {
        width: column.width + 'px',
        height: rowOffsetHeight + 'px',
        left: leftPos + 'px'
      };
      
      return (<div className="g-cell" style={colStyle}>{value}</div>);
    });

    return (
      cells
    );
  }

}

Cells.propTypes = {
  rowData: PropTypes.object,
  rowOffsetHeight: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
    width: PropTypes.string.optional
  })).isRequired
};

export default Cells;
