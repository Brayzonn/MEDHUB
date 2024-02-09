import DataTable, {TableColumn } from 'react-data-table-component';
import userplaceholder from '../../images/userplaceholderlogo.png'


interface RowData {
    profile: { patientname: string; patientImage: string };
    patientID: string;
    patientNotes: [] ;
    patientAge: string;
    patientBloodType: string;
    patientHeight: string;
    patientGenotype: string;
    patientWeight: string;
    patientConditions: []; 
    patientJoindate: string;
    patientBirthDate: string;
    admissionStatus: boolean;
    patientPhoneNumber: string;
    patientEmail: string;
    patientEMO: string;
}
    
    interface TableProps {
        columns: TableColumn<RowData>[];
        data:  RowData[];
    }

const PatientTable: React.FC<TableProps> = ({ columns, data }) => {

    
    const customColumns: TableColumn<RowData>[] = columns.map((col) => {
        if (col.name === 'Patient'){
            return {
                ...col,
                cell: (row: RowData) => {
                    const patientProfile = row.profile;
            
                    return (
                      <div className="flex items-center">
                            <img
                                src={patientProfile.patientImage ? patientProfile.patientImage : userplaceholder }
                                alt={patientProfile.patientname}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            {patientProfile.patientname}
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
