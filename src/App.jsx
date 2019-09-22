import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from 'react-data-grid'
import styles from './App.module.scss'
import { Paper, Checkbox, TextField, Button, Select, MenuItem } from '@material-ui/core'
import { loadEmployeeInfo, searchEmployee } from './action'

class AppComponent extends Component {

  state = { 
    selectedValue: 0,
    name: "",
    age: 0,
  }

  componentDidMount() {
    this.props.dispatch(loadEmployeeInfo());
  }

  handleRadio = (e) => {
    this.setState({ selectedValue: e.target.value })
  }

  handleChange = (key,value) => {
    if(key==="name"){
      this.setState({ name: value })
    }
    else {
      this.setState({ age: value })
    }
  }

  handleSearch = () => {
    this.props.dispatch(searchEmployee(this.state.name, this.state.age))
  }

  render() {
    const { empList } = this.props;
    const { name, age } = this.state;

    const CheckBox = () => {
      return <Checkbox/>;
    };

    const RadioButton = ({ value }) => {
      return <input
      type="radio" 
      name="mgr"
      value={value}
    />;
    };
    const columns = [
      { key: "employee_name", name: "Name"},
      { key: "employee_age", name: "Age"},
      { key: "id", name: "Full Time", formatter: CheckBox },
      { key: "id", name: "Manager", formatter: RadioButton, editable: true }
    ];

    return (

    <Paper className={styles.root}>
        <div className={styles['App-header']}>
              <label className={styles.label}>Name</label>
              <TextField
                id="standard-name"
                className={styles.text}
                value={name}
                onChange={e=>this.handleChange("name",e.target.value)}
              />
          <label className={styles.label}>Age</label>
          <div className={styles.container}>
            
            <Select
              value={age}
              onChange={e=>this.handleChange("age",e.target.value)}
              className={styles.select}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={1}>15 to 20</MenuItem>
              <MenuItem value={2}>20 to 30</MenuItem>
              <MenuItem value={3}>30 to 40</MenuItem>
            </Select>
          </div>
          <Button onClick={this.handleSearch} className={styles.button}>Search</Button>
        </div>

      <ReactDataGrid
        columns={columns}
        rowGetter={i => empList[i] }
        rowsCount={empList.length}
        minHeight={800}
        className={styles.datagrid}
      />
    </Paper>
    );
  }
}

export const App=connect(state => ({
  empList: state.filteredList
}))(AppComponent);
