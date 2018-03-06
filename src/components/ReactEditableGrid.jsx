import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ReactEditableGrid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      gridOffsetWidth: 0
    };

    this.gridOffsetWidth = 0;
    this.gridOffsetHeight = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data !== 'undefined') {
      console.log(nextProps);
      this.setState({ data: nextProps.data });
    }
  }

  componentDidMount() {
    this.gridOffsetWidth = this.rootRef && this.rootRef.offsetWidth;
    this.gridOffsetHeight = this.rootRef && this.rootRef.offsetHeight;
  }

  render() {
    let data = this.state.data;
    let columns = this.props.columns;

    let rootStyle = {
      width: '20%',
      height: '100%'
    };

    let bodyViewStyle = {
      width: this.gridOffsetWidth + 'px',
      height: this.gridOffsetHeight + 'px'
    };

    let rowTotalWidth = columns[0] && columns.reduce((accumulator, column) => accumulator + column.width, 0);

    return (
      <div className="g-root" style={rootStyle} ref={(node) => {this.rootRef = node;}} >
        <div className="g-body">
          <div className="g-body-viewport" style={bodyViewStyle}>
            <div className="g-body-container">
              {
                data &&
                ( 
                  data.map((row, i) => {

                    let rowStyle = {
                      top: (i * this.props.rowOffsetHeight + this.props.headerOffsetHeight) + 'px',
                      width: rowTotalWidth + 'px',
                      height: this.props.rowOffsetHeight + 'px'
                    };

                    let rowClassName = classNames({
                      'g-row': true,
                      'even': (i % 2 === 0)
                    });

                    let tds = columns.map((column,j) => {
                      let leftPos = 0;
                      let value = row[column.accessor];

                      for (let x = 0; x < j; x++) {
                        leftPos += columns[x].width;
                      }

                      let colStyle = {
                        width: column.width + 'px',
                        height: this.props.rowOffsetHeight + 'px',
                        left: leftPos + 'px'
                      };
                      
                      return (<div className="g-cell" style={colStyle}>{value}</div>);
                    });

                    let rowRender = (
                      <div className={rowClassName} style={rowStyle}>
                        {tds}
                      </div>
                    );

                    return rowRender;
                  })
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactEditableGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  rowOffsetHeight: PropTypes.number.isRequired,
  headerOffsetHeight: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
    width: PropTypes.string.optional
  })).isRequired
};

export default ReactEditableGrid;
