import PropTypes from 'prop-types';
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link
} from '@mui/material';
import { Table } from 'antd';
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import IconWithPopup from '../user/user-icon';


const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (name) => <Link
    color="primary"
    component={RouterLink}
    href={paths.dashboard.inventory.viewDetail}
    sx={{
      alignItems: 'center',
      textAlign: 'center'
      // display: 'inline-flex'
    }}
    underline="hover"
  >
    <Typography variant="subtitle2">
   {name}
    </Typography>
  </Link>
  },
  {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
  },
  
  {
    title: 'Category',
    key: 'category',
    dataIndex: 'category',
  },
  {
      title: 'HSN Code',
      key: 'HSNcode',
      dataIndex: 'HSNcode',
    },

    {
      dataIndex: 'actionEdit',
      key: 'actionEdit',
    render: () => <Link
 
  >
    <IconButton>
  <Icon>
         <EditIcon />
     </Icon>
     </IconButton>
  </Link>
    },
    {
      dataIndex: 'actionDelete',
      key: 'actionDelete',
      render: (_, __, index) =>  <IconButton
       onClick={() => this.handleRemoveRow(index)}
     >
       <Icon>
         <Delete />
       </Icon>
     </IconButton>
    },
];

const data = [
  {
    key: '1',
    product: 'product 1',
    quantity: "50",
    cost: '$3082',
    category: 'healthcare',
    HSNcode: '26-342',
  },
];

class ViewInventory extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
  rows:[{}]
};
}
handleChange = idx => e => {
  const {name, value} =e.target;
  const rows = {...this.state.row}
  rows[idx] ={
  ...rows[idx],
  [name]:value
};
this.setState({
  rows
})
}

handleEmailChange = idx => e => {
  const {name, value} =e.target;
  const rows = {...this.state.row}
  rows[idx] ={
  ...rows[idx],
  email:value
};
this.setState({
  rows
})
}
handleAddRow = () => {
  const item ={
      email:'',
      mobile:''
  }
this.setState({
  rows: [...this.state.rows, item]
})
}
handleRemoveRow = idx =>() =>{
  const rows = [...this.state.rows];
  rows.splice(idx,1);
  this.setState({rows});
};
render (){
  const {
      count = 0,
      items = [],
      onDeselectAll,
      onDeselectOne,
      onPageChange = () => { },
      onRowsPerPageChange,
      onSelectAll,
      onSelectOne,
      page = 0,
      rowsPerPage = 0,
      selected = [],
      classes
    } = this.props;
    const {rows} =this.state;
  return (
    <div style={{minWidth: "100%" }}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>View Inventory</h2>
      <IconWithPopup/>
    </div>
 <Box sx={{  position: 'relative' , overflowX: "auto"}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} columns={columns} dataSource={data}></Table>
      </Scrollbar>
    </Box>

    </div>
  );
    }
};

ViewInventory.propTypes = {
  customer: PropTypes.object.isRequired
};

export default ViewInventory;