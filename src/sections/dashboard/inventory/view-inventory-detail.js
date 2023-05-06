import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Link,
  SvgIcon,
  IconButton,
  Grid
} from '@mui/material';
import { wait } from 'src/utils/wait';
import {  Box, Stack } from '@mui/system';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { useCallback, useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Scrollbar } from 'src/components/scrollbar';
import { Table } from 'antd';
import { primaryColor } from 'src/primaryColor';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';


const statusOptions = ['Canceled', 'Complete', 'Rejected'];
const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
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
];

const rowData =  [
    {
      key: '1',
      product: 'product 1',
      quantity: "50",
      cost: '$3082',
      category: 'healthcare',
      HSNcode: '26-342',
    },
  ];

const data = 
{
    warehouse: 'warehouse 1',
    purchaseorder: '#2737',
    category: '5A',
    rack: 'B-2',
    product: 'product 1',
    HSNcode: '26-342',
    size: '2.4"',
    weight: '10kg',
    quantity: '20',
    gst: '12%',
    cgst:'4%',
    description: 'testing random description',
}



export const ViewInventoryDetail = (props) => {
  const { customer, ...other } = props;
  const [status, setStatus] = useState(statusOptions[0]);

  const handleChange = useCallback((event) => {
    setStatus(event.target.value);
  }, []);
  const align = 'horizontal' 
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      submit: null
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <div style={{minWidth: "100%", marginTop: "1rem"  }}>
      <div>
          <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.inventory.view}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
          underline="none"
        >
          <SvgIcon sx={{ mr: 1, width: 38, height: 38,  transition: 'color 0.5s','&:hover': { color: `${primaryColor}` }}}>
            <ArrowCircleLeftOutlinedIcon/>
          </SvgIcon>
          <Typography variant="subtitle2">
            Inventory <span style={{color: `${primaryColor}` , fontWeight: 600}}>List</span> 
          </Typography>
        </Link>
      </div>
 <h2>Inventory</h2>
      <Card style={{marginBottom: "12px" }}>
        <CardHeader title="Inventory Detail" />
        <PropertyList>
        <PropertyListItem
          align={align}
          label="Warehouse"
        >
          <Typography variant="subtitle2">
            {data.warehouse}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Purchase Order"
          value={data.purchaseorder}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Category"
          value={data.category}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="Rack"
          value={data.rack}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Product"
          value={data.product}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="HSN code"
          value={data.HSNcode}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="Size"
          value={data.size}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="Weight"
          value={data.weight}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="Quantity"
          value={data.quantity}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="GST"
          value={data.gst}
        />
         <Divider />
        <PropertyListItem
          align={align}
          label="CGST"
          value={data.cgst}
        />
        <PropertyListItem
          align={align}
          label="Description"
          value={data.description}
        />
      </PropertyList>
        <Divider/>
      </Card>
      <Card style={{marginBottom: "40px" }}>
      <Box sx={{  position: 'relative' , overflowX: "auto", marginBottom: '30px'}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} pagination={false} columns={columns} dataSource={rowData}></Table>
      </Scrollbar>
    </Box>
     <Grid
              xs={12}
              md={6}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount : 56,78,020</Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions :  This product can be sold on the said customer</Typography>

            </Grid>
        <Divider/>
      </Card>
    </div>
  );
};

ViewInventoryDetail.propTypes = {
  customer: PropTypes.object.isRequired
};