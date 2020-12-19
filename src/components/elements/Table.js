//LIB
import React  from 'react';
var {
  StyleSheet,
  View,
  FlatList,
} = require('react-native');

//components
// var Debug = require('../../Util/Debug');
var Include = require('../../Include');
import PropTypes from 'prop-types'

React.PropTypes = PropTypes;

//variable

var styles = StyleSheet.create({
  col: {
    flex:1,
    // justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems:'center',
    flexWrap: 'wrap'
  },
  row: {
    // flex:1,
    // justifyContent: 'space-around',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  content:{
    flexDirection :'row',
    paddingBottom:1,
  }
})

//

var Table = React.createClass({
  propTypes:{
    // title of table (need render function)
    title:React.PropTypes.string,
    rowStyle:React.PropTypes.object,
    // stylemap ?
    /** array 2 dimensions contain data
    *
    *  each elements is a object have data field and style field
    */
    data:React.PropTypes.array,
    renderCell:React.PropTypes.func,
    renderTitle:React.PropTypes.func,
    style:React.PropTypes.any,
  },
  // getDefaultProps:function(){
  // },

  getInitialState :function(){
    const self = this;
    const dataSource = new ListView.DataSource({rowHasChanged: self.props.rowHasChanged ? self.props.rowHasChanged : (r1, r2) => r1 !== r2});

    return({
      ds: dataSource.cloneWithRows([])
    })
  },

  renderTitle:function(){
    var self = this;
    if (self.props.renderTitle) {
      return self.props.renderTitle(self.props.title);
    }
    else{
      return self.defaultRenderTitle();
    }
  },

  defaultRenderTitle:function(){
    var self = this;
    return(
      <View style={{backgroundColor:'#303030'}}>
        <Include.Text style={{color:'#FFF'}}>{self.props.title}</Include.Text>
      </View>
    )
  },
  defaultRenderCell:function(colData, sectionID, colID,highlightRow,rowID){
    var self= this;
    var cellStyle={};
    var textStyle={};

    if (rowID === 0) {
      cellStyle={
        backgroundColor:'#5e7f4a',
      };
      textStyle={
        color:'#FFF',
      }
    }

    if ((rowID > 0) && (colID === 0)) {
      cellStyle={
        backgroundColor:'#9a764b',
      };
      textStyle={
        color:'#FFF',
      }
    }

    var columnFlexValue=Array(self.props.data[0].length).fill(1);
    var columnRightMarginValue=Array(self.props.data[0].length-1).fill(1);
    columnRightMarginValue[self.props.data[0].length-1] = 0;

    return(
      <View style={[{flex:columnFlexValue[colID],
                      marginRight:columnRightMarginValue[colID],
                      alignItems:'center',
                      justifyContent:'center'},
                    cellStyle]}>
        <Include.Text style={textStyle}>{colData}</Include.Text>
      </View>
    )
  },

  _renderColumn:function (colData, sectionID, colID,highlightRow,rowID){
    var self = this;

    if (self.props.renderCell) {
      return self.props.renderCell(colData, sectionID, colID,highlightRow,rowID,self.props.data);
    }
    else{
      return self.defaultRenderCell(colData, sectionID, colID,highlightRow,rowID);
    }
  },
  _renderRow: function({item, index}) {
    var self = this;

    // fix column of data follow number column of first row in data
    var rowDataTemp = [];
    if (item.length < self.props.data[0].length) {
      rowDataTemp = item;
      for (let i = item.length; i < self.props.data[0].length; i++) {
        rowDataTemp[i] = ' ';
      }
    }
    else if(item.length > self.props.data[0].length){
      rowDataTemp= item.slice(0,self.props.data[0].length);
    }
    else{
      rowDataTemp = item;
    }

    //
    return (
      <FlatList
        style={[styles.content,self.props.rowStyle,
                (Array.isArray(self.props.rowStyleArray) && self.props.rowStyleArray[index])? self.props.rowStyleArray[index]:{}]}
        contentContainerStyle={styles.col}
        data={dataSource}
        renderItem={(colData, sectionIDCol, colID, highlightRow)=>{return(self._renderColumn(colData, sectionIDCol, colID, highlightRow,index))}}
        pageSize={self.props.data.length}
        scrollEnabled={false}
      />
    );
  },

  render:function(){
    var self = this;

    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource= self.props.data? self.props.data:[];

    return(
      <View style={self.props.style}>
        {self.renderTitle()}
        <FlatList
          removeClippedSubviews ={true}
          refreshControl={self.props.refreshControl}
          onScroll={self.props.onScroll}
          contentContainerStyle={styles.row}
          data={dataSource}
          renderItem={self._renderRow}
          pageSize={self.props.data.length}
          scrollEnabled={false}
        />
      </View>
    )
  }
})



module.exports=Table;
