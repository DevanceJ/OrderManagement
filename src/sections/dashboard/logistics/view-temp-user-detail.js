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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

];

const rowData = [
    {
        name: "Max Ray",
        email: 'test@xyz.com',
        type: 'test type',
        company:'xyz company',
        address:'Street:  277, I S Sadan X Road, Santoshnagar, Hyderabad, Andhra Pradesh, India'
      },
];

const data = 
{
    name: "Max Ray",
    email: 'test@xyz.com',
    type: 'test type',
    company:'xyz company',
    address:'Street:  277, I S Sadan X Road, Santoshnagar, Hyderabad, Andhra Pradesh, India'
}



export const ViewTemporaryUserDetail = (props) => {
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
          href={paths.dashboard.logistics.fleet}
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
            Temporary User <span style={{color: `${primaryColor}` , fontWeight: 600}}>List</span> 
          </Typography>
        </Link>
      </div>
 <h2>Temporary User</h2>
      <Card style={{marginBottom: "12px" }}>
        <CardHeader title="Temporary User Detail" />
        <PropertyList>
        <PropertyListItem
          align={align}
          label="Name"
        >
          <Typography variant="subtitle2">
            {data.name}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Email"
          value={data.email}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Type"
          value={data.type}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Company"
          value={data.company}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Address"
          value={data.address}
        />
      </PropertyList>
        <Divider/>
      </Card>
      <Card style={{marginBottom: "40px" }}>
      <Box sx={{  position: 'relative' , overflowX: "auto"}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} pagination={false} columns={columns} dataSource={rowData}></Table>
      </Scrollbar>
    </Box>

        <Divider/>
      </Card>
    </div>
  );
};

ViewTemporaryUserDetail.propTypes = {
  customer: PropTypes.object.isRequired
};