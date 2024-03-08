import { Button, Table, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArtistForm from "./ArtistForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadSlice";
import { GetAllArtist } from "../../../apis/artist";
import { getDateFormat} from "../../../helpers/index"

function Artist() {
  const [artists, setArtists] = React.useState([]);
  const dispatch = useDispatch();
  const [showArtistForm, setShowArtistForm] = React.useState(false);
  const navigate = useNavigate();
  const [selectedArtist,setSelectedArtist] = React.useState(null);
  const fetchArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtist();
      setArtists(response.message);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const deleteArtist = async(id)=>{
    try {
      dispatch(SetLoading(true));
      const response = await deleteArtist(id);
      message.success(response.message);
      fetchArtists();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const columns = [
    {
      title: "Artist",
      dataIndex: "profile",
      render: (text, record) => {
        const imageUrl = record?.images?.[0] || "";
        return (
          <img src={imageUrl} alt="" className="w-20 h-20 rounded" />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      render : (text,record) =>{
        return getDateFormat(text);
      }
    },
    {
      title: "Debut year",
      dataIndex: "debutyear",
    },
    {
      title: "Profession",
      dataIndex: "profession",
    },
    {
      title: "Debut Movie",
      dataIndex: "debutMovie",
    },
    {
      title: "Action",
      dataIndex: "action",
      render : (text,record)=>{
        return <div className="flex gap-2">
          <i className="ri-edit-2-fill" 
          onClick={()=>{
            setSelectedArtist(record);
            setShowArtistForm(true);
          }}></i>
          <i className="ri-delete-bin-6-line" 
          onClick={()=>{
           deleteArtist(record._id);
          }}></i>
        </div>
      }
    },
  ];
  React.useEffect(() => {
    fetchArtists();
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => {
          setSelectedArtist(null);
          setShowArtistForm(true);
        }}>Add Artist</Button>
      </div>
      <Table dataSource={artists} columns={columns} className="mt-5"/>
      {showArtistForm && (
        <ArtistForm
          showArtistForm={showArtistForm}
          setShowArtistForm={setShowArtistForm}
          selectedArtist={selectedArtist}
          reloadData= {fetchArtists}
        />
      )}
    </div>
  );
}

export default Artist;
