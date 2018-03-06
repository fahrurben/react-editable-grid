import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RowHeader extends Component {

  render() {
    let columns = this.props.columns;
    let headerOffsetHeight = this.props.headerOffsetHeight;

    let rowTotalWidth = columns[0] && columns.reduce(
      (accumulator, column) => accumulator + column.width,
      0
    );

    let headerRowStyle = {
      top: '0px',
      width: rowTotalWidth + 'px',
      height: headerOffsetHeight + 'px'
    };

    return (
      <div className="g-row" style={headerRowStyle}>
        {
          columns.map((column,j) => {
            let leftPos = 0;

            for (let x = 0; x < j; x++) {
              leftPos += columns[x].width;
            }

            let colStyle = {
              width: column.width + 'px',
              height: this.props.rowOffsetHeight + 'px',
              left: leftPos + 'px'
            };
            
            return (<div className="g-cell" style={colStyle}>{column.label}</div>);
          })
        }
      </div>
    );
  }

}

RowHeader.propTypes = {
  headerOffsetHeight: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
    width: PropTypes.string.optional
  })).isRequired
};

export default RowHeader;
