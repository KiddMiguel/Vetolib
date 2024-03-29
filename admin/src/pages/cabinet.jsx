import React, { useEffect, useState } from 'react';
import TableauAdmin from '../components/TableauAdmin';
import axios from 'axios';
import  ModifyButton  from '../components/ModifyButton';
import  DeleteButton  from '../components/DeleteButton';
import CustomModal from '../components/CustomModal';


const Cabinet = () => {
    const [cabinet, setCabinet] = useState([]);
    const [selectedData, setSelectedData] = useState(null); 
    const [modalShow, setModalShow] = useState(false);
    const [actionType, setActionType] = useState(""); 

    const handleModify = (data) => {
        setSelectedData(data);
        setActionType("modify");
        setModalShow(true);
    };
    
    const handleDelete = (data) => {
        setSelectedData(data);
        setActionType("delete");
        setModalShow(true);
    };
    
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/cabinet',
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            setCabinet(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    , []);

    console.log(cabinet);

    const columnDefs = [
        { headerName: "ID", field: "cabinet_id", sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: "Nom", field: "cabinet_name", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Ville", field: "city", sortable: true, filter: true },
        { headerName: "Téléphone", field: "phone_number", sortable: true, filter: true },
        { headerName: "image", field: "image", sortable: true, filter: true },
        {
            headerName: "Modifier",
            cellRenderer: (params) => <ModifyButton onModify={() => handleModify(params.data)} />,
            filter: false,
            sortable: false
        },
        {
            headerName: "Supprimer",
            cellRenderer: (params) => <DeleteButton onDelete={() => handleDelete(params.data)} />,
            filter: false,
            sortable: false
        },
        ];
    
 return (
    <>
        <div>
            <h3 className="text-start ms-3 mt-5 text-primary">Liste des Cabinets</h3>
            <hr />
        </div>

        <TableauAdmin rowData={cabinet} columnDefs={columnDefs} />
        <CustomModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title={actionType === "modify" ? "Modification du Cabinet" : "Supprimer cabinet"}
            body={actionType === "modify" ? "Voulez vous modifier ce cabinet" : "Voulez vous supprimer ce cabinet ?"}
            onMainAction={actionType === "modify" ? () => console.log("Modi", selectedData) : () => console.log("Deleting", selectedData)}
            mainActionButtonText={actionType === "modify" ? "Modifier" : "Supprimer"}
        />
    </>
);

};

export default Cabinet;