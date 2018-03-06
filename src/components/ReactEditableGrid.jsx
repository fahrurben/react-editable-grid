import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RowHeader from './RowHeader';
import Row from './Row';

class ReactEditableGrid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      gridOffsetWidth: 0,
      headerOffsetLeft: 0
    };

    this.gridOffsetWidth = 0;
    this.gridOffsetHeight = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data !== 'undefined') {
      this.setState({ data: nextProps.data });
    }
  }

  componentDidMount() {
    this.gridOffsetWidth = this.rootRef && this.rootRef.offsetWidth;
    this.gridOffsetHeight = this.rootRef && this.rootRef.offsetHeight;
  }

  bodyViewOnScroll(e) {
    let scrollLeft = -1 * e.target.scrollLeft;
    this.setState({headerOffsetLeft: scrollLeft});
  }

  render() {
    let data = this.state.data;
    let columns = this.props.columns;

    let rootStyle = {
      width: this.props.gridWidth,
      height: this.props.gridHeight
    };

    let headStyle = {
      top: '0px',
      width: this.gridOffsetWidth + 'px',
      height: this.props.headerOffsetHeight + 'px'
    };

    let headViewStyle = {
      top: '0px',
      left: this.state.headerOffsetLeft + 'px',
      width: this.gridOffsetWidth + 'px',
      height: this.props.headerOffsetHeight + 'px'
    };

    let bodyViewStyle = {
      top: this.props.headerOffsetHeight + 'px',
      width: this.gridOffsetWidth + 'px',
      height: (this.gridOffsetHeight - this.props.headerOffsetHeight) + 'px'
    };
    

    return (
      <div className="g-root" style={rootStyle} ref={(node) => {this.rootRef = node;}} >
        <div className="g-header" style={headStyle}>
          <div className="g-header-viewport" style={headViewStyle}>
            <div className="g-header-container">
              <RowHeader
                headerOffsetHeight={this.props.headerOffsetHeight}
                columns={this.props.columns}
              />
            </div>
          </div>
        </div>
        <div className="g-body">
          <div className="g-body-viewport" 
            style={bodyViewStyle} 
            onScroll={this.bodyViewOnScroll.bind(this)}>
            <div className="g-body-container">
              {
                data &&
                ( 
                  data.map((row, i) => {
                    
                    let rowRender = (
                      <Row
                        rowData={row}
                        rowIndex={i}
                        rowOffsetHeight={this.props.rowOffsetHeight}
                        columns={columns}
                      />
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
  gridWidth: PropTypes.string.isRequired,
  gridHeight: PropTypes.string.isRequired,
  rowOffsetHeight: PropTypes.number.isRequired,
  headerOffsetHeight: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  })).isRequired
};

export default ReactEditableGrid;
