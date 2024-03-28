import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CabinetDetails = () => {

    const [cabinet, setCabinet] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/cabinet/${id}`)
      .then((response) => {
        setCabinet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

    return (
        <div>
        
      <div className="bg-primary pt-2">
        <div className="d-flex container text-white">
          <div>
            <img src="../../public/images/veto.jpg" width="100%" alt="" />
          </div>
          <div>
            <h3>{cabinet && cabinet.cabinet_name} - {cabinet && cabinet.services_offered} {cabinet && cabinet.city}</h3>
            <p>128 Rue de l'Abbé Groult, 75015 Paris</p>
          </div>
        </div>
      </div>

<div className='container'>


      <div className=" mt-5 row">
        <div className="col-7">
          <h6>
            <i className="bi bi-file-earmark-text text-success"></i> A propos
          </h6>
          <hr />

          <div>
            <p className="fw-bold">
              Chez nous, c’est chez vous, et chez votre chat !
            </p>
            <p>
              A la Clinique vétérinaire des chats, tout – vraiment tout – est
              pensé pour apaiser, relaxer et bien sûr pour soigner votre chat !
              <br />
              Notre salle d'attente confortable, calme, exclusivement réservée
              aux chats ainsi que nos salles d'examen apaisantes minimisent le
              stress de votre chat pendant les consultations. Notre mobilier est
              conçu sur mesure pour que votre petite boule de poils puisse se
              sentir bien tout au long de sa consultation.
              <br />
              Nos vétérinaires et auxiliaires vétérinaires sont formés
              spécifiquement pour soigner les chats - oui oui, on vous l’a dit
              les chats sont une espèce à part -. Notre clinique dispose
              également d’un laboratoire d’analyses complet et de matériel de
              qualité.
            </p>
          </div>

          <div>
            <p>
              Si vous ne trouvez pas de créneau disponible pour votre petit
              félin, n'hésitez pas à nous contacter au 01 45 31 15 96 ou à
              prendre rdv à notre seconde clinique ici :
              <a href="">
                {" "}
                https://www.captainvet.com/veterinaire/paris-15/clinique-veterinaire-veto-paris-15{" "}
              </a>
            </p>
          </div>

          <div>
            <p className="fw-bold">
              Numéro de téléphone :
              <span className="text-mutted fw-normal"> 01 45 31 15 96</span>
            </p>
            <p className="fw-bold">
              Site internet :
              <span className="text-mutted fw-normal"> 01 45 31 15 96</span>
            </p>
            <p className="fw-bold">
              Boutique en ligne :
              <span className="text-mutted fw-normal"> 01 45 31 15 96</span>
            </p>
          </div>

          <div className="mt-5">
            <h4>
              {" "}
              <i className="text-success bi bi-geo-alt-fill"></i> Comment s'y
              rendre ?
            </h4>
            <hr />
            <div>
              <img src="../../public/images/staticmap.png" alt="" />
            </div>
          </div>

          <div className="mt-5">
            <h4>
              <i className="text-success bi bi-bandaid"></i> Praticiens du
              cabinet
            </h4>
            <hr />

            <div>
              <button className="btn btn-primary">
                <i className="bi bi-person-hearts"></i> Dr. Jean Dupont
              </button>
            </div>
          </div>
        </div>
        <div className="col-4 mt-5 ms-5">
            <img src="../../public/images/lib.jpg"  className="img-responsive rounded-2" width="150%" alt="" />
        </div>
      </div>
      </div>
        </div>
    );
};

export default CabinetDetails;