import DataTable, {TableColumn } from 'react-data-table-component';

import userplaceholder from '../../../images/userplaceholderlogo.png'

import {PatientTableProps, PatientProps} from '../../../types/DataTypes'; 



const PatientTable: React.FC<PatientTableProps> = ({ columns, data }) => {


    const customColumns: TableColumn<PatientProps>[] = columns.map((col) => {
        if (col.name === 'Patient'){
            return {
                ...col,
                cell: (row: PatientProps) => {
                    const patientProfile = row.profile;

                    const imagePath = patientProfile.patientImage 
                    ? `${patientProfile.patientImage}?v=${new Date(row.updatedAt || Date.now()).getTime()}
                    ` 
                    : userplaceholder;
            
                    return (
                      <div className="flex items-center">
                            <img
                                src={imagePath }
                                alt={patientProfile.patientName}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            {patientProfile.patientName}
                      </div>
                    );
                  },
            };
        } 
        return col;
    });

    

    const paginationComponentOptions = {
        rowsPerPageText: '',
        noRowsPerPage: true,
        rangeSeparatorText: 'of',
        selectAllRowsItem: false,
    };


    const customStyles = {

        rows: {
            style: {
                minHeight: '60px',
                minWidth: '300px',
                borderRight: "none",
                borderBottomStyle: 'solid',
                borderBottomWidth: '0.50px',
                borderBottomColor: "#0000001f",
            },
        },
        headRow: {
            style: {
                borderBottom: 'none',
            },
          },
        headCells: {
            style: {
                minHeight: '60px',
                backgroundColor: 'white',
                color: '#0d0c43', 
                fontSize: '14px',
                fontWeight:'500',
            },
        },
        cells: {
            style: {
                backgroundColor: 'white', 
                color: '#161616',
                minWidth: '150px'
            },
        },
        pagination: {
            style: {
              backgroundColor: 'white',
              color: 'black',
              borderTopStyle: 'none',
            },
        },     
        paginationButton: {
            style: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                fill: 'black',
                backgroundColor: 'white',
                '&:disabled': {
                cursor: 'unset',
                color: 'black',
                fill: 'black',
                backgroundColor: 'white',
                },
                '&:hover:not(:disabled)': {
                backgroundColor: 'black',
                },
                '&:focus': {
                outline: 'none',
                backgroundColor: 'black',
                },
            },
        },
        
        noData: {
            style: {
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                textAlign: 'center',
                fontWeight: '650',
                backgroundColor: 'inherit',
            },
        },
    };



  return (
    <DataTable
        className="overflow-x-auto"
        columns={customColumns}
        data={data}
        customStyles={customStyles}
        paginationRowsPerPageOptions={[]}
        paginationComponentOptions = {paginationComponentOptions}
        pagination
        paginationPerPage={7}
    />
  );
};

export default PatientTable;
